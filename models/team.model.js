import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "team",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
};
