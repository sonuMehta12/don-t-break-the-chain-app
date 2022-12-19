import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function SimplePaper({ ind = "", activeCard }) {
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

  // React.useEffect(()=>{

  // }, [active])

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
          The content of the Popove r. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Magni ex iste facere, impedit illo, tenetur dolorem,
          sunt architecto quisquam officia libero sit sapiente voluptate ea.
          Dolorum earum pariatur in corporis!
        </Typography>
      </Popover>
    </Box>
  );
}
