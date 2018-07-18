module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  })

  return Message
}
