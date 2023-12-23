import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useBorrowReservation from "../hooks/reservation/useBorrowReservation";
import Reservation from "../models/Reservation";

const schema = z.object({
  return_date: z.string().min(10, { message: "Enter a valid date" }),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  reservation: Reservation;
}

const BorrowReservationModel = ({ reservation }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useBorrowReservation();

  const onsubmit = (data: FormValues) => {
    mutate({ ...reservation, return_date: data.return_date } as Reservation);

    onClose();
    reset();
  };

  return (
    <>
      <Button variant="solid" colorScheme="whatsapp" mr={3} onClick={onOpen}>
        Borrow
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Borrow Reservation</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!errors.return_date}>
                <FormLabel>Return Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Return Date"
                  {...register("return_date")}
                />
                <FormHelperText>
                  {errors.return_date && errors.return_date.message}
                </FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                disabled={!isValid}
              >
                Borrow
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default BorrowReservationModel;
