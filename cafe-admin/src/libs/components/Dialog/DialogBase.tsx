"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";

type PropType = DialogProps & {
  title?: string;
  contentSx?: SxProps;
  handleAccept?: () => void;
  defaultAction?: boolean;
};

const DialogBase: React.VFC<PropType> = ({
  open,
  title,
  onClose,
  children,
  contentSx,
  maxWidth,
  ...props
}) => {
  return (
    <Dialog
      PaperProps={{ elevation: 2 }}
      open={open}
      maxWidth={maxWidth}
      fullWidth
      keepMounted
      {...props}
    >
      <AppBar sx={{ ...styleAppBar }}>
        <Toolbar>
          <Typography sx={{ ...styleTitle }} variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            sx={{ mr: 0, padding: 1 }}
            edge="start"
            color="inherit"
            onClick={onClose as () => void}
            aria-label="close"
          >
            <CloseIcon sx={{ color: "#FFF" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent
        sx={{
          pb: 0,
          ...contentSx,
          ...styleDialogContent,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

const styleAppBar = {
  position: "relative",
  "&.MuiAppBar-root": {
    padding: "0 !important",
    backgroundColor: "#D17842",
  },
};
const styleTitle = {
  flex: 1,
  fontSize: "14px",
  color: "#FFF",
};

const styleDialogContent = {
  padding: "24px",
  "::-webkit-scrollbar": { width: 8, height: 8 },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#ccc",
    borderRadius: "6px",
  },
};

export { DialogBase };
