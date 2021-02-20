import bcrypt from "bcrypt";

const saltRounds = 12;

export default {
  Query: {
    getUser: (parent, { id }, { models }, info) => models.user.findOne({ where: { id } }),
    allUsers: (parent, args, { models }, info) => models.user.findAll(),
  },
  Mutation: {
    register: async (parent, { username, email, password }, { models }, info) => {
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await models.user.create({ username, email, password: hashedPassword });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
