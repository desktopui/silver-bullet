const { useState, useEffect } = require("react");

function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  };
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize());
  function handleResize() {
    setWindowSize(getSize());
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
}
