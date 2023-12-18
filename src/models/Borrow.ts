import Book from "./Book";
import Member from "./Member";



export default interface Borrow {
    id: number;
    book: Book; 
    book_copy_id: number;
    member: Member;
    borrow_date: number;
    return_date: number;
    status: string;
}

