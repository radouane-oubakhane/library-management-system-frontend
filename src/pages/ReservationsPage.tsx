import ReservationTable from "../components/ReservationTable"
import useReservations from "../hooks/useReservations"

const ReservationsPage = () => {
    const { data: reservations, error, isLoading } = useReservations()
    return (
    <ReservationTable reservations={reservations} isLoading={isLoading} error={error} />
    )
}

export default ReservationsPage