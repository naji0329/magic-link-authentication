import {
  Box,
  Button,
  IconButton,
  Modal,
  OutlinedInput,
  Popover,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { navClasses } from "../class/nav";
import unsecuredCopyToClipboard from "../utils/clipboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useRef, useState } from "react";
import { btnClasses } from "../class/button";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEntry,
  checkMagicLogged,
  connectPhantom,
  connectWallet,
  disconnectWallet,
  getLastTime,
  showWalletUI,
} from "../actions/auth";
import useCustomClass from "../class/useCustomClasses";
import { getProvider } from "../utils/phantom";
import { getAddress16 } from "../utils/address";

const MainLayout = ({}) => {
  const theme = useTheme();
  const [popOpen, setPopOpen] = useState(false);
  const anchor = useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const provider = useSelector((state) => state.provider.provider);

  const [magicWalletPopup, setMagicWalletPopup] = useState(false);

  const [email, setEmail] = useState("");
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(null);
  const classes = useCustomClass();
  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      setIsPhantomInstalled(true);
    } else {
      setIsPhantomInstalled(false);
    }
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getLastTime(provider, auth.walletAddress));
    } else {
      if (isPhantomInstalled) {
      } else {
        dispatch(checkMagicLogged());
      }
    }
  }, [auth.isAuthenticated, isPhantomInstalled, dispatch, provider]);

  return (
    <>
      <Stack
        marginTop={"42px"}
        alignItems={"center"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        paddingX={"60px"}
        paddingBottom={5}
        sx={{
          ...navClasses.navbar,
          [theme.breakpoints.down(480)]: {
            paddingX: "30px",
          },
        }}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"space-between"}
          gap={6}
        >
          {auth.isAuthenticated === true ? (
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <IconButton
                onClick={() => {
                  dispatch(showWalletUI());
                }}
              >
                <AccountCircleIcon
                  fontSize="large"
                  style={{ color: "white" }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setPopOpen(true);
                }}
              >
                <ArrowDropDownIcon
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  style={{ color: "white" }}
                  ref={anchor}
                />
              </IconButton>
              <Popover
                open={popOpen}
                anchorEl={anchor.current}
                onClose={() => {
                  setPopOpen(false);
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Stack paddingX={2} paddingTop={2} gap={1} width={"120px"}>
                  <Button
                    onClick={() => {
                      dispatch(disconnectWallet());
                      setPopOpen(false);
                    }}
                  >
                    log out
                  </Button>
                </Stack>
              </Popover>
              <Stack
                sx={{
                  color: "white",
                  fontFamily: "Roboto",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                flexDirection={"row"}
                alignItems={"center"}
                gap={0.5}
                onClick={() => {
                  unsecuredCopyToClipboard(auth.walletAddress);
                }}
              >
                {getAddress16(auth.walletAddress)}
                {auth.email && <Box mx={1}>{auth.email}</Box>}
                <Stack
                  sx={{
                    color: "white",
                  }}
                  flexDirection={"row"}
                  gap={2}
                  mx={2}
                >
                  <Box>LastTime:</Box>
                  {auth.lastTime && (
                    <Box mx={1}>
                      {new Date(Number(auth.lastTime) * 1000).toLocaleString()}
                    </Box>
                  )}
                </Stack>
                <Stack>
                  <Button
                    sx={classes.button}
                    variant="outlined"
                    onClick={() => {
                      dispatch(checkEntry(provider, auth.walletAddress));
                    }}
                  >
                    Update
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <Button
              sx={{
                ...btnClasses.buttonPrimary,
                backgroundColor: "#287693",
                fontSize: "18px",
                [theme.breakpoints.down(640)]: {
                  display: "none",
                },
              }}
              onClick={() => {
                const provider = getProvider();
                if (provider) dispatch(connectPhantom());
                else {
                  setMagicWalletPopup(true);
                }
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Stack>

        <Modal
          open={magicWalletPopup && !auth.isAuthenticated}
          onClose={() => {
            setMagicWalletPopup(false);
          }}
        >
          <Box
            sx={{
              ...classes.subContainer,
              padding: "20px",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              backgroundColor: "white",
              flexDirection: "column",
              display: "flex",
              gap: 2,
              minWidth: "500px",
              textAlign: "center",
            }}
          >
            <Typography fontSize={"30px"}>Please Signup or Login</Typography>
            <OutlinedInput
              value={email}
              placeholder="Input your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                dispatch(connectWallet(email));
              }}
            >
              Send
            </Button>
          </Box>
        </Modal>
      </Stack>
    </>
  );
};
export default MainLayout;
