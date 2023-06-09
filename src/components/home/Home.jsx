import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const useStyles = makeStyles((theme) => ({
  section: {
    minHeight: "calc(100vh - 64px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    background: "linear-gradient(to left bottom, #f2bddb, #e6bce1, #d9bce5, #cabde8, #bbbde9, #aec0ea, #a3c2e9, #98c4e6, #90c8e2, #8dcbdb, #8fcdd4, #94cfcb)",
    paddingTop: theme.spacing(12),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
  },
  description: {
    color: "#333",
  },
  primaryAction: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
    background: "linear-gradient(191deg, rgba(42,71,94,1) 0%, rgb(114 164 202) 47%, rgba(15,104,130,1) 100%)",
    "&:hover": {
      background: "linear-gradient(159deg, rgb(41 70 93) 0%, rgb(114 164 202) 47%, rgb(22 26 27) 100%)",
    },
  },
  secondaryAction: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    color: "#1976d2",
    borderColor: "#1469be",
    "&:hover": {
      borderColor: "#1469be",
    },
  },
  span1: {
    color: "#1976d2",
  },
  span2: {
    color: "#000",
  },
}));

function Home(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const content = {
    "header-p1": "Welcome to our website",
    "header-p2": "where you will find everything you need for your business",
    description:
      "We offer a wide range of services that will help you improve your business. Our team of professionals is ready to assist you at any time",
    "primary-action": "Get Started",
    "secondary-action": "Learn More",
    ...props.content,
  };

  return (
    <>
      <section className={classes.section}>
        <Container maxWidth="md">
          <Box textAlign="center" color="common.white">
            <Typography variant="h2" component="h2" gutterBottom={true}>
              <Typography
                color="secondary"
                className={classes.span1}
                variant="h2"
                component="span"
              >
                {content["header-p1"]}{" "}
              </Typography>
              <Typography
                className={classes.span2}
                variant="h2"
                component="span"
              >
                {content["header-p2"]}
              </Typography>
            </Typography>
            <Container maxWidth="sm">
              <Typography
                variant="subtitle1"
                color="textSecondary"
                paragraph={true}
                className={classes.description}
              >
                {content["description"]}
              </Typography>
            </Container>
            {!user ? (
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.primaryAction}
                  onClick={() => navigate("/preview")}
                >
                  {content["primary-action"]}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.secondaryAction}
                  onClick={() => navigate("/preview")}
                >
                  {content["secondary-action"]}
                </Button>
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.secondaryAction}
                onClick={() => navigate("/preview")}
              >
                {content["secondary-action"]}
              </Button>
            )}
          </Box>
        </Container>
      </section>
    </>
  );
}

export default Home;
