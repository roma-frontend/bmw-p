import React from "react";
import "../style.css";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import { loginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { LoginInitialValues, LoginValidator } from "../../validators/login";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/slice/auth.slice";
import { setLoader, setError } from "../../store/slice/global.slice";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() => ({
  button: {
    background:
      "linear-gradient(to right top, #051937, #223a5c, #3e5f83, #5c86ac, #7cb0d6)",
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.global.error);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: LoginInitialValues,
    validationSchema: LoginValidator,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        const res = await loginApi(values);
        if (res.status === 200) {
          window.localStorage.setItem("_token", res.data.data.token);
          dispatch(setUser(res.data.data));
          dispatch(setLoader(false));
          const redirectPath = localStorage.getItem("_redirectPath");
          if (redirectPath) {
            navigate(redirectPath);
            localStorage.removeItem("_redirectPath");
          } else {
            navigate("/");
          }
        } else {
          dispatch(setLoader(false));
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setError(error.response.data.errors);
          toast.error("Error while logging");
        } else {
          toast.error("Error occured while logging");
        }
      }
    },
  });

  return (
    <div className="root">
      <form className="form" onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          maxWidth={640}
          margin="auto"
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
        >
          <Typography variant="h2" fontFamily="Poppins" textAlign="center">
            Authorization
          </Typography>
          <Typography
            variant="body1"
            marginBottom={3}
            padding={3}
            fontFamily="Poppins"
            textAlign="center"
          >
            Enter your login and password
          </Typography>

          <TextField
            name="email"
            fullWidth={true}
            margin="normal"
            label="Email"
            variant="outlined"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              !!(formik.errors.email || (errors?.email && errors?.email[0]))
            }
            helperText={errors?.email && errors?.email[0]}
          />
          <TextField
            name="password"
            type="password"
            fullWidth={true}
            margin="normal"
            label="Password"
            variant="outlined"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              !!(
                formik.errors.password ||
                (errors?.password && errors?.password[0])
              )
            }
            helperText={errors?.password && errors?.password[0]}
          />
          <Button
            className={classes.button}
            type="submit"
            disabled={!formik.isValid}
            style={{
              fontFamily: "Poppins",
              marginTop: 3,
              marginBottom: 2,
              width: "60%",
            }}
            variant="contained"
          >
            Enter
          </Button>

          <Typography variant="body1" style={{ fontFamily: "Poppins" }}>
            Do not have an account?
            <span
              className="inicitingText"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </Typography>
        </Box>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
