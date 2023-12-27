import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const fileSchema = z
  .any()
  .refine((file) => SUPPORTED_FORMATS.includes(file[0]?.type), {
    message:
      "Unsupported file format. Only jpg, jpeg, gif, and png are supported.",
  });

const schema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" })
    .max(20, { message: "First name must be at most 20 characters long" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long" })
    .max(20, { message: "Last name must be at most 20 characters long" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long" }),
  dateOfBirth: z.string().min(10, { message: "Enter a valid date" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  picture: fileSchema,
});

type FieldValues = z.infer<typeof schema>;

function RegisterPage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ resolver: zodResolver(schema) });
  const formBackground = useColorModeValue("white", "gray.800");


  const { register: authRegister } = useAuth();

  const history = useNavigate();
  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("date_of_birth", data.dateOfBirth);
    formData.append("password", data.password);
    formData.append("picture", data.picture[0]);

    authRegister(formData);

    
  };

  return (
    <Center
      h="100vh"
      bgImage="public/cat5.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      height="100%"
      >
      <Box
        bg={formBackground}
        boxShadow={"2xl"}
        width="lg"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        padding="5"
        marginY="60px"
      >
        Register
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
            history("/");
          })}
        >
          <FormControl marginTop={4}>
            <FormLabel>First Name</FormLabel>
            <Input {...register("firstName")} type="text" id="firstName" />
            {!errors.firstName && (
              <FormHelperText> Please enter your first name.</FormHelperText>
            )}
            {errors.firstName && (
              <FormHelperText>{errors.firstName.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl marginTop={4}>
            <FormLabel>Last Name</FormLabel>
            <Input {...register("lastName")} type="text" id="lastName" />
            {!errors.lastName && (
              <FormHelperText> Please enter your last name.</FormHelperText>
            )}
            {errors.lastName && (
              <FormHelperText>{errors.lastName.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl marginTop={4}>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} type="text" id="email" />
            {!errors.email && (
              <FormHelperText> Please enter your email.</FormHelperText>
            )}
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl marginTop={4}>
            <FormLabel>Phone</FormLabel>
            <Input {...register("phone")} type="text" id="phone" />
            {!errors.phone && (
              <FormHelperText> Please enter your phone.</FormHelperText>
            )}
            {errors.phone && (
              <FormHelperText>{errors.phone.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl marginTop={4}>
            <FormLabel>Address</FormLabel>
            <Input {...register("address")} type="text" id="address" />
            {!errors.address && (
              <FormHelperText> Please enter your address.</FormHelperText>
            )}
            {errors.address && (
              <FormHelperText>{errors.address.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl marginTop={4}>
            <FormLabel>Password</FormLabel>
            <Input {...register("password")} type="password" id="password" />
            {!errors.password && (
              <FormHelperText> Please enter your password.</FormHelperText>
            )}
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl marginTop={4}>
            <FormLabel>Date of Birth</FormLabel>
            <Input {...register("dateOfBirth")} type="date" id="dateOfBirth" />
            {!errors.dateOfBirth && (
              <FormHelperText> Please enter your date of birth.</FormHelperText>
            )}
            {errors.dateOfBirth && (
              <FormHelperText>{errors.dateOfBirth.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl marginTop={4}>
            <FormLabel>Picture</FormLabel>
            <Box
              as="label"
              htmlFor="picture"
              px={4}
              py={2}
              lineHeight="short"
              borderRadius="md"
              color="white"
              _hover={{ bg: "gray.600" }}
              cursor="pointer"
              width="100%"
              textAlign="center"
            >
              Upload Picture
              <Input
                {...register("picture")}
                id="picture"
                type="file"
                accept="image/*"
                hidden
              />
            </Box>

            {!errors.picture && (
              <FormHelperText> Please enter your picture.</FormHelperText>
            )}
            {errors.picture && (
              <FormHelperText color="red">
                {errors.picture.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>

          <HStack>
            <Button
              mt={4}
              colorScheme="twitter"
              type="submit"
              isDisabled={!isValid}
            >
              Register
            </Button>
            <Button
              mt={4}
              colorScheme="twitter"
              type="reset"
              onClick={() => history("/")}
            >
              Login
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default RegisterPage;
