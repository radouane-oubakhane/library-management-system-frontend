

export default interface User {
    id: number;
    email: string;
    password?: string;
    is_admin?: boolean;
    first_name?: string;
    last_name?: string;
    picture?: string;
    member_id?: number;
    }