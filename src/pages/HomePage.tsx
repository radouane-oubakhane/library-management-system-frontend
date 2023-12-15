import { Divider } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import BookGrid from "../components/BookGrid";

function HomePage() {
  return (
    <>
      <NavBar />
      <Divider orientation="horizontal" marginBottom={4} />
      <BookGrid />

      
    </>
  );
}

export default HomePage;
