import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    menuPaper: {
    backgroundColor: "transparent",
    backdropFilter: "blur(10px)",
    border: "3px solid rgba(257, 257, 257, .4)",
    borderRadius: "1vw",
    padding: "10px",
    fontFamily: "inherit"
  },

  linkItem: {
    fontFamily: "inherit",
    borderRadius: "8px"
  },

  linkItemOut: {
    marginTop: "15px"
  },

  header: {
    position: "sticky",
    top: "0",
    left: "0",
    right: "0",
    boxShadow: "0 5px 30px 10px #D2D9EE",
    background:
      "linear-gradient(to left bottom, #f2bddb, #e9c2e4, #dfc7eb, #d6ccef, #ced0f1, #cfd3f0, #d0d6ef, #d2d9ee, #d9dded, #e0e0eb, #e5e5ea, #e9e9e9)",
    transition: "transform 0.5s ease",
  },

  logout: {
    color: "#f44336 !important",
  },
  logo: {
    marginRight: theme.spacing(5),
    width: "120px",
  },
  navLink: {
    position: "relative",
    fontFamily: "inherit",
    minWidth: "auto",
    display: "inline-block",
    marginRight: theme.spacing(4),
    textDecoration: "none",
    lineHeight: "1.75",
    letterSpacing: "0.8px",
    color: "#3D5D8C",
  },

  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    flexWrap: "wrap",
  },
}));

export default useStyles;
