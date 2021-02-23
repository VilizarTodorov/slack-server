import bcrypt from "bcrypt";
import { formatErrors } from "../helpers/functions";
import { SALT_ROUNDS } from "../helpers/constants";

export default {
  Query: {
    getUser: (parent, { id }, { models }, info) => models.user.findOne({ where: { id } }),
    allUsers: (parent, args, { models }, info) => models.user.findAll(),
  },
  Mutation: {
    register: async (parent, { username, email, password }, { models }, info) => {
      if (password.length < 5 || password.length > 100) {
        return {
          ok: false,
          errors: [{ path: "password", message: "The password needs to be between 5 and 100 characters long." }],
        };
      }

      try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await models.user.create({ username, email, password: hashedPassword });
        return {
          ok: true,
          user,
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
