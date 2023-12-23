import Book from "./Book";
import Member from "./Member";


export default interface Reservation {
    id: number;
    member: Member;
    book: Book;
    reserved_at: string;
    canceled_at: string | null;
    expired_at: string | null;
    status: string;
    return_date?: string;
}


