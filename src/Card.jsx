import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// const cardData = JSON.parse(localStorage.getItem("card"));
export default function SimplePaper({ ind = "", activeCard, cardData }) {
  const renderIcon = () => {
    const sx = (color) => {
      return {
        color,
        fontSize: "7rem",
        marginTop: "-1rem",
      };
    };

    if (activeCard.status === "success" && ind === activeCard.current)
      return <CheckCircleIcon sx={sx("green")} />;
    else if (activeCard.status === "failed" && ind === activeCard.current)
      return <CancelIcon sx={sx("red")} />;
    else return <HourglassTopIcon sx={sx("grey")} />;
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderList = () => {
    if (!cardData) return;
    console.log(cardData);
    // console.log(cardData[0].status);
    console.log(cardData.notes);
    const color = (id) => {
      if (id === 0) {
        return "#2b90d9";
      } else if (id === 1) {
        return "#282c37";
      } else if (id === 2) {
        return "#9baec8";
      } else if (id === 3) {
        return "#3ffc952";
      } else if (id === 4) {
        return "#5c196b";
      } else if (id === 5) {
        return "#ff5f2e";
      } else if (id === 6) {
        return "#181842";
      } else if (id === 7) {
        return "#DC143C";
      } else if (id === 8) {
        return "#9400D3";
      } else if (id === 9) {
        return "#1E90FF";
      } else if (id === 5) {
        return "#3333";
      }
    };
    let uniqueList = [...new Set(cardData.notes)];

    return [...uniqueList].map((el) => {
      return (
        <span
          style={{
            display: "block",
            fontWeight: "bold",
            textTransform: "capitalize",
            color: `${color(el.ind)}`,
          }}
          id={el.ind}
        >
          {" "}
          {el.ind} {el.note}
        </span>
      );
    });
    // if (cardData.note.length < 0) {
    //   return null;
    // } else {
    //   return cardData.note.map((el) => {
    //     return (
    //       <span id={el.ind}>
    //         {" "}
    //         NOTE {el.id} {el.note}
    //       </span>
    //     );
    //   });
    // }
  };

  React.useEffect(() => {
    // const c = JSON.parse(localStorage.getItem("card"));
    // console.log(c);
  });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "9rem",
          height: "9rem",
        },
      }}
    >
      <Paper
        sx={{
          border: `${ind === activeCard.current && "4px solid gold"}`,
        }}
        aria-describedby={id}
        onClick={handleClick}
        elevation={3}
      >
        <span
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            padding: "1rem",
            color: "#D4DFE6",
          }}
        >
          {ind}
        </span>
        {renderIcon()}
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ width: "60%" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2, fontSize: "1.6rem" }}>
          {renderList()}
        </Typography>
      </Popover>
    </Box>
  );
}
