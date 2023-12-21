import {
  Container,
  Card,
  CardHeader,
  CardActions,
  Alert,
  Snackbar,
  Button,
  TextField,
  CardContent,
  Grid,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "../../service/axios.config";
import { logouturl, profileurl } from "../../service/api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function Profile() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    message: "",
    show: false,
    severity: "",
  });

  const handleClose = () => {
    setAlert({ message: "", open: false });
  };

  async function logout() {
    let response = await axios.get(logouturl);

    if (response.status == 200) {
      navigate("/signin", { replace: true });
    }
  }

  async function updateProfile(value) {
    try {
      let response = await axios.put(profileurl, value);
      if (response.status == 200) {
        setAlert({
          message: response.data?.message,
          severity: "success",
          show: true,
        });
      }
    } catch (error) {
      setAlert({
        message: error.response.data?.message,
        severity: "error",
        show: true,
      });
    }
  }

  async function getProfile() {
    let response = await axios.get(profileurl);
    const { email, name, age, dob, mobile, gender } = response?.data?.data;

    formik.setFieldValue("email", email);
    formik.setFieldValue("name", name);
    formik.setFieldValue("age", age);
    if (dob) {
      formik.setFieldValue("dob", moment(dob).format("YYYY-MM-DD"));
    }
    formik.setFieldValue("gender", gender);
    formik.setFieldValue("mobile", mobile);
  }

  useEffect(() => {
    getProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      age: "",
      dob: "",
      gender: "",
      mobile: "",
    },
    validate: ({ name }) => {
      const error = {};
      if (!name) error.name = "Required Name";
      return error;
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: updateProfile,
  });
  return (
    <Container
      component="main"
      sx={{
        ...center,
        height: "100vh",
      }}
    >
      <Card sx={{ width: "80%" }}>
        <CardHeader title="Profile" />
        <CardContent sx={{ ...center }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                {...formik.getFieldProps("name")}
                label="Name"
                fullWidth
                margin="normal"
                type="text"
                error={formik.errors.name}
                helperText={formik.errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...formik.getFieldProps("email")}
                label="Email"
                fullWidth
                disabled
                margin="normal"
                type="email"
                error={formik.errors.email}
                helperText={formik.errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...formik.getFieldProps("mobile")}
                label="Mobile"
                fullWidth
                margin="normal"
                type="number"
                error={formik.errors.email}
                helperText={formik.errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...formik.getFieldProps("gender")}
                label="Gender"
                fullWidth
                margin="normal"
                select
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="1">Male</MenuItem>
                <MenuItem value="2">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...formik.getFieldProps("dob")}
                label="DOB"
                fullWidth
                margin="normal"
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...formik.getFieldProps("age")}
                label="Age"
                fullWidth
                margin="normal"
                type="number"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => formik.submitForm()} variant="contained">
            Update
          </Button>
          <Button onClick={logout} variant="outlined">
            Logout
          </Button>
        </CardActions>
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
