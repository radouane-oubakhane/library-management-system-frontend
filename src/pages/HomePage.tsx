
import InscriptionsTable from '../components/InscriptionsTable'
import NavBar from '../components/NavBar'
import useInscriptions from '../hooks/useInscriptions'

function HomePage() {

  const { data: inscriptions, error } = useInscriptions()

  if (error) {
    return <div>Something went wrong ...</div>
  }

  return (
    <>
      <NavBar />
      <InscriptionsTable inscriptions={inscriptions || []} />
    </>
  )
}

export default HomePage
