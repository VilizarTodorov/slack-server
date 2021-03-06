import { formatErrors } from "../helpers/functions";
import sequelize from "../models";
import { requireAuth } from "../session/permissions";

export default {
  Query: {
    allTeams: requireAuth.createResolver(async (parent, args, { models, user }, info) => {
      return models.team.findAll({ where: { owner: user.id } }, { raw: true });
    }),
    inviteTeams: requireAuth.createResolver(async (parent, args, { models, user }, info) => {
      return models.team.findAll(
        {
          include: [{ model: models.user, where: { id: user.id } }],
        },
        { raw: true } 
      );
    }),
  },
  Mutation: {
    createTeam: requireAuth.createResolver(async (parent, args, { models, user }, info) => {
      try {
        const response = await sequelize.transaction(async (t) => {
          const team = await models.team.create({ ...args, owner: user.id });
          await models.channel.create({ name: "general", public: true, teamId: team.id });
          return team;
        });
        return {
          ok: true,
          team: response,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error),
        };
      }
    }),
    addTeamMember: requireAuth.createResolver(async (parent, { email, teamId }, { models, user }, info) => {
      try {
        const teamPromise = models.team.findOne({ where: { id: teamId } }, { raw: true });
        const userToAddPromise = models.user.findOne({ where: { email } }, { raw: true });

        const [team, userToAdd] = await Promise.all([teamPromise, userToAddPromise]);

        if (team.owner !== user.id) {
          return {
            ok: false,
            errors: [{ path: "email", message: "You cannot add members to the team!" }],
          };
        }

        if (!userToAdd) {
          return {
            ok: false,
            errors: [{ path: "email", message: "Could not find user with this email!" }],
          };
        }
        const member = await models.member.create({ userId: userToAdd.id, teamId });

        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error),
        };
      }
    }),
  },
  Team: {
    channels: ({ id }, args, { models, user }, info) =>
      models.channel.findAll({ where: { teamId: id } }, { raw: true }),
  },
};
