import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function SimplePaper({ ind = "", icon = null }) {
  const [active, setActive] = React.useState(false);
  const renderIcon = () => {
    const sx = (color) => {
      return {
        color,
        fontSize: "7rem",
        margin: "1rem -1.6rem",
      };
    };
    if (icon) {
      return icon === "sucess" ? (
        <CheckCircleIcon sx={sx("green")} />
      ) : (
        <CancelIcon />
      );
    } else {
      return <HourglassTopIcon sx={sx("grey")} />;
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setActive(!active);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActive(!active);
  };

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
          border: `${active && "2px solid blue"}`,
          display: "flex",
        }}
        aria-describedby={id}
        onClick={handleClick}
        elevation={3}
      >
        <span
          style={{
            fontSize: "5rem",
            textAlign: "center",
            fontWeight: 700,
            color: "#D4DFE6",
          }}
        >
          1
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

// import * as React from 'react';

// export default function BasicPopover() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div>
//       <Button aria-describedby={id} variant="contained" onClick={handleClick}>
//         Open Popover
//       </Button>
//   <Popover
//     id={id}
//     open={open}
//     anchorEl={anchorEl}
//     onClose={handleClose}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'left',
//     }}
//   >
//     <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
//   </Popover>
//     </div>
//   );
// }
