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
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useBorrowReservation from "../hooks/reservation/useBorrowReservation";
import Reservation from "../models/Reservation";
import { CheckIcon } from "@chakra-ui/icons";

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

  const { mutate, isLoading } = useBorrowReservation();


  const toast = useToast()


  const showIsBorrowing = () => {
    if (isLoading) {
      const examplePromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 5000)
      })
      return toast.promise(examplePromise, {
        success: { title: 'Promise resolved', description: 'Looks great' },
        error: { title: 'Promise rejected', description: 'Something wrong' },
        loading: { title: 'Promise pending', description: 'Please wait' },
      })
    }
  };

  const onsubmit = (data: FormValues) => {
    mutate({ ...reservation, return_date: data.return_date } as Reservation);

    showIsBorrowing();
    onClose();
    reset();
  };

  return (
    <>
      <Button variant="solid" colorScheme="whatsapp" mr={3} onClick={onOpen} leftIcon={<CheckIcon />}>
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
