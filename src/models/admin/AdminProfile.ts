import Inscription from "../Inscription";
import DashboardData from "./DashboardData";


export default interface AdminProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    date_of_birth: Date;
    membership_start_date: Date;
    membership_end_date: Date;
    picture: string;
    inscriptions?: Inscription[];
    dashboardData?: DashboardData;
}
