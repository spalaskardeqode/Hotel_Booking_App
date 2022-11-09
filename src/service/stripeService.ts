//import sequelize from "../model";
import { Request } from 'express';
import config from "config";
const stripe = require('stripe')(config.get('stripeKey'));
import { CustomError } from '../customError/customError';
import databaseService from './databaseService';

class StripeService {

    async paymentIntentCreate(hotelId: String, roomId: String): Promise<any> {
        try {
            return await stripe.checkout.sessions.create({
                //payment_method_types: ["card"],
                mode: "payment",
                line_items: [{
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: hotelId
                        },
                        unit_amount: 1 * 100,
                    },
                    quantity: 1,
                }],
                metadata: {
                    hotelId: hotelId,
                    roomId: roomId
                }
                ,
                success_url: `http://localhost:3000/success_url`,
                cancel_url: `http://localhost:3000/cancel_url`,
            })
        } catch (error) {
            throw new CustomError('something went wrong while creating stripe payment url', 500)
        }
    }

    async webhookPayment(req: any): Promise<void> {
        if (req?.type != 'payment_intent.succeeded') {
            throw new CustomError('invalid event type', 500)
        }
        const endpointSecret = config.get('paymentWebhook')
        try {
            await stripe.webhooks.constructEvent(
                req.body,
                req.headers['stripe-signature'],
                endpointSecret
            )
        } catch (err) {
            throw new CustomError(`error while validating webhook secret key`, 500)
        }
        const metadata = req?.data?.object?.metadata
        const checkOutDetails: any = { bookingStatus: "booked" }
        await databaseService.updateRoomById(metadata.roomId, checkOutDetails)
        return
    }
}

export default new StripeService();
