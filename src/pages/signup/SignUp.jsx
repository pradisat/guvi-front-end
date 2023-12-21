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
import { registerurl } from "../../service/api";
import { useNavigate } from "react-router-dom";
const center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    show: false,
    severity: "",
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      new_password: "",
      name: "",
      confirm_password: "",
    },
    validate: ({ email, confirm_password, name, new_password }) => {
      const error = {};

      if (new_password.length < 8)
        error.new_password = "Password must be greater than eight character";
      if (new_password != confirm_password) {
        error.confirm_password = "Password did not match";
        error.new_password = "Password did not match";
      }
      if (!email) error.email = "Required Email";
      if (!confirm_password)
        error.confirm_password = "Required Confirm Password";
      if (!new_password) error.new_password = "Required New Password";
      if (!name) error.name = "Required Name";
      return error;
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: register,
  });
  async function register(value) {
    try {
      let response = await axios.post(registerurl, value);

      if (response.status == 201) {
        setAlert({
          message: response?.data.message,
          show: true,
          severity: "success",
        });
        formik.resetForm();
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message,
        show: true,
        severity: "error",
      });
    }
  }

  const handleClose = () => {
    setAlert({ message: "", open: false });
  };

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
            {...formik.getFieldProps("name")}
            label="Name"
            fullWidth
            margin="normal"
            type="text"
            error={formik.errors.name}
            helperText={formik.errors.name}
          />
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
            label="New Password"
            {...formik.getFieldProps("new_password")}
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            error={formik.errors.new_password}
            helperText={formik.errors.new_password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            {...formik.getFieldProps("confirm_password")}
            fullWidth
            margin="normal"
            type={showConfirmPassword ? "text" : "password"}
            error={formik.errors.confirm_password}
            helperText={formik.errors.confirm_password}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
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
            Register
          </Button>
          <div className="content-end">
            <Link to={"/signin"}>Do you want to sign in?</Link>
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
