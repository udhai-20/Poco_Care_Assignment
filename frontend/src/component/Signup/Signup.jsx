import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
const initial = {
  firstname: "",
  lastname: "",
  email: "",
  mobilenumber: "",
  password: "",
};
function Signup(props) {
  const [formData, setFormData] = useState(initial);
  const { firstname, lastname, email, password, mobilenumber } = formData;
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Signup
        </Heading>
        <FormControl id="firstname" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            placeholder="enter your firstname"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={firstname}
            name="firstname"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="lastname" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            placeholder="enter your lastname"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={lastname}
            name="lastname"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="mobile" isRequired>
          <FormLabel>Mobile Number</FormLabel>
          <Input
            placeholder="enter your mobile number"
            _placeholder={{ color: "gray.500" }}
            type="tel"
            value={mobilenumber}
            name="mobilenumber"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Signup;
