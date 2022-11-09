
export enum Booking_Status {
    PENDING = 'pending',
    AVAILABLE = 'available',
    BOOKED = 'booked',
}

export interface RoomDetails {
    id: number
    customerName: string
    roomNumber: number
    capacity: number
    bookingStatus: Booking_Status
    checkIn: string
    checkOut: string
    hotelId: number
    createdAt: string,
    updatedAt: string
}