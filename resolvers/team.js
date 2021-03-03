import { formatErrors } from "../helpers/functions";
import { requireAuth } from "../session/permissions";

export default {
  Query: {
    allTeams: requireAuth.createResolver(async (parent, args, { models, user }, info) => {
      return models.team.findAll({ where: { owner: user.id } }, { raw: true });
    }),
  },
  Mutation: {
    createTeam: requireAuth.createResolver(async (parent, args, { models, user }, info) => {
      try {
        const team = await models.team.create({ ...args, owner: user.id });
        await models.channel.create({ name: "general", public: true, teamId: team.id });
        return {
          ok: true,
          team,
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
