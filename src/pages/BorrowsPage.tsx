import BorrowTable from "../components/BorrowTable"
import useBorrows from "../hooks/category/useBorrows"

const BorrowsPage = () => {
    const { data: borrows, error, isLoading } = useBorrows()
    return (
    <BorrowTable borrows={borrows} isLoading={isLoading} error={error} />
    )
}

export default BorrowsPage