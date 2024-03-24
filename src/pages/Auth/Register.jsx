import React, { useEffect, useState } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { base_url } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
function Register() {
  const [rolesList, setRoleData] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const initialData = {
    role: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
  };
  const [inputData, setInputData] = useState(initialData);
  useEffect(() => {
    getRoleList();
  }, []); // eslint-disable-line

  const getRoleList = async () => {
    try {
      const response = await fetch(`${base_url}roleList`);
      const data = await response.json();
      setRoleData(data.items);
    } catch (error) {
      console.error("Error fetching another data:", error);
    }
  };

  const handleRoleChange = (event) => {
    setInputData({ ...inputData, role: event.target.value });
  };
  const handleNameChange = (event) => {
    setInputData({ ...inputData, name: event.target.value });
  };
  const handleEmailChange = (event) => {
    setInputData({ ...inputData, email: event.target.value });
  };
  const handleMobileChange = (event) => {
    setInputData({ ...inputData, mobile: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setInputData({ ...inputData, password: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!inputData.role.trim()) {
      errors.role = "Role is required";
    }
    if (!inputData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!inputData.email) {
      errors.email = "Email is required";
    }
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
      fetch(`${base_url}createuser`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate("/login");
        });
    }
  };

  return (
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputData.role}
              label="Role"
              onChange={handleRoleChange}
              // error={!!errors.role}
              // helperText={errors.role}
              autoFocus
            >
              {rolesList.map((option) => (
                <MenuItem key={option.role} value={option.role}>
                  {option.role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            value={inputData.name}
            onChange={handleNameChange}
            label="Full Name"
            name="fname"
            autoComplete="fname"
            type="text"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={inputData.email}
            onChange={handleEmailChange}
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobile"
            value={inputData.mobile}
            onChange={handleMobileChange}
            label="Mobile"
            name="mobile"
            autoComplete="mobile"
            type="number"
            error={!!errors.mobile}
            helperText={errors.mobile}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={inputData.password}
            onChange={handlePasswordChange}
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link as={Linker.Link} to="/login" variant="body2">
                Login?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
