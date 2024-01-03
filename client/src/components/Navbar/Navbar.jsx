import { CloseIcon, HamburgerIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Badge,
  Flex,
  IconButton,
  Stack,
  Avatar,
  Card,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Center,
  Text,
  useBreakpointValue,
  AvatarBadge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  CardBody,
  Divider,
  CardHeader,
  CardFooter,
  Tooltip,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { USER_BADGE_COLORS } from "../../data/options";
import { NAV_ITEMS } from "../../data/options";
import { getIsLogged, logOut, getUser } from "../../reducers/authSlice";

import DesktopNavBar from "../DesktopNavBar";
import MobileNavBar from "../MobileNavBar";
import ColorSwitcher from "../ColorSwitcher";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("purple.600", "orange")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/">
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              fontSize={"2xl"}
              fontWeight={"700"}
              bgGradient="linear(to-r, orange.300, purple.600)"
              bgClip="text"
              ml={"5"}
            >
              JournaLyfe
            </Text>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNavBar />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!isLogged && <ColorSwitcher />}
          {!isLogged && (
            <>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"purple.500"}
                _hover={{
                  bg: "purple.300",
                }}
                href={"login"}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"orange.500"}
                _hover={{
                  bg: "orange.300",
                }}
                href={"register"}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLogged && (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                mr="5"
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  p={"1"}
                  bgGradient="linear(to-r, purple.300, orange.600)"
                  _hover={{
                    bgGradient: "linear(to-r, purple.200, orange.500)",
                  }}
                ></Avatar>
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    color={"white"}
                    colorScheme="blue"
                    bgGradient="linear(to-r, purple.300, orange.600)"
                    _hover={{
                      bgGradient: "linear(to-r, purple.200, orange.500)",
                    }}
                    name={user ? `${user.name} ${user.surname}` : null}
                    size={"xl"}
                  />
                </Center>
                <br />
                <Center>
                  <Text fontWeight={"600"}>
                    {user && `${user.name} ${user.surname}`}
                  </Text>
                </Center>
                <Center>
                  <Badge colorScheme={USER_BADGE_COLORS[user?.sub_tier]} m="1">
                    {user?.sub_tier}
                  </Badge>
                </Center>
                {/* <br /> */}
                <MenuDivider />
                <Center>
                  <Text fontWeight={"600"}>
                    Credits: {user && user.credit_count}
                  </Text>
                </Center>
                <MenuDivider />
                <Center>
                  <Text>{user && `You are ${user.sub_tier} user!`}</Text>
                </Center>
                <MenuDivider />
                <Center>
                  Toggle Theme <ColorSwitcher />
                </Center>
                {/* <MenuItem icon={<ColorModeSwitcher />}>Toggle Theme </MenuItem> */}
                <MenuDivider />
                <Link to="/MyJournal">
                  <MenuItem>My Profile</MenuItem>
                </Link>
                <MenuItem onClick={onOpenModal}></MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(logOut());
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNavBar />
      </Collapse>
    </Box>
  );
}
