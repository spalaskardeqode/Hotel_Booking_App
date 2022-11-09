import databaseService from "./databaseService";
import { CustomError } from '../customError/customError';
import { CustomerBooking, GetAvailableRooms } from '../dto/bookingDto';
import { Booking_Status, RoomDetails } from '../entity/roomDeatils';

class BookingService {

    async getAvailableRooms(getAvailableRoomsDto: GetAvailableRooms): Promise<Array<RoomDetails>> {
        let rooms: Array<RoomDetails> = []

        if (getAvailableRoomsDto.checkIn * 1000 > getAvailableRoomsDto.checkOut * 1000) {
            throw new CustomError('checkIn time should be less than checkOut', 412)
        }
        try {
            rooms = await databaseService.findAvailableRooms(getAvailableRoomsDto.checkIn)
        } catch (error) {
            throw new CustomError('something went wrong while fetching the data from database', 500)
        }
        if (rooms.length == 0) {
            throw new CustomError('rooms are not available', 404)
        }
        return rooms
    }

    async getRoomDetails(roomId: string): Promise<RoomDetails> {
        let roomDetails: RoomDetails 

        try {
            roomDetails = await databaseService.findRoomById(roomId)
        } catch (error) {
            throw new CustomError('something went wrong while fetching the data from database', 500)
        }
        if (!roomDetails) {
            throw new CustomError('room not found', 404)
        }
        return roomDetails
    }

    async customerBooking(customerBooking: any, roomId: string): Promise<Array<number> > {
        customerBooking.bookingStatus = Booking_Status.PENDING
        let roomDetails: Array<number> = []
        try {
            roomDetails = await databaseService.updateRoomById(roomId, customerBooking)
        } catch (error) {
            throw new CustomError('something went wrong while updating data in the database', 500)
        }        
        return roomDetails
    }

    async customerCheckout(roomId: string): Promise<Array<number> > {
        const checkOutDetails: any = {
            bookingStatus: "available"
        }
        let roomDetails: Array<number> = []
        try {
            roomDetails = await databaseService.updateRoomById(roomId, checkOutDetails)
        } catch (error) {
            throw new CustomError('something went wrong while updating data in the database', 500)
        }
        return roomDetails
    }
}

export default new BookingService();
