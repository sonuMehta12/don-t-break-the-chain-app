import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { duration, TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Dialog from "./Dialog";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
let i = 0;

const chain = {
  name: "",
  duration: 0,
  date: new Date().toLocaleDateString(),
  weekTask: [],
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState("");
  const [alignment, setAlignment] = React.useState("week");
  const [task, setTask] = React.useState(chain.weekTask);
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [agree, setAgree] = useState(false);

  chain.name = goal;
  chain.duration = parseInt(duration);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleDelete = (el) => {
    const tk = task.filter((e) => {
      return el.task != e.task;
    });
    return setTask(tk);
  };

  const addTask = (val) => {
    if (val === "") return;
    task.push({
      id: i++,
      task: val,
      day: alignment,
      done: false,
    });
    setVal("");
  };

  const addChain = (agree) => {
    console.log(agree);
    if (task && duration && goal) {
      localStorage.setItem("chain", JSON.stringify(chain));
      localStorage.setItem("data", JSON.stringify([]));
      localStorage.setItem("note", JSON.stringify([]));
    }
    handleClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const bg = (el) => {
    if (el.day === "week") {
      return "blue";
    } else if (el.day === "common") {
      return "purple";
    } else {
      return "green";
    }
  };
  const renderTask = task.map((el) => {
    return (
      <div style={{ margin: "1rem" }} id={el.id}>
        <Typography
          sx={{
            backgroundColor: `${bg(el)}`,
            borderRadius: "5px",
            padding: "1rem 2rem",
            display: "inline-block",
            fontSize: "1.6rem",
          }}
          variant="h5"
        >
          {el.task}
        </Typography>
        <Button
          sx={{ fontSize: "1.6rem" }}
          onClick={() => handleDelete(el)}
          color="error"
        >
          Delete
        </Button>
      </div>
    );
  });
  return (
    <div style={{ height: "90%" }}>
      <Button
        sx={{ padding: "1rem 4rem", marginTop: "1rem", fontSize: "large" }}
        variant="contained"
        onClick={handleOpen}
      >
        Start New Chain
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            color="primary"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Don't break the chain
          </Typography>
          <Typography
            color="error"
            variant="h4"
            id="modal-modal-description"
            sx={{
              mt: 2,
              backgroundColor: "pink",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <WarningAmberIcon fontSize="large" color="error" />
            Warning ! You will lose your current chain when you add new !{" "}
            <span style={{ color: "#ffff" }}>
              Do a full reload to see updated data
            </span>
          </Typography>
          <div>
            <Typography
              sx={{ textTransform: "uppercase" }}
              color="primary"
              variant="h4"
            >
              {goal}
            </Typography>
            <Typography
              sx={{
                backgroundColor: "dodgerblue",
                padding: "1rem",
                display: "inline-block",
                borderRadius: "5px",
              }}
              variant="h3"
            >
              {duration}
            </Typography>
          </div>
          <div style={{ margin: "1rem" }}>
            <TextField
              type="text"
              onChange={(e) => setGoal(e.target.value)}
              value={goal}
              label="What's your goal name"
              sx={{ width: "80%" }}
              InputLabelProps={{ style: { fontSize: "2rem" } }}
              inputProps={{ style: { fontSize: "2rem" } }} // font size of input text
            />
          </div>
          <div style={{ margin: "1rem" }}>
            <TextField
              type="number"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              label="Duration"
              InputLabelProps={{ style: { fontSize: "2rem" } }}
              inputProps={{ style: { fontSize: "2rem" } }} // font size of input text
              sx={{ width: "30%" }}
            />
          </div>
          <div
            style={{
              width: "80%",
              overflow: "auto",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {renderTask}
          </div>
          <div>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="week">Weekend</ToggleButton>
              <ToggleButton value="weekend">Week day</ToggleButton>
              <ToggleButton value="common">Every day</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div style={{ marginTop: "1rem", display: "flex" }}>
            <TextField
              type="text"
              onChange={(e) => setVal(e.target.value)}
              value={val}
              label="Add a task"
              sx={{ width: "80%" }}
              InputLabelProps={{ style: { fontSize: "2rem" } }}
              inputProps={{ style: { fontSize: "2rem" } }} // font size of input text
            />
            <Button
              sx={{ marginLeft: "1rem" }}
              variant="contained"
              onClick={() => addTask(val)}
            >
              Add
            </Button>
          </div>
          {agree ? (
            <Button
              color="success"
              sx={{ margin: "1rem auto", width: "50%" }}
              variant="contained"
              onClick={addChain}
            >
              All Done
            </Button>
          ) : (
            <Dialog setAgree={setAgree} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
