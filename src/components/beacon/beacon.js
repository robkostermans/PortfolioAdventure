import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSpring, animated, useChain } from "react-spring";

export const Beacon = ({ position }) => {
  const svgRef = useRef();
  const pathRef = useRef();
  const [settings, setSettings] = useState({ w: 100, s: 10000 });
  const [showBeacon, setShowBeacon] = useState(false);

  const opacitySpringRef = useRef();
  const [opacitySpring, setOpacity] = useSpring(() => ({
    ref: opacitySpringRef,
    from: { opacity: 0 },
    to: { opacity: 1 },
    reverse: !showBeacon,

    config: {
      duration: 500
      // mass: 0,
      // tension: 200,
      // friction: 150,
    }
  }));

  // const strokeSpringRef = useRef();
  // const strokeSpring = useSpring({
  //   ref: strokeSpringRef,
  //   from: {
  //     stroke: getPathLength()
  //   },
  //   to: { stroke: 0 },
  //   reverse: !showBeacon,
  //   config: {
  //     duration: 500
  //     // mass: 0,
  //     // tension: 200,
  //     // friction: 150,
  //   },
  // });

  //useChain([strokeSpringRef, opacitySpringRef], [0, 0]);

  useEffect(() => {
    const pathLength = Math.round(
      pathRef.current.getTotalLength() *
        ((settings.w - svgRef.current.viewBox.baseVal.width) /
          (svgRef.current.viewBox.baseVal.width || 10))
    );

    setSettings({
      ...settings,
      s: pathLength
    });
    // strokeSpring.stroke.startPosition = 290;
    // setStrokeSpring({
    //   ...strokeSpring
    // });
    //setStroke({ stroke: pathLength });
    setOpacity({ opacity: 1 });
  }, []);

  const handleMouseHover = (event) => {
    setShowBeacon(event.type === "mouseenter" ? true : false);

    //setStroke({ stroke: event.type === "mouseenter" ? 0 : settings.s });
    //setOpacity({ opacity: event.type === "mouseenter" ? 1 : 0 });
  };

  return (
    <div
      style={{ width: settings.w, height: settings.w }}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      <animated.svg
        ref={svgRef}
        stroke="rgb(0,0,0)"
        strokeLinecap="round"
        strokeWidth={2}
        strokeLinejoin={"round"}
        strokeDasharray={settings.s}
        strokeDashoffset={290}
        opacity={opacitySpring.opacity}
        viewBox={`0 0 24 24`}
        fill="transparent"
      >
        <path
          ref={pathRef}
          fill="none"
          vectorEffect="non-scaling-stroke"
          pathLength="100"
          d="M20 22L16.14 20.45C16.84 18.92 17.34 17.34 17.65 15.73L20 22M7.86 20.45L4 22L6.35 15.73C6.66 17.34 7.16 18.92 7.86 20.45M12 2C12 2 17 4 17 12C17 15.1 16.25 17.75 15.33 19.83C15 20.55 14.29 21 13.5 21H10.5C9.71 21 9 20.55 8.67 19.83C7.76 17.75 7 15.1 7 12C7 4 12 2 12 2M12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12Z"
        />
      </animated.svg>
    </div>
  );
};
