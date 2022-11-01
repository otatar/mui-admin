import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState, useMemo } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ActionColumnProps {
  data: any;
  onEdit?: (data: any) => void;
  onDetails?: (data: any) => void;
  onDelete?: (data: any) => void;
}

const ActionColumn = (props: ActionColumnProps) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!mobile && (
        <Stack direction="row" spacing={2}>
          <Tooltip title="Details">
            <IconButton
              aria-label="details"
              color="primary"
              onClick={() => props.onDetails?.(props.data)}
            >
              <ArticleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              color="secondary"
              onClick={() => props.onEdit?.(props.data)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              color="warning"
              onClick={() => props.onDelete?.(props.data)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
      {mobile && (
        <Box>
          <IconButton aria-label="more" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => props.onDetails?.(props.data)}>
              <ListItemIcon>
                <ArticleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 15 }}>
                Details
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={() => props.onEdit?.(props.data)}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 15 }}>
                Edit
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={() => props.onDelete?.(props.data)}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 15 }}>
                Delete
              </ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
};

interface ColumnProp {
  field: string;
  label: string;
  width?: number;
}

type Row = Record<string, number | string | boolean>;

export interface DataTableProps<T> {
  items: ColumnProp[];
  rows: T[];
  onEdit?: (data: T) => void;
  onDetails?: (data: T) => void;
  onDelete?: (data: T) => void;
}

const DataTable = <T extends unknown>(props: DataTableProps<T>) => {
  const [pageSize, setPageSize] = useState<number>(10);

  const columns: GridColDef[] = props.items.map((item: ColumnProp) => {
    return {
      field: item.field,
      headerName: item.label,
      align: "center",
      headerAlign: "center",
      width: item.width || 200,
      flex: 1,
    };
  });

  useMemo(() => {
    columns.push({
      headerName: "Actions",
      field: "action",
      align: "center",
      sortable: false,
      filterable: false,
      headerAlign: "center",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => (
        <ActionColumn
          data={params.row}
          onDetails={props.onDetails}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ),
    });
  }, [props]);

  return (
    <DataGrid
      autoHeight
      hideFooterSelectedRowCount
      rows={props.rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 25, 50]}
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
          outline: "none",
        },
      }}
    />
  );
};

export default DataTable;
