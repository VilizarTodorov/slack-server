function applyExtraSetup(sequelize) {
  const { instrument, orchestra } = sequelize.models;

  orchestra.hasMany(instrument);
  instrument.belongsTo(orchestra);
}

export default applyExtraSetup;
