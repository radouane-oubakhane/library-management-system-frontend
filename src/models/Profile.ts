import Borrow from "./Borrow";
import DashboardData from "./DashboardData";
import Reservation from "./Reservation";




export default interface Profile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    date_of_birth: string;
    membership_start_date: string;
    membership_end_date: string;
    picture: string;
    reservation?: Reservation[];
    borrow?: Borrow[];
    dashboardData?: DashboardData;
    }

