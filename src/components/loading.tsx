import React, { useEffect, useState } from "react";

const Loading: React.FC = () => {
  const [dots, setDots] = useState("");

  const [needMounting, setNeedMouting] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => {
        if (dots.length === 3) {
          return "";
        }
        return dots + ".";
      });
    }, 500);

    const timer = setTimeout(() => {
      setNeedMouting(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (needMounting) return <p>Loading {dots}</p>;

  return null;
};
export default Loading;
