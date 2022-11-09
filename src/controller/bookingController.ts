import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../customError/customError';
import { CustomerBooking, customerBookingSchema, GetAvailableRooms, getAvailableRoomsSchema, paymentIntentSchema, ResponseBody } from '../dto/bookingDto';
import { RoomDetails } from '../entity/roomDeatils';
import bookingService from "../service/bookingService";
import stripeService from "../service/stripeService";
//+13022814650 - phone number
//sagarpalskar96@gmail.com - email 
//deqode@123 - password

class BookingController {

    async getAvailableRooms(req: Request, res: Response, next: NextFunction): Promise<void> {
        const getAvailableRoomsDto: GetAvailableRooms = req.body
        try {
            await getAvailableRoomsSchema.validateAsync(getAvailableRoomsDto)
        } catch (error) {
            return next(new CustomError('invalid request body', 412))
        }

        let rooms: Array<RoomDetails> = []
        try {
            rooms = await bookingService.getAvailableRooms(getAvailableRoomsDto)
        } catch (error) {
            return next(error)
        }
        const data: ResponseBody = {
            message: 'search for available rooms successfully',
            data: rooms
        }
        res.status(200).json(data)
    }

    async getRoomDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        const roomId: string = req.params.roomId
        let roomDetails: RoomDetails
        try {
            roomDetails = await bookingService.getRoomDetails(roomId)
        } catch (error) {
            return next(error)
        }

        const data: ResponseBody = {
            message: 'successfully search for room details',
            data: roomDetails
        }
        res.status(200).json(data)
    }

    async customerBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
        //todo we can check status of room before updating status already  updated or not
        const customerBooking: CustomerBooking = req.body
        try {
            await customerBookingSchema.validateAsync(customerBooking)
        } catch (error) {
            return next(new CustomError('invalid request body', 412))
        }

        const roomId: string = req.params.roomId
        try {
            await bookingService.customerBooking(customerBooking, roomId)
        } catch (error) {
            return next(error)
        }
        const data: ResponseBody = {
            message: 'customer booking reserve',
            data: null
        }
        res.status(200).json(data)
    }

    async customerCheckout(req: Request, res: Response, next: NextFunction): Promise<void> {
        //todo we can check status of room before updating status already  updated or not
        const roomId: string = req.params.roomId
        try {
            await bookingService.customerCheckout(roomId)
        } catch (error) {
            return next(error)
        }
        const data: ResponseBody = {
            message: 'checkout successfully',
            data: null
        }
        res.status(200).json(data)
    }

    async paymentIntentCreate(req: Request, res: Response, next: NextFunction): Promise<void> {
        // todo need to check hotelid and roomid exist in DB
        try {
            await paymentIntentSchema.validateAsync(req.body)
        } catch (error) {
            return next(new CustomError('invalid request body', 412))
        }

        let session: any = null
        try {
            session = await stripeService.paymentIntentCreate(req.body.hotelId, req.body.roomId)
        } catch (error) {
            return next(error)
        }
        const data: ResponseBody = {
            message: 'payment URL created successfully',
            data: { url: session.url }
        }
        res.status(200).json(data)

    }

    async webhookPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await stripeService.webhookPayment(req)
        } catch (error) {
            return next(error)
        }
        const data: ResponseBody = {
            message: 'webhook working successfully',
            data: null
        }
        res.status(200).json(data)
    }
}

export default new BookingController();
