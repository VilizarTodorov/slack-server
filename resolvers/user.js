import { formatErrors } from "../helpers/functions";
import { tryLogin } from "../session/auth";

export default {
  Query: {
    getUser: (parent, { id }, { models }, info) => models.user.findOne({ where: { id } }),
    allUsers: (parent, args, { models }, info) => models.user.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }, info) => {
      return tryLogin(email, password, models, SECRET, SECRET2);
    },
    register: async (parent, { username, email, password }, { models }, info) => {
      try {
        const user = await models.user.create({ username, email, password });
        return {
          ok: true,
          user,
        };
      } catch (error) {
        console.log(error)
        return {
          ok: false,
          errors: formatErrors(error),
        };
      }
    },
  },
};
