import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Button, TextField } from "@mui/material";

export default function CheckboxList({ day, task }) {
  const [checked, setChecked] = React.useState([0]);
  const [shownote, setShownote] = React.useState(false);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleAddNote = () => {
    setShownote(false);
  };
  const bg = (el) => {
    if (el === "week") {
      return "#d03b3b";
    } else if (el == "common") {
      return "black";
    } else {
      return "purple";
    }
  };
  //   const renderTask = () => {
  //     if (task === null) {
  //       return <div>add fist...</div>;
  //     } else {
  //       const weeks = task.filter((el) => {
  //         return el.day != day;
  //       });
  //       return weeks.map((el) => {
  //         return (
  //           <li id={el.id} style={{ color: `${bg(el)}` }} className="list">
  //             {el.task}
  //           </li>
  //         );
  //       });
  //     }
  //   };

  const renderNoteInput = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          InputLabelProps={{ style: { fontSize: "2rem" } }}
          inputProps={{ style: { fontSize: "2rem" } }}
          multiline
          maxRows={4}
          variant="filled"
          label="keep a note"
        />
        <Button
          onClick={handleAddNote}
          sx={{ marginLeft: "1rem" }}
          variant="contained"
        >
          Add
        </Button>
      </div>
    );
  };
  return (
    <List sx={{ width: "80%", color: "#ffff" }}>
      {shownote && renderNoteInput()}
      {task
        .filter((el) => el.day != day)
        .map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;
          console.log(value.task);
          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <IconButton
                  onClick={() => setShownote(!shownote)}
                  edge="end"
                  aria-label="comments"
                >
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="end"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                    style={{
                      transform: "scale(2)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "2rem",
                    letterSpacing: "2px",
                  }}
                  id={labelId}
                  // primary={`Line item ${value + 1}`}
                >
                  <span style={{ color: `${bg(value.day)}` }}>
                    {value.task}
                  </span>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
}
