import * as Joi from 'joi'

export interface GetAvailableRooms {
    checkIn: number
    checkOut: number
    capacity: number
}

export const getAvailableRoomsSchema = Joi.object({
    checkIn: Joi.number().required(),
    checkOut: Joi.number().required(),
    capacity: Joi.number().required(),
})

export interface CustomerBooking {
    customerName: String
    checkIn: number
    checkOut: number
    hotelId: String
}

export const customerBookingSchema = Joi.object({
    customerName: Joi.string().required(),
    checkIn: Joi.number().required(),
    checkOut: Joi.number().required(),
    hotelId: Joi.string().required(),
})

export interface PaymentIntent {
    roomId: String
    hotelId: String
}

export const paymentIntentSchema = Joi.object({
    roomId: Joi.string().required(),
    hotelId: Joi.string().required(),
})


export interface ResponseBody {
    message: String
    data: any
}

