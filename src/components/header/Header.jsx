import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Box,
  Menu,
  IconButton,
  Avatar,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import myAvatar from "../../assets/5.png";
import { setUser } from "../../store/slice/auth.slice";
import logo from "../../assets/4.png";
import useStyles from "./styles";
import "./Header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (headerRef.current && scrollY > 64) {
        headerRef.current.style.transform = "translateY(-6px)";
        headerRef.current.style.background =
          "background-image: linear-gradient(to right top, #d1d1d1, #d8d7db, #e1dce6, #eae2ef, #f4e7f8)";
      } else if (headerRef.current) {
        headerRef.current.style.transform = "translateY(0)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    if (token && !user) {
      dispatch(setUser({ token }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setMenuOpen(false);
    }
  }, [user]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("_token");
    const redirectPath = localStorage.getItem("_redirectPath");
    if (redirectPath) {
      localStorage.removeItem("_redirectPath");
      navigate("/login", { state: { redirectPath } });
    } else {
      dispatch(setUser(null));
      navigate("/login");
    }
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <Box className={classes.btnBox}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
            disabled={!user}
          >
            <Avatar alt="My Avatar" src={myAvatar} width="120" height="60" />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={menuOpen && Boolean(anchorEl)}
            onClose={handleMenuClose}
            classes={{ paper: classes.menuPaper }}
          >
            <MenuItem 
            className={classes.linkItem}
            onClick={handleMenuClose}>
              <NavLink className={classes.navLink} to="/">
                Profile
              </NavLink>
            </MenuItem>
            <MenuItem 
            className={classes.linkItem}
            onClick={handleMenuClose}>
              <NavLink className={classes.navLink} to="/create-product">
                Create Product
              </NavLink>
            </MenuItem>
            <MenuItem 
            className={classes.linkItem}
            onClick={handleMenuClose}>
              <NavLink className={classes.navLink} to="/favorite-products">
                Favorites
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleLogout}  className={`${classes.linkItem} ${classes.linkItemOut}`}>
              <NavLink className={`${classes.navLink} ${classes.logout}`}>
              Logout  
              </NavLink>
            </MenuItem>
          </Menu>
        </Box>
      );
    } else {
      return (
        <div className={classes.btnBox}>
          <Button
            color="inherit"
            component={NavLink}
            to="/login"
            className={classes.navLink}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/register"
            className={classes.navLink}
          >
            Register
          </Button>
        </div>
      );
    }
  };

  return (
    <AppBar position="static" className={classes.header} ref={headerRef}>
      <Container>
        <Toolbar>
          <NavLink to="/" className={classes.navLink}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </NavLink>

          <Button
            color="inherit"
            component={NavLink}
            to="/"
            className={`${classes.navLink} mainNav`}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/products"
            className={`${classes.navLink} mainNav`}
          >
            Products
          </Button>

          {renderAuthButtons()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
