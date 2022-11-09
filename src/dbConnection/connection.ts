const Sequelize = require("sequelize");
import config from "config";

const sequelize = new Sequelize(config.get("databaseName"),
    config.get("databaseUsername"),
    config.get("databasePassword"),
    {
        dialect: config.get("dialect")
    });

export = sequelize;