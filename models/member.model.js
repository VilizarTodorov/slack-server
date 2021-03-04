export default (sequelize) => {
  sequelize.define(
    "member",
    {},
    {
      underscored: true,
    }
  );
};
