import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

function Footer() {
  return (
    <CustomPaper elevation={3}>
      <Typography variant="body1">
        © {new Date().getFullYear()}. Onther Inc. All rights reserved.
      </Typography>
    </CustomPaper>
  );
}

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  backgroundColor: "#f5f5f5",
  bottom: 0,
  width: "100%",
  zIndex: -1,
}));

export default Footer;
