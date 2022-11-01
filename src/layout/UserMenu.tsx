import { useState } from "react";

import Chip from "@mui/material/Chip";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";

interface UserMenuProps {
  username: string;
  firstName: string;
  lastName: string;
  onLogout?: () => void;
  onPasswordChange?: () => void;
  onUserProfile?: () => void;
}

const UserMenu = (props: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    props.onLogout?.();
  };

  const handlePasswordChange = () => {
    setAnchorEl(null);
    props.onPasswordChange?.();
  };

  const handleUserProfile = () => {
    setAnchorEl(null);
    props.onUserProfile?.();
  };

  return (
    <>
      <Chip
        label={`${props.firstName} ${props.lastName}`}
        variant="outlined"
        deleteIcon={<KeyboardArrowDownIcon sx={{ fill: "white" }} />}
        onDelete={handleClick}
        icon={<AccountCircleIcon sx={{ fill: "white" }} />}
        clickable
        onClick={handleClick}
        sx={{ color: "white", fontWeight: "bold", border: "2px solid" }}
      />
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <MenuItem onClick={handleUserProfile}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: 15 }}>
              Profile Settings
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handlePasswordChange}>
            <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: 15 }}>
              Change Password
            </ListItemText>
          </MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: 15 }}>
              Log Out
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
