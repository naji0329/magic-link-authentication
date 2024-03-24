import { createTheme } from "@mui/material/styles";

const palette = {
  palette: {
    text: {
      primary: "#000000",
      secondary: "#D3D3D3",
      lighter: "#363546",
      contrast: "#ffffff",
      brown: "#23222D",
      tertiary: "#DBDBDB",
      accent: "#AFAFAF",
      green: "#10B1A7",
    },
    background: {
      primary: "#252D42",
      secondary: "#1F1F1F",
      light: "#303030",
      stone: "#4E4E4E",
      green: "#10B1A7",
    },
    warnning: {
      primary: "#F8C71D",
      secondary: "#D64C56",
      third: "#A62A36",
    },
    success: {
      main: "#2CB53B",
      primary: "#1AA52B",
    },
    border: {
      primary: "#E1E1E1",
      secondary: "#CFCBC9",
      light: "#F0F0F0",
    },
    status: {
      active: "#C0D4E4",
      inactive: "#6293BC",
      available: "#2CB53B",
      deposit: "#6D6D6D",
      client: "#23465F",
      offer: "#1169DC",
      suggestion: "#ABABAB",
      driver: "#AC890B",
      unique: "#D64C56",
      loaned: "#005609",
      warehouse: "#A78407",
      pending: "#F8C71D",
      rejected: "#D64C56",
      progress: "#F8C71D",
      closed: "#2CB53D",
      archived: "#F8C71D",
    },
    list: {
      primary: "#F7F6F3",
      selected: "#FFFFFF",
    },
    card: {
      primary1: "#23222D",
      primary2: "#00195A",
      primary3: "#C0D4E4",
      primary4: "#E7E6E3",
    },
  },
};

const theme = createTheme({
  ...palette,
});

export default theme;
