export default {
  Mutation: {
    createChannel: async (parent, args, { models }, info) => {
      try {
        await models.channel.create(args);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
