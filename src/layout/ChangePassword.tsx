import { useState } from "react";
import { useFormik } from "formik";
import { object, string as YupString, ref } from "yup";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";

//Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface ChangePasswordProps {
  onDone?: () => void;
}

const ChangePassword = (props: ChangePasswordProps) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const ChangeSchema = object().shape({
    password: YupString().required("Old password is required"),
    newPassword: YupString()
      .required("New password is required")
      .matches(
        /(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\.#?!@$%^&*-]).{6,}$)/,
        "Password minimum length is six characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    newRepeatedPassword: YupString()
      .required("New password is required")
      .oneOf([ref("newPassword")], "Your passwords do not match."),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      newRepeatedPassword: "",
    },
    validationSchema: ChangeSchema,
    validateOnChange: false, // this one
    onSubmit: async (data) => {
      enqueueSnackbar("Password successfully changed", { variant: "success" });
      props.onDone?.();
    },
  });

  const { handleSubmit, values, getFieldProps, touched, errors } = formik;

  return (
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
          type={showOldPassword ? "text" : "password"}
          label="Old password"
          {...getFieldProps("password")}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type={showNewPassword ? "text" : "password"}
          label="New password"
          {...getFieldProps("newPassword")}
          error={Boolean(touched.newPassword && errors.newPassword)}
          helperText={touched.newPassword && errors.newPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type={showRepeatedPassword ? "text" : "password"}
          label="Repeat new password"
          {...getFieldProps("newRepeatedPassword")}
          error={Boolean(
            touched.newRepeatedPassword && errors.newRepeatedPassword
          )}
          helperText={touched.newRepeatedPassword && errors.newRepeatedPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
                  edge="end"
                >
                  {showRepeatedPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button size="large" onClick={() => props.onDone?.()}>
            Cancel
          </Button>
          <Button type="submit" size="large">
            Change
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default ChangePassword;
