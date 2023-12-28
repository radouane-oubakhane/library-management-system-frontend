import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  useColorModeValue
} from "@chakra-ui/react";

import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useAuth from "../hooks/auth/useAuth";
import User from "../models/User";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

type FieldValues = z.infer<typeof schema>;

function LoginPage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ resolver: zodResolver(schema) });

  const { login } = useAuth();

  const history = useNavigate();
  const onSubmit = (data: FieldValues) => {
    login(data as User);
  };

  const formBackground = useColorModeValue("white", "gray.800");

  return (
    <Center
      h="100vh"
      bgImage="public/cat5.jpg"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        bg={formBackground}
        boxShadow={"2xl"}
        width="lg"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        padding="5"
        marginTop="200px"
      >
        Sign in
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
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
            <FormLabel>Password</FormLabel>
            <Input {...register("password")} type="password" id="password" />
            {!errors.password && (
              <FormHelperText>Please enter your password.</FormHelperText>
            )}
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <HStack>
            <Button
              mt={4}
              colorScheme="twitter"
              type="submit"
              isDisabled={!isValid}
            >
              Login
            </Button>
            <Button
              mt={4}
              colorScheme="twitter"
              type="reset"
              onClick={() => history("/register")}
            >
              Register
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default LoginPage;
