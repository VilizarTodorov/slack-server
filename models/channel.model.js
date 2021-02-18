import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "channel",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      public: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      underscored: true,
    }
  );
};
