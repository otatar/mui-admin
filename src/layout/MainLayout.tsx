import * as React from "react";

import useAuth from "../contexts/AuthContext";

import {
  Outlet,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation,
} from "react-router-dom";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import MuiLogo from "./MuiLogo";
import UserMenu from "./UserMenu";
import ChangePassword from "./ChangePassword";
import UserProfile from "./UserProfile";
import { useColorMode } from "../App";
import { useMuiDialog } from "../contexts/MuiDialogContext";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-center",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  mobile?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => !["open", "mobile"].includes(prop.toString()),
})<AppBarProps>(({ theme, open, mobile }) => ({
  //zIndex: theme.zIndex.drawer + 1,
  ...(!mobile && {
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - ${theme.spacing(7)} + 1px)`,
  }),
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !mobile && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  ".MuiDrawer-paper": {
    boxShadow: theme.shadows[3],
    zIndex: theme.zIndex.drawer,
  },
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    width: 4,
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  width: 220,
}));

interface DrawerListItemProps {
  label: string;
  icon?: React.ReactElement;
  to: string;
  children?: DrawerListItemProps[];
  level?: number;
  onitemClicked?: () => void;
}

const drawerItems = [
  {
    label: "Home",
    to: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Documents",
    to: "/docs",
    icon: <FolderIcon />,
    children: [
      {
        label: "Invoices",
        to: "/invoices",
        icon: <ReceiptIcon />,
      },
    ],
  },
  {
    label: "Form",
    to: "/form",
    icon: <DescriptionIcon />,
  },
  {
    label: "Users",
    to: "/users",
    icon: <GroupIcon />,
  },
  {
    label: "About",
    to: "/about",
    icon: <InfoIcon />,
  },
];

function ListItemLink(props: DrawerListItemProps) {
  const { icon, label, to, children, level = 1, onitemClicked } = props;
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        }
      ),
    [to]
  );

  return (
    <>
      {children ? (
        <li>
          <ListItem
            button
            selected={location.pathname === to}
            onClick={() => setOpen(!open)}
            sx={{ pl: level * 2 }}
          >
            {icon ? (
              <ListItemIcon sx={{ color: "primary.main" }}>{icon}</ListItemIcon>
            ) : null}
            <ListItemText
              primary={label.toUpperCase()}
              primaryTypographyProps={{
                fontSize: "14px",
                //fontWeight: 410,
                //color: "secondary.main",
              }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div">
              {children.map((el: any) => (
                <ListItemLink
                  level={level + 1}
                  label={el.label}
                  to={el.to}
                  icon={el.icon}
                  children={el.children}
                  key={el.label}
                />
              ))}
            </List>
          </Collapse>
        </li>
      ) : (
        <ListItem
          button
          component={renderLink}
          selected={location.pathname === to}
          sx={{ pl: level * 2 }}
          onClick={onitemClicked}
        >
          {icon ? (
            <ListItemIcon sx={{ color: "primary.main" }}>{icon}</ListItemIcon>
          ) : null}
          <ListItemText
            primary={level === 1 ? label.toUpperCase() : label}
            primaryTypographyProps={{
              fontSize: "14px",
              //fontWeight: 410,
              //color: "#1976d2",
            }}
          />
        </ListItem>
      )}
    </>
  );
}

const MainLayout = () => {
  const theme = useTheme();
  const colorMode = useColorMode();
  const { showConfirmationDialog, showComponentDialog, closeDialog } =
    useMuiDialog();

  const mobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });

  const [open, setOpen] = React.useState(true);
  const [openMobile, setOpenMobile] = React.useState(false);
  const { user, logout } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggleMobile = () => {
    setOpenMobile(!openMobile);
  };

  const handleLogout = async () => {
    const confirmation = await showConfirmationDialog(
      "Logout?",
      "Are you sure you want to log out? All unsaved work will be lost..."
    );
    confirmation && logout();
  };

  const handleDialogDone = () => {
    closeDialog();
  };

  const handlePasswordChange = async () => {
    showComponentDialog(
      "Change Password",
      <ChangePassword onDone={handleDialogDone} />
    );
  };

  const handleUserProfile = async () => {
    showComponentDialog(
      "User Profile",
      <UserProfile id={1} onDone={handleDialogDone} />
    );
  };

  const drawerList = (
    <List
      component="nav"
      sx={{
        mt: 4,
      }}
    >
      {drawerItems.map((el: any) => (
        <ListItemLink
          label={el.label}
          to={el.to}
          icon={el.icon}
          children={el.children}
          key={el.label}
          onitemClicked={handleDrawerToggleMobile}
        />
      ))}
    </List>
  );

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} mobile={mobile}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...((mobile || open) && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{
              marginRight: 5,
              ...((mobile || !open) && { display: "none" }),
            }}
          >
            <MenuOpenIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggleMobile}
            edge="start"
            sx={{
              marginRight: 5,
              display: { sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <IconButton
            sx={{ mr: 2 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          <UserMenu
            username={user.username}
            firstName={user.firstName}
            lastName={user.lastName}
            onLogout={handleLogout}
            onPasswordChange={handlePasswordChange}
            onUserProfile={handleUserProfile}
          />
        </Toolbar>
      </AppBar>
      <MuiDrawer //Drawer for mobile
        variant="temporary"
        open={openMobile}
        onClose={handleDrawerToggleMobile}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <RouterLink to={"/"} style={{ textDecoration: "none" }}>
          <DrawerHeader>
            <MuiLogo width={32} height={30} />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ ml: 2, color: "primary.main", fontWeight: "bold" }}
            >
              MUI Admin
            </Typography>
          </DrawerHeader>
        </RouterLink>
        <Divider variant="middle" />
        {drawerList}
      </MuiDrawer>
      <Drawer //Drawer for desktop
        variant="permanent"
        open={open}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <RouterLink to={"/"} style={{ textDecoration: "none" }}>
          <DrawerHeader>
            <MuiLogo width={32} height={30} />
            {open && (
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ ml: 2, color: "primary.main", fontWeight: "bold" }}
              >
                MUI Admin
              </Typography>
            )}
          </DrawerHeader>
        </RouterLink>
        <Divider variant="middle" />
        {drawerList}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100%", width: "100%", p: 1, mt: 6 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
