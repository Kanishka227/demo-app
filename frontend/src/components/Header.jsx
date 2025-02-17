import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineStock } from "react-icons/ai";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings, MdOutlineExplore } from "react-icons/md";
import { AiOutlineFileSync } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import LocationSettingModal from "./LocationSettingModal";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [locationSettingsOpen, setLocationSettingsOpen] = useState(false);

  useEffect(() => {
    if (user && !user?.selectedLocation) {
      setLocationSettingsOpen(true);
    }
  }, [user]);
  
  return (
    <Flex
      justifyContent={"space-between"}
      mt={6}
      mb="12"
      w={"90%"}
      ms={"auto"}
      me={"auto"}
    >
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("login")}
        >
          Login
        </Link>
      )}
      <Button colorScheme="white" variant="outline" onClick={toggleColorMode}>
        Evntiq
      </Button>
      {/* 
			<Text
				cursor={"pointer"}
				fontSize="xl"
				fontWeight="bold"
				onClick={toggleColorMode}
			>
				
			</Text> */}

      {user && (
        <Flex alignItems={"center"} gap={4} >
          <Flex
            alignItems={"center"}
            gap={2}
            onClick={() => setLocationSettingsOpen(!locationSettingsOpen)}
            cursor={"pointer"}
          >
            <FaAngleDown />
            <Text>
              {" "}
              {user?.selectedLocation
                ? user.selectedLocation
                : "Select Location"}
            </Text>
          </Flex>
          {user && (
            <LocationSettingModal
              locationSettingsOpen={locationSettingsOpen}
              setLocationSettingsOpen={setLocationSettingsOpen}
              user={user}
            />
          )}
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/discover`}>
            <MdOutlineExplore size={25} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link as={RouterLink} to={`/tickets`}>
            <AiOutlineFileSync size={20} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={20} />
          </Link>
          {user.soloOrganizer && (
            <Link as={RouterLink} to={"/analytics"}>
              <AiOutlineStock size={20} />
            </Link>
          )}

          {user && (
            <Link as={RouterLink} to={"/calendar"}>
              <CiCalendar size={20} />
            </Link>
          )}
          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}

      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
