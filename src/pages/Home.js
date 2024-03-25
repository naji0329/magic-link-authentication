import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import useBalance from "../hooks/useBalance";
import typoClasses from "../class/typo";
export const Home = () => {
  const auth = useSelector((state) => state.auth);
  const balance = useBalance();
  return (
    <>
      <Stack
        alignItems={"center"}
        sx={{
          color: "white",
          fontSize: "30px",
          ...typoClasses.text,
        }}
      >
        <Stack justifyContent={"center"} alignItems={"flex-start"} gap={3}>
          <Stack>Wallet Address : {auth.walletAddress}</Stack>
          <Stack>
            Email:&nbsp;
            {auth.email || "(You are using phantom wallet)"}
          </Stack>

          <Stack>Balance : {balance}</Stack>

          <Stack>Last Time: {auth.lastTime || "Unset"}</Stack>
        </Stack>
      </Stack>
    </>
  );
};