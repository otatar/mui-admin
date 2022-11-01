import { useEffect, useState, useCallback } from "react";
import { object, string as YupString, boolean } from "yup";
import { useFormik } from "formik";

import {
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  addUser,
  genereateUserId,
} from "../data/User/services";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { User } from "../data/User/users";
import DataTable, { DataTableProps } from "../components/DataTable";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useSnackbar } from "notistack";
import { useMuiDialog } from "../contexts/MuiDialogContext";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  useDocumentTitle("Users");
  const { showConfirmationDialog, showComponentDialog, closeDialog } =
    useMuiDialog();

  const loadData = useCallback(async () => setUsers(await getUsers()), []);

  useEffect(() => {
    loadData();
  }, []);

  const handleAddUser = () => {
    showComponentDialog(
      "Add User",
      <UserForm
        mode="new"
        onDone={() => {
          closeDialog();
          loadData();
        }}
      />
    );
  };

  const handleDelete = async (data: any) => {
    const confirmation = await showConfirmationDialog(
      "Delete user",
      `Are you sure you want to delete user with id: ${data.id}?`
    );
    confirmation && deleteUser(data.id);
    confirmation &&
      enqueueSnackbar("User successfully deleted", { variant: "success" });
    loadData();
  };

  const handleDetails = (data: any) => {
    showComponentDialog(
      "User Details",
      <UserForm id={data.id} mode="show" onDone={closeDialog} />
    );
  };

  const handleEdit = (data: any) => {
    showComponentDialog(
      "User Edit",
      <UserForm
        id={data.id}
        mode="edit"
        onDone={() => {
          closeDialog();
          loadData();
        }}
      />
    );
  };

  const dataTableProps: DataTableProps<User> = {
    items: [
      { field: "id", label: "ID", width: 50 },
      { field: "username", label: "Username" },
      { field: "firstName", label: "First Name" },
      { field: "lastName", label: "Last Name" },
      { field: "email", label: "Email" },
      { field: "authorizationLevel", label: "Authorization" },
    ],
    rows: users,
    onDelete: handleDelete,
    onDetails: handleDetails,
    onEdit: handleEdit,
  };

  return (
    <Card>
      <CardHeader
        title="Users Table"
        action={
          <Button sx={{ mr: 2 }} variant="contained" onClick={handleAddUser}>
            Add User
          </Button>
        }
      />
      <CardContent>
        <DataTable {...dataTableProps} />
      </CardContent>
    </Card>
  );
};

export default Users;

interface UserFormProps {
  id?: number;
  mode: "show" | "edit" | "new";
  onDone?: () => void;
}
const UserForm = (props: UserFormProps) => {
  const [mode, setMode] = useState<"show" | "edit" | "new">(props.mode);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByID(props.id!);
      formik.setValues({ ...user }, false);
    };
    props.id && getUser();
  }, []);

  const authorizationLevel = [
    { value: "admin", label: "Administrator" },
    { value: "user", label: "User" },
  ];

  const UserFormSchema = object().shape({
    username: YupString().required("This field is required"),
    firstName: YupString()
      .required("This field is required")
      .min(3, "This field must contain at least 3 characters"),
    lastName: YupString()
      .required("This field is required")
      .min(3, "This field must contain at least 3 characters"),
    email: YupString()
      .required("This field is required")
      .email("Please input a valid email address"),
    authorizationLevel: YupString().required("This field is required"),
    activated: boolean().required("This field is required"),
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
    validationSchema: UserFormSchema,
    validateOnChange: false, // this one
    onSubmit: async (data) => {
      if (mode === "edit") {
        updateUser(data);
        enqueueSnackbar("User updated", { variant: "success" });
      } else {
        data.id = genereateUserId();
        addUser(data);
        enqueueSnackbar("User inserted", { variant: "success" });
      }
      props.onDone?.();
    },
  });

  const { handleSubmit, getFieldProps, touched, errors, values } = formik;

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
          disabled={mode === "edit" || mode === "show"}
          error={Boolean(touched.username && errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
          fullWidth
          type={"text"}
          label="First Name"
          {...getFieldProps("firstName")}
          disabled={mode === "show"}
          error={Boolean(touched.firstName && errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          fullWidth
          type={"text"}
          label="Last Name"
          {...getFieldProps("lastName")}
          disabled={mode === "show"}
          error={Boolean(touched.lastName && errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          fullWidth
          type={"text"}
          label="Email"
          {...getFieldProps("email")}
          disabled={mode === "show"}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          select
          label="Autorization"
          {...getFieldProps("authorizationLevel")}
          disabled={mode === "show"}
          error={Boolean(
            touched.authorizationLevel && errors.authorizationLevel
          )}
          helperText={touched.authorizationLevel && errors.authorizationLevel}
        >
          {authorizationLevel.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              {...getFieldProps("activated")}
              disabled={mode === "show"}
              checked={values.activated}
            />
          }
          label="Active"
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button size="large" onClick={() => props.onDone?.()}>
            Cancel
          </Button>
          {mode === "show" && (
            <Button size="large" onClick={() => setMode("edit")}>
              Edit
            </Button>
          )}
          {(mode === "edit" || mode === "new") && (
            <Button type="submit" size="large">
              Submit
            </Button>
          )}
        </Stack>
      </Box>
    </form>
  );
};
