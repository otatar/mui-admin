import { useState } from "react";
import { useFormik } from "formik";
import { object, string as YupString } from "yup";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

//Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { getUser } from "../data/User/services";
import useAuth from "../contexts/AuthContext";
import MuiLogo from "../layout/MuiLogo";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const LoginSchema = object().shape({
    username: YupString().required("Username is required"),
    password: YupString().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    validateOnChange: false, // this one
    validateOnBlur: false, // and this one
    onSubmit: async (data) => {
      try {
        const user = await getUser(data.username);
        login(user, "testJwt", data.remember);
        enqueueSnackbar("Successfully loged in", { variant: "success" });
        navigate(state?.path || "/");
      } catch (e) {
        enqueueSnackbar("Incorrect login credentials", { variant: "error" });
      }
      formik.resetForm();
    },
  });

  const { handleSubmit, values, getFieldProps, touched, errors } = formik;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuiLogo height={100} width={102} />
      <Typography
        variant="h3"
        noWrap
        component="div"
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        MUI Admin
      </Typography>
      <Card sx={{ width: { xs: "80%", md: "50%", lg: "30%", xl: "25%" } }}>
        <CardHeader title="Log In" />
        <CardContent>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <TextField
                fullWidth
                label="Username"
                {...getFieldProps("username")}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />

              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("remember")}
                    checked={values.remember}
                  />
                }
                label="Remember me"
              />
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
