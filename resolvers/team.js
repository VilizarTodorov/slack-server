export default {
  Mutation: {
    createTeam: async (parent, args, { models, user }, info) => {
      try {
        await models.team.create({ ...args , owner: user.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
