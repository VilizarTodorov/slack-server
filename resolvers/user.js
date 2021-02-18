export default {
  Query: {
    getUser: (parent, { id }, { models }, info) => models.user.findOne({ where: { id } }),
    allUsers: (parent, args, { models }, info) => models.user.findAll(),
  },
  Mutation: {
    createUser: (parent, args, { models }, info) => models.user.create(args),
  },
};
