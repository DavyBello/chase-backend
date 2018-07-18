module.exports = (sequelize, DataTypes) => {
  const Investment = sequelize.define('Investment', {
    market: DataTypes.STRING,
    packages: DataTypes.STRING,
    amount: DataTypes.STRING,
    duration: DataTypes.STRING
  })

  Investment.associate = function (models) {
    Investment.belongsTo(models.User)
  }

  return Investment
}
