import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ setAgree }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setAgree(true);
    handleClose();
  };

  return (
    <div>
      <Button
        color="success"
        sx={{ margin: "1rem auto", width: "50%" }}
        variant="contained"
        // onClick={addChain}
        onClick={handleClickOpen}
      >
        Click to start chain
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText fontSize="2rem" id="alert-dialog-description">
            Once your agree you will lose your old{" "}
            {<span style={{ fontWeight: "bold" }}>chian</span>} {<br />} want to
            start new chain?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: "2rem" }} color="error" onClick={handleClose}>
            Disagree
          </Button>
          <Button
            sx={{ fontSize: "2rem" }}
            color="primary"
            onClick={handleAgree}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
