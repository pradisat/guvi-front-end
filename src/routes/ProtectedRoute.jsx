import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import axios from "../service/axios.config";
import { validateurl } from "../service/api";
import { ClipLoader } from "react-spinners";
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const validate = async function () {
    try {
      setLoading(true);
      let response = await axios.get(validateurl);
      setLoading(false);
      if (response.status == 200) {
        setUser(response.data?.data);
        navigate("/", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      navigate("/signin");
    }
  };

  useEffect(() => {
    validate();
  }, []);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader />
      </Container>
    );
  }

  return !user ? <Outlet /> : <Navigate to={"/signin"} replace />;
}
