import { Button } from "@chakra-ui/react";
import BorrowTable from "../components/BorrowTable";
import HeaderPage from "../components/HeaderPage";
import useBorrows from "../hooks/category/useBorrows";
import { useState } from "react";

const BorrowsPage = () => {
  const { data: borrows, error, isLoading } = useBorrows();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers =
    searchTerm === ""
      ? borrows
      : borrows?.filter(
          (borrow) => (
            borrow.member.first_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            borrow.member.last_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            borrow.book.title.toLowerCase().includes(searchTerm.toLowerCase()))
        );

  return (
    <>
      <HeaderPage
        title="Borrows"
        ButtonComponent={Button}
        searching
        setSearchTerm={setSearchTerm}
      />
      <BorrowTable
        borrows={filteredMembers}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default BorrowsPage;
