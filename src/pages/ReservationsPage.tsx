import { Button } from "@chakra-ui/react"
import HeaderPage from "../components/HeaderPage"
import ReservationTable from "../components/ReservationTable"
import useReservations from "../hooks/reservation/useReservations"

const ReservationsPage = () => {
    const { data: reservations, error, isLoading } = useReservations()
    return (
        <>
        <HeaderPage title="Reservations" ButtonComponent={Button} />
    <ReservationTable reservations={reservations} isLoading={isLoading} error={error} />
        </>
    )
}

export default ReservationsPage