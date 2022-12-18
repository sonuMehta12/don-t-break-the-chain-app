import "./app.css";
import { Button, TextField } from "@mui/material";
import List from "./List";
import Card from "./Card";
import Model from "./Model";
import { useEffect, useState } from "react";

const task = JSON.parse(localStorage.getItem("chain")); // It recures reload everytime
function App() {
  // const task = JSON.parse(localStorage.getItem("chain")); when i retrive data from local
  //storange inside component in re-render infinit time, WHY ??

  const [list, setList] = useState([]);
  const renderCard = Array.from(Array(100)).map((_, i) => {
    return (
      <div key={i}>
        <Card />
      </div>
    );
  });

  useEffect(() => {
    setList(task.weekTask);
    console.log(task);
  }, [task]);
  return (
    <div className="app">
      <div className="typo">
        <h1 className="heading">Don't break the chain</h1>
        <h2 className="goal">{task.name}</h2>
      </div>
      <div className="week-goal">
        <span className="week-goal-heading">Week task</span>
        <List task={list} day="week" />
      </div>
      <div className="go">
        <span className="go-text">Go</span>
        <span className="days"> 90 days left</span>
        <Model />
      </div>
      <div className="weekend-goal">
        <span className="weekend-goal-heading">Weekend task</span>
        <List task={list} day="weekend" />
      </div>
      <div className="grid">{renderCard}</div>
      <div className="add-new">
        <TextField
          sx={{ width: "80%", margin: "1rem 1rem 1rem 5%", fontSize: "2rem" }}
          id="outlined-basic"
          label="Add new task"
          color="primary"
          variant="outlined"
          InputLabelProps={{ style: { fontSize: "2rem" } }}
          inputProps={{ style: { fontSize: "2rem" } }} // font size of input text
        />

        <Button
          sx={{ fontSize: "2rem", padding: "2rem 3rem", marginTop: ".7rem" }}
          variant="contained"
        >
          Add new
        </Button>
      </div>
    </div>
  );
}

export default App;
