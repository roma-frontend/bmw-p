import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

const NavigationGuard = (props) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => {
    if (localStorage.getItem("_token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  return props.children;
};

export default NavigationGuard;