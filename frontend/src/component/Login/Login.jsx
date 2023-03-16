import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Toast,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../helper/api";

const intState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(intState);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const login = (payload) => {
    setLoading(true);
    axios
      .post(`${api}/user/login`, payload)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          toast({
            title: "Login success",
            position: "top",
            description: "calculate your intersets",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setLoading(false);
          localStorage.setItem("user_id", JSON.stringify(res.data));
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "login failure",
          position: "top",
          description: "email or password not matched",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      });
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
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
};

export default Login;
