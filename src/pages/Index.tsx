
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to landing page on initial load
    navigate("/landing");
  }, [navigate]);

  return null;
};

export default Index;
