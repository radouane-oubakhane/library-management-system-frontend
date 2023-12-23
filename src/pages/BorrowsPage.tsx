import { Button } from "@chakra-ui/react";
import BorrowTable from "../components/BorrowTable";
import HeaderPage from "../components/HeaderPage";
import useBorrows from "../hooks/category/useBorrows";
import { useState } from "react";
import Borrow from "../../models/Borrow";


const BorrowsPage = () => {
  const { data: borrows, error, isLoading } = useBorrows();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  let filteredMembers: Borrow[] | undefined = [];

  const filters = [
    { name: "borrowed", value: "borrowed", color: "yellow" },
    { name: "returned", value: "returned", color: "green" },
    { name: "overdue", value: "overdue", color: "red"},
    { name: "Clear", value: "", color: "gray" },
  ];

  if (filter === "" && searchTerm === "") {
    filteredMembers = borrows;
  } else if (filter !== "" && searchTerm === "") {
    filteredMembers = borrows?.filter(
      (borrow) => borrow.status === filter
    );
  } else if (filter === "" && searchTerm !== "") {
    filteredMembers = borrows?.filter(
      (borrow) =>
        borrow.member.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        borrow.member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrow.book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredMembers = borrows?.filter(
      (borrow) =>
        borrow.status === filter &&
        (borrow.member.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          borrow.member.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          borrow.book.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }


  const onSelectedFilter = (filter: string) => {
    setFilter(filter);
    if (filter === "") {
      setSearchTerm("");
    }
  }

  return (
    <>
      <HeaderPage
        title="Borrows"
        ButtonComponent={Button}
        searching
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        filtering
        filters={filters}
        setFilter={onSelectedFilter}
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
