import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Logo from "../../assets/logo.webp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import axios from "../../service/axios.config";
import { loginurl } from "../../service/api";
import { useNavigate } from "react-router-dom";
const center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    message: "",
    show: false,
    severity: "",
  });
  const login = async (value) => {
    try {
      let response = await axios.post(loginurl, value);

      if (response.status == 200) {
        setAlert({
          message: response?.data?.message,
          show: true,
          severity: "success",
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message,
        show: true,
        severity: "error",
      });
    }
  };

  const handleClose = () => {
    setAlert({ message: "", open: false });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: ({ email, password }) => {
      const error = {};
      if (!email) error.email = "Required Email";
      if (!password) error.password = "Required Password";
      return error;
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: login,
  });
  return (
    <Container
      component="main"
      sx={{
        ...center,
        height: "100vh",
      }}
    >
      <Card sx={{ width: "50%" }}>
        <CardContent sx={{ ...center }}>
          <img src={Logo} width={200} />
          <TextField
            {...formik.getFieldProps("email")}
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            error={formik.errors.email}
            helperText={formik.errors.email}
          />
          <TextField
            label="Password"
            {...formik.getFieldProps("password")}
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            error={formik.errors.password}
            helperText={formik.errors.password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </IconButton>
              ),
            }}
          />
          <Button
            onClick={() => formik.submitForm()}
            variant="contained"
            color="primary"
            sx={{
              width: "50%",
              margin: "1rem 0",
            }}
          >
            Login
          </Button>
          <div className="content-end">
            <Link to={"/signup"}>Create new account?</Link>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        open={alert.show}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity={alert.severity}
          variant="standard"
          onClose={handleClose}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
