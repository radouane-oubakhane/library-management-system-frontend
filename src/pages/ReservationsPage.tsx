import { Button } from "@chakra-ui/react";
import HeaderPage from "../components/HeaderPage";
import ReservationTable from "../components/ReservationTable";
import useReservations from "../hooks/reservation/useReservations";
import { useState } from "react";
import Reservation from "../models/Reservation";

const ReservationsPage = () => {
  const { data: reservations, error, isLoading } = useReservations();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  let filteredReservations: Reservation[] | undefined = [];

  const filters = [
    { name: "reserved", value: "reserved", color: "yellow" },
    { name: "canceled", value: "canceled", color: "red" },
    { name: "expired", value: "expired", color: "blue" },
    { name: "borrowed", value: "borrowed", color: "green" },
    { name: "Clear", value: "", color: "gray" },
  ];


  if (filter === "" && searchTerm === "") {
    filteredReservations = reservations;
  } else if (filter !== "" && searchTerm === "") {
    filteredReservations = reservations?.filter(
      (reservation) => reservation.status === filter
    );
  }
    else if (filter === "" && searchTerm !== "") {
        filteredReservations = reservations?.filter(
        (reservation) =>
            reservation.member.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            reservation.member.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            reservation.book.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) 
        );
    } else {
        filteredReservations = reservations?.filter(
        (reservation) =>
            reservation.status === filter &&
            (reservation.member.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            reservation.member.last_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            reservation.book.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))

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
        title="Reservations"
        ButtonComponent={Button}
        searching
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        filtering
        filters={filters}
        setFilter={onSelectedFilter}
      />
      <ReservationTable
        reservations={filteredReservations}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default ReservationsPage;
