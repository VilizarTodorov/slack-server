import { formatError } from "graphql";
import { requireAuth } from "../session/permissions";

export default {
  Mutation: {
    createTeam: requireAuth.createResolver(async (parent, args, { models, user }, info) => {
      try {
        await models.team.create({ ...args, owner: user.id });
        return {
          ok: true,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: formatError(error),
        };
      }
    }),
  },
};
