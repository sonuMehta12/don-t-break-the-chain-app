import "./app.css";
import { Button, IconButton, TextField } from "@mui/material";
import List from "./List";
import Card from "./Card";
import Model from "./Model";
import { useEffect, useState, useContext } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
// import { cardData, noteData } from "./data";

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
      task: "I'm weekend  task",
      day: "weekend",
      status: "success",
    },
    {
      id: 2,
      task: "I'm everyday task",
      day: "common",
      status: "pending",
    },
  ],
};

const taskL = JSON.parse(localStorage.getItem("chain")); // It recures reload everytime
// const a = JSON.parse(localStorage.getItem("data"));
// const b = JSON.parse(localStorage.getItem("note"));

// console.log(b);

function App() {
  const [task, setTask] = useState(chain);
  const [noTask, setNoOfTask] = useState(0);

  const [list, setList] = useState(chain.weekTask);
  const [noComplete, setNoCompleted] = useState(0);
  const [done, setDone] = useState(false);
  const [startDay, setStartDay] = useState(null);
  const [duration, setDuration] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);
  const [currentDayInChain, setCurrentDayInChain] = useState(null);
  const [addExtraTask, setAddExtraTask] = useState("");
  // const [updatedCardData, setUpdatedCardData] = useState(fetchCardData);
  const date = new Date();
  const day = date.getDay() < 5 ? "week" : "weekend";
  const [note, setNote] = useState({});
  const [notelist, setNoteList] = useState([]);

  //find the current day as per userduration
  const b = JSON.parse(localStorage.getItem("note"));
  const a = JSON.parse(localStorage.getItem("data"));

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

  useEffect(() => {
    // console.log(currentDayInChain, "null");

    // localStorage.getItem("");
    // const b = JSON.parse(localStorage.getItem("data"));
    // const setItem = b ? b : ["hello"];
    // const a = localStorage.setItem("data", JSON.stringify(setItem));
    // console.log(a);
    if (a && b) {
      console.log(a, b);
      const d = a.slice();
      const x = b.slice();
      console.log(note);

      // console.log(Object.keys(note).length > 0 && Object.keys(note.note).length);

      if (Object.keys(note).length > 0 && Object.keys(note.note).length) {
        const mergesNote = x.concat(note);
        localStorage.setItem("note", JSON.stringify(mergesNote));
      }
      //add card data
      const g = JSON.parse(localStorage.getItem("note"));
      // console.log(g, "note");
      console.log(done, "done");
      const cardData = {
        id: currentDayInChain,
        status: done,
        notes: g,
      };

      const mergesData = d.concat(cardData);
      localStorage.setItem("card", JSON.stringify(mergesData));

      const f = JSON.parse(localStorage.getItem("card"));
      console.log(f, "data");

      setNoteList(f);
    }
  }, [currentDayInChain, done, note, localStorage]);

  useEffect(() => {
    setTask(taskL);
    if (task) {
      setList(task.weekTask);

      setNoOfTask(parseInt(task.duration));
      ///logic for don or undone
      const n = task.weekTask.filter((el) => {
        return el.day != day || el.day === "common";
      }).length;
      console.log(n);
      // console.log(noComplete);
      noComplete === n ? setDone(true) : setDone(false);
      timeLeft();
      //filter out the day
      setStartDay(task.date);
      setDuration(parseInt(task.duration));

      // console.log(duration);
      // console.log(daysLeft);
      daysLeft && setCurrentDayInChain(duration - daysLeft + 1);
      // console.log(currentDayInChain);

      // console.log(note, "note");
    }
  }, [
    task,
    taskL,
    noComplete,
    startDay,
    duration,
    currentDayInChain,
    note,
    daysLeft,
  ]);

  const addExtraTaskForDay = () => {
    if (!addExtraTask) return;
    // if (task) {
    //   const copyTask = Object.entries(task)[3];
    //   const taskToBeAdded = {
    //     id: copyTask.length,
    //     day: day,
    //     task: addExtraTask,
    //   };
    //   copyTask.push(taskToBeAdded);
    //   console.log(copyTask, "cosole.log");
    // }
  };

  const renderCard = Array.from(Array(noTask)).map((_, i) => {
    // console.log(done, "done");
    const active = {
      status: done ? "success" : "failed",
      current: currentDayInChain,
      note,
    };
    const toPassList = i < currentDayInChain ? notelist[i] : null;
    // console.log(toPassList, "list");
    return (
      ///we have to send the current card number + success or failed status
      //we have to add one more obj in local storage to keep trak of chain

      <div key={i}>
        <Card cardData={toPassList} ind={i + 1} activeCard={active} />
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
      <div>
        <Card ind="1" activeCard={active} />
        <Card ind="2" activeCard={active} />
        <Card ind="3" activeCard={active} />
      </div>
    );
  };

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
        {/* <List
          setNote={setNote}
          setNoCompleted={setNoCompleted}
          task={list}
          day="weekend"
          cardData={notelist}
        /> */}
        {day === "week" ? (
          <List
            setNote={setNote}
            setNoCompleted={setNoCompleted}
            task={list}
            day="weekend"
          />
        ) : (
          <div className="list-box">
            <div className="hidden"></div>
            <List
              setNote={setNote}
              setNoCompleted={setNoCompleted}
              task={list}
              day="week"
            />
          </div>
        )}
      </div>
      <div className="go">
        <span className="go-text">Go</span>
        <span className="days"> {daysLeft} days left</span>
        <Model />
      </div>
      <div className="weekend-goal">
        <span className="weekend-goal-heading">Weekend task</span>
        {day === "weekend" ? (
          <List
            setNote={setNote}
            setNoCompleted={setNoCompleted}
            task={list}
            day="week"
          />
        ) : (
          <div className="list-box">
            <div className="hidden"></div>
            <List
              setNote={setNote}
              setNoCompleted={setNoCompleted}
              task={list}
              day="week"
            />
          </div>
        )}
      </div>
      <div className="grid">{task ? renderCard : renderSampleCard()}</div>
      <div className="add-new">
        <TextField
          sx={{ width: "80%", margin: "1rem 1rem 1rem 5%", fontSize: "2rem" }}
          id="outlined-basic"
          label="Any extra task you want to do today 📝 😉"
          color="primary"
          variant="standard"
          value={addExtraTask}
          onChange={(e) => setAddExtraTask(e.target.value)}
          InputLabelProps={{ style: { fontSize: "2rem" } }}
          inputProps={{ style: { fontSize: "2rem" } }} // font size of input text
        />

        <Button
          sx={{ fontSize: "2rem", padding: "1rem 3rem", marginTop: ".7rem" }}
          onClick={addExtraTaskForDay}
          variant="contained"
        >
          Add new
        </Button>
      </div>
    </div>
  );
}

export default App;
