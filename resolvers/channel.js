import { formatErrors } from "../helpers/functions";

export default {
  Mutation: {
    createChannel: async (parent, args, { models }, info) => {
      try {
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
    },
  },
};
