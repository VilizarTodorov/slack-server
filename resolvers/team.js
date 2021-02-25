import { formatError } from "graphql";

export default {
  Mutation: {
    createTeam: async (parent, args, { models, user }, info) => {
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
    },
  },
};
