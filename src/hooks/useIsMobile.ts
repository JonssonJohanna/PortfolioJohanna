import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const toggleMobile = () => {
      if (window.innerWidth < 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    toggleMobile()

    window.addEventListener("resize", toggleMobile);

    return () => {
      window.removeEventListener("resize", toggleMobile);
    };
  }, []);

  return isMobile;
};

export default useScrollDirection;
