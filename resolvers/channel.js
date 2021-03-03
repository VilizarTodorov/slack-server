import { formatErrors } from "../helpers/functions";

export default {
  Mutation: {
    createChannel: async (parent, args, { models }, info) => {
      try {
        await models.channel.create(args);
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error),
        };
      }
    },
  },
};
