function applyExtraSetup(sequelize) {
  const { user, team, message, channel, member } = sequelize.models;

  user.belongsToMany(team, {
    through: member,
    foreignKey: "userId",
  });

  user.belongsToMany(channel, {
    through: "channel_member",
    foreignKey: "userId",
  });

  team.belongsToMany(user, {
    through: member,
    foreignKey: "teamId",
  });
  team.belongsTo(user, {
    foreignKey: "owner",
  });

  message.belongsTo(channel, {
    foreignKey: "channelId",
  });

  message.belongsTo(user, {
    foreignKey: "userId",
  });

  channel.belongsTo(team, {
    foreignKey: "teamId",
  });

  channel.belongsToMany(user, {
    through: "channel_member",
    foreignKey: "channelId",
  });
}

export default applyExtraSetup;
