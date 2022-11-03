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
import Switch, { SwitchProps } from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
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

const ThemeSwitch = styled((props: SwitchProps) => (
  <Switch disableRipple {...props} />
))(({ theme }) => ({
  width: 46,
  height: 32,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#ffff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.grey[800],
      },
      "& .MuiSwitch-thumb": {
        width: 24,
        height: 24,
        backgroundColor: theme.palette.grey[800],
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="21" width="21" viewBox="0 0 22 22"><path fill="${encodeURIComponent(
          "#ffffff"
        )}" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path></svg>')`,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 24,
    height: 24,
    backgroundRepeat: "no-repeat",
    margin: 2,
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="21" width="21" viewBox="0 0 23 23"><path fill="${encodeURIComponent(
      theme.palette.background.default
    )}" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path></svg>')`,
  },
  "& .MuiSwitch-track": {
    borderRadius: 46 / 2,
    backgroundColor: theme.palette.primary.main,
    border: "2px solid white",
    opacity: 1,
    height: 31,
  },
}));

interface DrawerListItemProps {
  drawerOpen: boolean;
  label: string;
  icon?: React.ReactElement;
  to: string;
  children?: DrawerListItemProps[];
  level?: number;
  onItemClicked?: (parent: boolean) => void;
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
  const {
    icon,
    label,
    to,
    children,
    level = 1,
    onItemClicked,
    drawerOpen,
  } = props;
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

  const activeChildren = () => {
    const childrenActive = children?.reduce((acc, child) => {
      return acc || child.to === location.pathname;
    }, false);
    return !drawerOpen && childrenActive;
  };

  return (
    <>
      {children ? (
        <li>
          <ListItem
            button
            selected={activeChildren()}
            onClick={() => {
              setOpen(!open);
              onItemClicked?.(true);
            }}
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
          <Collapse in={open && drawerOpen} timeout="auto" unmountOnExit>
            <List component="div">
              {children.map((el: any) => (
                <ListItemLink
                  drawerOpen={open}
                  level={level + 1}
                  label={el.label}
                  to={el.to}
                  icon={el.icon}
                  children={el.children}
                  key={el.label}
                  onItemClicked={onItemClicked}
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
          onClick={() => onItemClicked?.(false)}
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

  const handleOnDrawerItemClicked = (parent: boolean) => {
    if (!parent) setOpenMobile(false);
    if (!open) setOpen(true);
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
          drawerOpen={open}
          label={el.label}
          to={el.to}
          icon={el.icon}
          children={el.children}
          key={el.label}
          onItemClicked={handleOnDrawerItemClicked}
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
            {" "}
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
            onClick={() => setOpenMobile(true)}
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
          <Tooltip title="Switch theme">
            <ThemeSwitch sx={{ mr: 2 }} onChange={colorMode.toggleColorMode} />
          </Tooltip>
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
        onClose={() => setOpenMobile(false)}
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
