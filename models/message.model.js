import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("message", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
