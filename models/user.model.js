import { DataTypes } from "sequelize";

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
      },
    },
    {
      underscored: true,
    }
  );
};
