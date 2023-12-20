import HeaderPage from "../components/HeaderPage"
import ReservationTable from "../components/ReservationTable"
import useReservations from "../hooks/reservation/useReservations"

const ReservationsPage = () => {
    const { data: reservations, error, isLoading } = useReservations()
    return (
        <>
        <HeaderPage title="Reservations" button={false} />
    <ReservationTable reservations={reservations} isLoading={isLoading} error={error} />
        </>
    )
}

export default ReservationsPage