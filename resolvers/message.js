export default {
  Mutation: {
    createMessage: async (parent, args, { models, user }, info) => {
      try {
        await models.message.create({ ...args, userId: user.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
