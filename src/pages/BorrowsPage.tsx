import BorrowTable from "../components/BorrowTable"
import HeaderPage from "../components/HeaderPage"
import useBorrows from "../hooks/category/useBorrows"

const BorrowsPage = () => {
    const { data: borrows, error, isLoading } = useBorrows()
    return (
        <>
        <HeaderPage title="Borrows" button buttonTitle="Add New Borrow" />
    <BorrowTable borrows={borrows} isLoading={isLoading} error={error} />
        </>
    )
}

export default BorrowsPage