import AdminReservationTable from "../components/AdminReservationTable";
import ReservationTable from "../components/ReservationTable";
import useAuth from "../hooks/auth/useAuth";




const ReservationsPage = () => {
  const {user} = useAuth();
  if (user?.is_admin) {
    return <AdminReservationTable />
  }
  
  return (
    <>
      <ReservationTable />
    </>
  );
};

export default ReservationsPage;
