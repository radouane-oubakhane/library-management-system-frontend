import { Button } from "@chakra-ui/react"
import HeaderPage from "../components/HeaderPage"
import ReservationTable from "../components/ReservationTable"
import useReservations from "../hooks/reservation/useReservations"
import { useState } from "react"

const ReservationsPage = () => {
    const { data: reservations, error, isLoading } = useReservations()
    const [searchTerm, setSearchTerm] = useState("");


    const filteredMembers = searchTerm === ""
   ? reservations
    : reservations?.filter(reservation => reservation.member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || reservation.member.last_name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <>
        <HeaderPage title="Reservations" ButtonComponent={Button} searching setSearchTerm={setSearchTerm}/>
    <ReservationTable reservations={filteredMembers} isLoading={isLoading} error={error} />
        </>
    )
}

export default ReservationsPage