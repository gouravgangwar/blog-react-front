import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Linker from "react-router-dom";
import { base_url } from "../../services/api.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const initialData = {
    mobile: "",
    password: "",
  };
  const [inputData, setInputData] = useState(initialData);

  const handleMobileChange = (event) => {
    setInputData({ ...inputData, mobile: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setInputData({ ...inputData, password: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!inputData.mobile) {
      errors.mobile = "mobile is required";
    }
    if (!inputData.password) {
      errors.password = "password is required";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log(inputData);
      // Perform form submission here
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      };
      fetch(`${base_url}loginuser`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('UserDetails',JSON.stringify(data.userDetails))
          navigate("/home");
        });
    }
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile"
            autoComplete="mobile"
            value={inputData.mobile}
            onChange={handleMobileChange}
            error={!!errors.mobile}
            helperText={errors.mobile}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={inputData.password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link as={Linker.Link} to="/forget" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link as={Linker.Link} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}

export default Login;
