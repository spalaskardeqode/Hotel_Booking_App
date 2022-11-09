import sequelize from "../dbConnection/connection";
import Room from "./room";

sequelize.define('room', Room);

export default sequelize
