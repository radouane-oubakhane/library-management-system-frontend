


export default interface ReservationRequest {
    member_id: number;
    book_id: number;
    reserved_at: string
    canceled_at?: string;
    expired_at?: string;
}


