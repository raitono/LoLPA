import { QueryInterface, DataTypes } from 'sequelize';

async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('summoners', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    summonerId: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    accountId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    puuid: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    summonerLevel: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    revisionDate: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    profileIconId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
}

async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('summoners');
}

module.exports = { up, down };