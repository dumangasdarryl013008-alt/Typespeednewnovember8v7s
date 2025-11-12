import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./TimeAnimation.css";

const TimeAnimation = ({ show, value, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show]);

  if (!visible) return null;

  const color = type === 'bonus' ? '#4CAF50' : '#F44336';
  const text = type === 'bonus' ? `+${value}s` : `-${value}s`;

  return (
    <Box
      className="time-animation"
      sx={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: color,
        fontSize: '2rem',
        fontWeight: 'bold',
        animation: 'slideInOut 1s ease-in-out',
        zIndex: 9999,
      }}
    >
      {text}
    </Box>
  );
};

export default TimeAnimation;
