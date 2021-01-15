import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import SVG from "react-inlinesvg";

const LoadedSVG = ({ asset, dash: dashInPercentage }) => {
  const [pathLength, setPathLength] = useState(null);
  const [dash, setDash] = useState(0);
  const svg = useRef();

  const getPathLength = () => {
    // assuming 1 path (too make thins easy, although can be nested)

    const path = svg.current.querySelector("path");
    const pathLength =
      path.getTotalLength() *
      ((svg.current.clientWidth - svg.current.viewBox.baseVal.width) /
        (svg.current.viewBox.baseVal.width || 10));

    return pathLength;
  };

  useEffect(() => {
    if (svg.current && pathLength) {
      setDash(pathLength * (dashInPercentage / 100));
    }
  }, [dashInPercentage, pathLength]);

  return (
    <SVG
      innerRef={svg}
      onLoad={(src, hasCache) => {
        if (!pathLength) {
          const calcPathLength = getPathLength();
          setPathLength(calcPathLength);
          svg.current.setAttribute("stroke-dasharray", calcPathLength);
          svg.current.setAttribute("stroke-dashoffset", calcPathLength);
        }
      }}
      strokeDashoffset={dash}
      src={asset}
    />
  );
};

const AnimatedLoadedSVG = animated(LoadedSVG);

export const Hotspot = ({ position }) => {
  const [active, setActive] = useState(false);

  const handleMouseHover = (event) => {
    setActive(event.type === "mouseenter" ? true : false);
  };
  const { stroke } = useSpring({
    from: { stroke: 100 },
    to: { stroke: 0 },
    reverse: !active,
    config: {
      duration: 300
    }
  });

  return (
    <span onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
      <AnimatedLoadedSVG asset="rocket.svg" dash={stroke} />
    </span>
  );
};
