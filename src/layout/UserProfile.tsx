import { useEffect } from "react";
import { useFormik } from "formik";
import { object, string as YupString } from "yup";
import { useSnackbar } from "notistack";
import { getUserByID, updateUser } from "../data/User/services";
import useAuth from "../contexts/AuthContext";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface UserProfileProps {
  id: number;
  onDone?: () => void;
}

const UserProfile = (props: UserProfileProps) => {
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByID(props.id);
      formik.setValues({ ...user }, false);
    };
    getUser();
  }, []);

  const { updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const UserProfileSchema = object().shape({
    username: YupString().required(),
    firstName: YupString()
      .required("This field is required")
      .min(3, "This field must contain at least 3 characters"),
    lastName: YupString()
      .required("This field is required")
      .min(3, "This field must contain at least 3 characters"),
    email: YupString()
      .required("This field is required")
      .email("Please input a valid email address"),
    authorizationLevel: YupString().required(),
  });

  const formik = useFormik({
    initialValues: {
      id: 0,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      authorizationLevel: "",
      activated: true,
    },
    validationSchema: UserProfileSchema,
    validateOnChange: false, // this one
    onSubmit: async (data) => {
      updateUser(data);
      updateProfile(data);
      enqueueSnackbar("User profile updated", { variant: "success" });
      props.onDone?.();
    },
  });

  const { handleSubmit, getFieldProps, touched, errors } = formik;
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
          type={"text"}
          label="Username"
          {...getFieldProps("username")}
          disabled
        />
        <TextField
          fullWidth
          type={"text"}
          label="First Name"
          {...getFieldProps("firstName")}
          error={Boolean(touched.firstName && errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          fullWidth
          type={"text"}
          label="Last Name"
          {...getFieldProps("lastName")}
          error={Boolean(touched.lastName && errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          fullWidth
          type={"text"}
          label="Email"
          {...getFieldProps("email")}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          type={"text"}
          label="Authorization"
          {...getFieldProps("authorizationLevel")}
          disabled
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button size="large" onClick={() => props.onDone?.()}>
            Cancel
          </Button>
          <Button type="submit" size="large">
            Update
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default UserProfile;
