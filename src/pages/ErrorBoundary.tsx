import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiLogo from "../layout/MuiLogo";

const ErrorBoundary = () => {
  const error = useRouteError();
  let errorTitle = "";
  let errorMessage = "";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorTitle = "404: The resource/page that you are looking for isn't here";
      errorMessage =
        "You either tried some shady route or you came here by mistake, or the requsted resource doesn't exist. Whichever it is, try using the navigation";
    } else if (error.status === 401) {
      errorTitle = "401: You aren't authorized to see requested resource";
      errorMessage =
        "Your authorization level doesn't permit to see requsted resource. Please contact admnistrators.";
    } else if (error.status === 503) {
      errorTitle = "503: Looks like our API is down";
      errorMessage = "Problem with backend API!. Please contact admnistrators.";
    } else {
      errorTitle = "503: Unknown backed API error";
      errorMessage = "Problem with backend API!. Please contact admnistrators.";
    }
  } else {
    errorTitle = "Unknown error";
    errorMessage =
      "Unknown error, this is an indicator of potential bug or error in code ";
    console.log(error);
  }

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
      <Typography align="center" color="textPrimary" variant="h3">
        {errorTitle}
      </Typography>
      <Typography align="center" color="textPrimary" variant="subtitle2">
        {errorMessage}
      </Typography>
      <Link to="/">
        <Button
          component="a"
          startIcon={<ArrowBackIcon fontSize="small" />}
          sx={{ mt: 3 }}
          variant="contained"
        >
          Go back to dashboard
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorBoundary;
