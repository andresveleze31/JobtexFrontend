import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

function Video({ url }) {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      <ReactPlayer
        controls={true}
        height="400px"
        width={screenSize.width < 750 ? "350px" : "750px"}
        url={url}
      />
    </div>
  );
}

export default Video;
