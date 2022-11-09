//import sequelize from "../model";
import sequelize from '../dbConnection/connection';
import { Op } from "sequelize";
import { CustomError } from '../customError/customError';
import { CustomerBooking } from '../dto/bookingDto';
import { Booking_Status, RoomDetails } from '../entity/roomDeatils';

class DatabaseService {

    async findAvailableRooms(checkIn: Number): Promise<Array<RoomDetails>> {
        try {
            return await sequelize.models.room.findAll({
                where: {
                    [Op.or]: [
                        {
                            bookingStatus: Booking_Status.AVAILABLE
                        },
                        {
                            checkOut: {
                                [Op.lt]: checkIn
                            }
                        }
                    ]
                }
            })
        } catch (error) {
            throw new CustomError('something went wrong while fetching the data from database', 500)
        }
    }

    async findRoomById(roomId: string): Promise<RoomDetails> {
        try {
            return await sequelize.models.room.findOne({
                where: {
                    roomNumber: roomId
                }
            })
        } catch (error) {
            throw new CustomError('something went wrong while fetching the data from database', 500)
        }
    }

    async updateRoomById(roomId: string , customerBooking: CustomerBooking): Promise<Array<number>> {
        try {
            return await sequelize.models.room.update(customerBooking, {
                where: {
                    roomNumber: roomId
                }
            })
        } catch (error) {
            throw new CustomError('something went wrong while updating data in the database', 500)
        }
    }
}

export default new DatabaseService();
