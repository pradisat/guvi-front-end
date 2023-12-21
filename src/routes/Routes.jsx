import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import SignUp from "../pages/signup/SignUp";
import SignIn from "../pages/signin/SignIn";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0dba4b",
    },
  },
});

export default function Routing() {
  return (
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" Component={Profile} />
          </Route>
          <Route path="/signup" Component={SignUp} />
          <Route path="/signin" Component={SignIn} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
