import "./app.css";
import { Button, IconButton, TextField } from "@mui/material";
import List from "./List";
import Card from "./Card";
import Model from "./Model";
import { useEffect, useState, useContext } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";

const chain = {
  name: "You seeing sample data, add your chain click below",
  duration: 0,
  weekTask: [
    {
      id: 0,
      task: "I'm week task",
      day: "week",
      status: "failed",
    },
    {
      id: 1,
      task: "I'm weekend gojsafkan task",
      day: "weekend",
      status: "success",
    },
    {
      id: 2,
      task: "I'm commmon task",
      day: "common",
      status: "pending",
    },
  ],
};

const taskL = JSON.parse(localStorage.getItem("chain")); // It recures reload everytime
const cardDate = JSON.stringify(localStorage.setItem("cardDate", []));
// const cardDate = [
// //   {
// //     id: null,
// //     stauts: "",
// //     notes: [],
// //   },
// // ];

function App() {
  // const task = JSON.parse(localStorage.getItem("chain")); when i retrive data from local
  //storange inside component in re-render infinit time, WHY ??
  const [task, setTask] = useState(chain);
  const [noTask, setNoOfTask] = useState(0);

  const [list, setList] = useState(chain.weekTask);
  const [noComplete, setNoCompleted] = useState(0);
  const [done, setDone] = useState(false);
  const [startDay, setStartDay] = useState(null);
  const [duration, setDuration] = useState(null);
  const [daysLeft, setDaysLeft] = useState(duration);
  const [currentDayInChain, setCurrentDayInChain] = useState(null);
  const date = new Date();
  const day = date.getDay() < 5 ? "week" : "weekend";
  const [note, setNote] = useState({});
  //find the current day as per userduration

  const timeLeft = () => {
    if (startDay && duration) {
      if (parseInt(startDay.slice(0, 2)) === date.getMonth() + 1) {
        //do something (90 - curent day - storedday)
        setDaysLeft(
          duration - (date.getDate() - parseInt(startDay.slice(3, 5)))
        );
      } else {
        ///find other logic to get no of remaining days
        // console.log(duration - )
        // new Date(2022, 12, 0).getDate() get the numnber of days
        // const year = parseInt(startDay.slice(-4));
        // const month = parseInt(startDay.slice(0, 2));
        // const daysInMonth = new Date(year, month).getDate();
        // const passedDays = daysInMonth - parseInt(startDay.slice(3, 5));
        /*
        noofDaysleft -  (31 - 12 ) - 1
        */
        setDaysLeft(daysLeft - 1);
      }
    } else {
      return;
    }
  };

  const renderCard = Array.from(Array(noTask)).map((_, i) => {
    console.log(done, "done");
    const active = {
      status: done ? "success" : "failed",
      current: currentDayInChain,
      note,
    };
    return (
      ///we have to send the current card number + success or failed status
      //we have to add one more obj in local storage to keep trak of chain

      <div key={i}>
        <Card ind={i + 1} activeCard={active} />
      </div>
    );
  });

  const renderSampleCard = () => {
    const active = {
      status: done ? "success" : "failed",
      current: currentDayInChain,
      note,
    };
    return (
      <>
        <Card ind="1" activeCard={active} />
        <Card ind="2" activeCard={active} />
        <Card ind="3" activeCard={active} />
      </>
    );
  };

  useEffect(() => {
    setTask(taskL);
    if (task) {
      setList(task.weekTask);
      console.log(task);

      setNoOfTask(parseInt(task.duration));
      const n = task.weekTask.filter((el) => {
        return el.day === day || el.day === "common";
      }).length;
      console.log(n);
      console.log(noComplete);
      noComplete === n ? setDone(true) : setDone(false);

      //filter out the day
      setStartDay(task.date);
      setDuration(task.duration);

      timeLeft();
      setCurrentDayInChain(duration - daysLeft + 1);
      console.log(note);
    }
  }, [task, taskL, noComplete, startDay, duration, currentDayInChain, note]);
  return (
    <div className="app">
      <a
        style={{ fontSize: "2rem" }}
        href="https://www.instagram.com/budhu_12/?next=%2F"
      >
        <InstagramIcon sx={{ fontSize: "5rem", margin: "1rem" }} />
        follow me
      </a>
      <div className="typo">
        <h1 className="heading">Don't break the chain</h1>
        <h2 className="goal">{task ? task.name : chain.name}</h2>
      </div>
      <div className="week-goal">
        <span className="week-goal-heading">Week task</span>
        <List
          setNote={setNote}
          setNoCompleted={setNoCompleted}
          task={list}
          day="weekend"
        />
      </div>
      <div className="go">
        <span className="go-text">Go</span>
        <span className="days"> {daysLeft} days left</span>
        <Model />
      </div>
      <div className="weekend-goal">
        <span className="weekend-goal-heading">Weekend task</span>
        <List
          setNote={setNote}
          setNoCompleted={setNoCompleted}
          task={list}
          day="week"
        />
      </div>
      <div className="grid">{task ? renderCard : renderSampleCard()}</div>
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
