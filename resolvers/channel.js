import { formatErrors } from "../helpers/functions";
import { requireAuth } from "../session/permissions";

export default {
  Mutation: {
    createChannel: requireAuth.createResolver(async (parent, args, { models, user }, info) => {
      try {
        const team = await models.team.findOne({ where: { id: args.teamId } });
        if (team.owner !== user.id) {
          return {
            ok: false,
            errors: [{ path: "name", message: "Only the owner can create channels!" }],
          };
        }
        const channel = await models.channel.create(args);
        return {
          ok: true,
          channel,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error),
        };
      }
    }),
  },
};
