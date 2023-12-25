import AdminBorrowTable from "../components/AdminBorrowTable";
import BorrowTable from "../components/BorrowTable";
import useAuth from "../hooks/auth/useAuth";


const BorrowsPage = () => {

  const {user} = useAuth();
  if (user?.is_admin) {
    return <AdminBorrowTable />
  }

  return (
    <>
      <BorrowTable
      
      />
    </>
  );
};

export default BorrowsPage;



