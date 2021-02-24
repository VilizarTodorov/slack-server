import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../helpers/constants";

export default (sequelize) => {
  sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: "The username can only contain letters and numbers.",
          },
          len: {
            args: [3, 25],
            msg: "The username needs to be between 3 and 25 characters long.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email address.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 100],
            msg: "The password needs to be between 5 and 100 characters long.",
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
          user.password = hashedPassword;
        },
      },
      underscored: true,
    }
  );
};
