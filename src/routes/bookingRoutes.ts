import express, { Router } from "express";
import bookingController from "../controller/bookingController";
const router: Router = express.Router();

router.post("/get-available-rooms", bookingController.getAvailableRooms)
router.get("/get-room-details/:roomId", bookingController.getRoomDetails)
router.put("/customer-booking/:roomId", bookingController.customerBooking)
router.get("/customer-checkout/:roomId", bookingController.customerCheckout)
router.post("/payment-intent-create", bookingController.paymentIntentCreate)
router.post("/webhook-payment", bookingController.webhookPayment)

export default router;
