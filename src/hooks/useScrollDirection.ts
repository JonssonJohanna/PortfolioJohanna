import { useEffect, useState } from "react";

let previousScrollY = 0;

const useScrollDirection = () => {
  const [scrollDirection, setDirection] =
    useState<string | undefined>(undefined);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > previousScrollY) {
        setDirection('down');
      } else {
        setDirection('up');
      }
      previousScrollY = window.scrollY;
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  
  return scrollDirection;
};

export default useScrollDirection;
