import { STRING, BOOLEAN, DATE, NUMBER, INTEGER } from "sequelize";

const Room = {
    customerName: STRING,
    roomNumber: INTEGER,
    capacity: INTEGER,
    bookingStatus: STRING,
    checkIn: STRING,
    checkOut: STRING,
    hotelId: INTEGER
}

export default Room;