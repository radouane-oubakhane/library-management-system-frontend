export default interface Member {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  membership_start_date: string;
  membership_end_date: string;
  picture: string;
  reservations_count: number;
  borrows_count: number;
}
