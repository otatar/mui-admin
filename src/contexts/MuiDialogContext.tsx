import {
  createContext,
  useContext,
  useState,
  ReactElement,
  Component,
} from "react";
import { flushSync } from "react-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface DialogContextType {
  closeDialog: () => void;
  showConfirmationDialog: (title: string, text?: string) => Promise<boolean>;
  showComponentDialog: (title: string, component: ReactElement) => void;
}

const DialogContext = createContext<DialogContextType>({} as DialogContextType);

interface DialogContainerProps {
  open: boolean;
  title?: string;
  text?: string;
  component?: ReactElement;
  onOK?: () => void;
  onCancel?: () => void;
}

export class DialogContainer extends Component<DialogContainerProps> {
  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent
          sx={{
            width: { xs: "300px", sm: "600px" },
          }}
        >
          {!this.props.component && (
            <DialogContentText>{this.props.text}</DialogContentText>
          )}
          {this.props.component && (
            <Box sx={{ pt: 2 }}>{this.props.component}</Box>
          )}
        </DialogContent>
        {!this.props.component && (
          <DialogActions>
            <Button onClick={this.props.onCancel}>Cancel</Button>
            <Button autoFocus onClick={this.props.onOK}>
              OK
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

export default function DialogProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [component, setComponent] = useState<ReactElement>();
  const [actionCallback, setActionCallback] =
    useState<(value: boolean) => void>();

  const showConfirmationDialog = (
    title: string,
    text?: string
  ): Promise<boolean> => {
    setOpen(true);
    setTitle(title);
    setText(text);
    return new Promise<boolean>((resolve: (value: boolean) => void) => {
      setActionCallback(() => resolve);
    });
  };

  const closeDialog = () => {
    flushSync(() => setOpen(false));
    setComponent(undefined);
    setText("");
    setTitle("");
  };

  const handleOKClick = () => {
    closeDialog();
    actionCallback?.(true);
  };

  const handleCancelClick = () => {
    closeDialog();
    actionCallback?.(false);
  };

  const showComponentDialog = (title: string, component: ReactElement) => {
    setOpen(true);
    setTitle(title);
    setComponent(component);
  };

  return (
    <DialogContext.Provider
      value={{ closeDialog, showConfirmationDialog, showComponentDialog }}
    >
      {children}
      <DialogContainer
        title={title}
        open={open}
        text={text}
        component={component}
        onOK={handleOKClick}
        onCancel={handleCancelClick}
      ></DialogContainer>
    </DialogContext.Provider>
  );
}

export const useMuiDialog = () => {
  return useContext(DialogContext);
};
