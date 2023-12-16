import Category from "./Category";



export default interface Book {
        id: number;
        title: string;
        author_first_name?: string;
        author_last_name?: string;
        category?: Category;
        isbn: string;
        description: string;
        stock: number;
        publisher: string;
        published_at: string;
        language: string;
        edition: string;
        picture: string;
}