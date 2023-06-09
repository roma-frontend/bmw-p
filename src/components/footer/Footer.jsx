import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IntlContext from "./intlContext";
import messages from "./messages";
import { useSpring, animated } from "react-spring";
import useStyles from './styles'



function Footer(props) {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e) => {
    e.preventDefault();
    window.location.href = `mailto:romangulanyan@gmail.com?subject=Subscription&body=${email}`;
    setEmail("");
  };

  const [iconHover, setIconHover] = useState(false);

  const iconSpring = useSpring({
    transform: iconHover ? "scale(1.2)" : "scale(1)",
    cursor: "pointer"
  });

  const navigate = useNavigate();
  const classes = useStyles();

  const content = {
    copy: "© 2023 Nereus All rights reserved.",
    link1: "Products",
    link2: "Services",
    link3: "Team Privacy",
    link4: "Contact Us",
    ...props.content,
  };

  return (
    <IntlContext.Provider value={{ locale: "en", messages }}>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Box
            py={6}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gridRowGap="40px"
            className={classes.rootBox}
          >
            <Box component="nav" className={classes.footerNav}>
              <Link
                onClick={() => navigate("/products")}
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                {content["link1"]}
              </Link>
              <Link
                to="/"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                {content["link2"]}
              </Link>
              <Link
                to="/"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                {content["link3"]}
              </Link>
              <Link
                onClick={() => navigate("/contacts")}
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                {content["link4"]}
              </Link>
              <Link
                to="/sitemap"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                Site Map
              </Link>
              <Link
                to="/blog"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                Blog
              </Link>
            </Box>
            <Box
              className={classes.socials}
              display="flex"
              alignItems="center"
              gridColumnGap="20px"
              fontSize="25px"
              position="relative"
            >
              <animated.div
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
                style={iconSpring}
              >
                <Link
                 className="face"
                 href="http://www.facebook.com" 
                 target="_blank" rel="noopener" 
                 aria-label="Facebook"
                 >
                  <FaFacebook />
                </Link>
              </animated.div>
              <animated.div
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
                style={iconSpring}
              >
                <Link
                 className="twit"
                 href="http://www.twitter.com" 
                 target="_blank" rel="noopener" 
                 aria-label="Twitter"
                 >
                  <FaTwitter />
                </Link>
              </animated.div>
              <animated.div
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
                style={iconSpring}
              >
                <Link
                 className="inst"
                 href="http://www.instagram.com" 
                 target="_blank" rel="noopener" 
                 aria-label="Instagram"
                 >
                  <FaInstagram />
                </Link>
              </animated.div>
              <animated.div
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
                style={iconSpring}
              >
                <Link
                 className="link"
                 href="http://www.linkedin.com" 
                 target="_blank" rel="noopener" 
                 aria-label="Linkedin"
                 >
                  <FaLinkedin />
                </Link>
              </animated.div>
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                zIndex={-1}
                content=""
                transition="all 0.3s ease"
              />
            </Box>
            <Box display="flex" alignItems="center" width="40%">
              <form onSubmit={handleSubscribe} className={classes.form__box}>
                <TextField
                  className={classes.TextField}
                  fullWidth={true}
                  label={messages.emailPlaceholder.defaultMessage}
                  variant="outlined"
                  placeholder={messages.emailPlaceholder.defaultMessage}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className={classes.btn}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  {messages.subscribeButton.defaultMessage}
                </Button>
              </form>
            </Box>
            <Typography
              className={classes.copy}
              color="textSecondary"
              component="p"
              variant="caption"
              gutterBottom={false}
            >
              {content["copy"]}
            </Typography>
          </Box>
        </Container>
      </footer>
    </IntlContext.Provider>
  );
}

export default Footer;
