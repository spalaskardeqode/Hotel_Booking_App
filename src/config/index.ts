import {Sequelize} from "sequelize";
import config from "config";
config.get("host")

const sequelize = new Sequelize(
    config.get("databaseName"),
    config.get("databaseUsername"), 
    config.get("databasePassword"),
    {
        dialect: config.get("dialect")
    });

module.exports = sequelize;