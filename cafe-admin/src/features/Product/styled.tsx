"use client";

import { Button, styled } from "@mui/material";

const ButtonDetail = styled(Button)({
  backgroundColor: "transparent",
  padding: 0,
  minWidth: 0,
  "&:hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  "&:focus": {
    backgroundColor: "transparent",
  },
});

const ButtonEdit = styled(ButtonDetail)({
  borderRadius: "50%",
  color: "#D17842",
});

const ButtonCreateEditForm = styled(Button)(({ theme }) => ({
  backgroundColor: "#D17842",
  color: "#fff",
  fontSize: 14,
  padding: "8px 10px 8px 14px",
  border: `1px solid #D17842`,
  "&:hover": {
    backgroundColor: "#D17842",
    opacity: 0.8,
  },
  "&.MuiButton-root": {
    "&&.MuiButton-iconSizeMedium": {
      marginBottom: 5,
      backgroundColor: "#D17842",
    },
  },
}));

const ButtonExportCSV = styled(Button)(({ theme }) => ({
  width: 124,
  fontSize: 12,
  padding: "8px 0px",
  border: `1px solid ${theme.palette.base.black}`,
  "&:hover": {
    border: `1px solid ${theme.palette.base.black}`,
  },
}));

const ButtonCreate = styled(Button)(({ theme }) => ({
  fontSize: 12,
  padding: "8px 10px 8px 14px",
  border: `1px solid #D17842`,
  color: "#D17842",
  "&& .MuiButton-startIcon": {
    marginBottom: 3,
  },
  "&:hover": {
    border: `1px solid #D17842`,
    color: "#D17842",
    opacity: 0.8,
  },
  "&.MuiButton-root": {
    "&&.MuiButton-iconSizeMedium": {
      marginBottom: 5,
      backgroundColor: "#D17842",
    },
  },
}));

const ButtonSearch = styled(Button)({
  height: 32,
  lineHeight: "normal",
  marginTop: "17px !important",
});

const ButtonDelete = styled(Button)(({ theme }) => ({
  backgroundColor: "#E53E3E",
  color: "#fff",
  fontSize: 14,
  padding: "8px 10px 8px 14px",
  border: `1px solid #E53E3E`,
  "&:hover": {
    backgroundColor: "#E53E3E",
    opacity: 0.8,
  },
  "&.MuiButton-root": {
    "&&.MuiButton-iconSizeMedium": {
      marginBottom: 5,
      backgroundColor: "#E53E3E",
    },
  },
}));

export {
  ButtonCreate,
  ButtonDetail,
  ButtonEdit,
  ButtonExportCSV,
  ButtonSearch,
  ButtonCreateEditForm,
  ButtonDelete,
};
