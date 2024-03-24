import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const defaultClasses = {
  title1: {},
  title2: {},
  title3: {},
  title4: {},
  textGreen: {},  button: {},
  container: {},  
  subContainer: {},
};
const useCustomClass = () => {
  const theme = useTheme();
  const [classes, setClasses] = useState(defaultClasses);
  useEffect(() => {
    setClasses({
       title4: {
        [theme.breakpoints.down("md")]: {
          fontSize: "20px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "18px",
        },
      },
      title3: {
        [theme.breakpoints.down("md")]: {
          fontSize: "16px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "14px",
        },
      },     
      subContainer: {
        px: 2,
        backgroundColor: "background.light",
        borderRadius: "30px",
        gap: 3,
        [theme.breakpoints.down("md")]: {
          gap: 2,
        },
      },     
      title1: {
        color: "white",
        fontSize: "18px",
        fontWeight: 500,
      
      },
      title2: {
        fontSize: "16px",
        fontWeight: 500,
        color: "white",
        [theme.breakpoints.down("md")]: {
          fontSize: "14px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
        },
      },
      textGreen: {
        color: "#10B1A7",
        fontSize: "19px",
        fontWeight: 500,
        [theme.breakpoints.down("md")]: {
          fontSize: "17px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "15px",
        },
      },
      
    });
  }, []);
  return classes;
};

export default useCustomClass;
