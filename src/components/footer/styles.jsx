import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rootBox: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    color: "#fff",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
  },

  socials: {
    "& .face": {
      color: "#0d3899",
    },
    "& .twit": {
      color: "#1D9BF0",
    },
    "& .inst": {
      color: "#E4405F",
    },
    "& .link": {
      color: "#E68523",
    },
  },

  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "auto",
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: "auto",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  footerLink: {
    cursor: "pointer",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(2),
    },
    color: "#fff",
    transition: "all 0.15s ease",
    "&:hover": {
      textDecoration: "none",
      color: "#bcd4ec",
      transform: "scale(1.2)",
    },
  },
  footer: {
    backgroundColor: "#4b79a4",
  },
  copy: {
    color: "#fff",
    fontFamily: "Roboto, sans-serif",
    fontSize: "12px",
  },
  TextField: {
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -20px) scale(0.75)",
      color: "inherit",
    },
  },
  form__box: {
    display: "flex",
    gap: "30px",
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
      "& input": {
        color: "#fff",
      },
      "& label": {
        color: "#fff",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
      },
      "&::placeholder": {
        color: "#fff",
        opacity: 1,
      },
    },
  },
  btn: {
    width: "100%",
  },
}));

export default useStyles;