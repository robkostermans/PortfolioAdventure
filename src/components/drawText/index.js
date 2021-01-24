import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSpring, animated, useChain } from "react-spring";
import styled from "styled-components";
const S = {};

export const DrawText = ({ children, text }) => {
  return <DrawCanvas>{children}</DrawCanvas>;
};

const DrawCanvas = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const canvasRef = useRef();
  const addEventListeners = () => {
    //blobRef.current.addEventListener("mousemove", onMouseMove);
    canvasRef.current.addEventListener("mouseenter", onMouseEnter);
    canvasRef.current.addEventListener("mouseleave", onMouseLeave);
  };

  const removeEventListeners = () => {
    if (!canvasRef.current) return true;
    //blobRef.current.removeEventListener("mousemove", onMouseMove);
    canvasRef.current.removeEventListener("mouseenter", onMouseEnter);
    canvasRef.current.removeEventListener("mouseleave", onMouseLeave);
  };

  const onMouseLeave = (e) => {
    setPosition({ x: e.offsetX, y: e.offsetY });
    setHidden(true);
  };

  const onMouseEnter = (e) => {
    setPosition({ x: e.offsetX, y: e.offsetY });
    setHidden(false);
  };

  useEffect(() => {
    addEventListeners();

    return () => removeEventListeners();
  }, []);

  return (
    <S.Canvas ref={canvasRef}>
      <DrawBlobCanvas position={position} hidden={hidden}>
        {children}
      </DrawBlobCanvas>
      <DrawTextCanvas>{children}</DrawTextCanvas>
    </S.Canvas>
  );
};

const DrawTextCanvas = ({ children }) => {
  return <S.TextCanvas>{children}</S.TextCanvas>;
};

const DrawBlobCanvas = ({ children, position, hidden }) => {
  return (
    <S.BlobCanvas>
      <div
        className={`blob ${!hidden && "blob--show"}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </S.BlobCanvas>
  );
};

/**
 * HELPERS
 */

const randomPercentage = (min = 10, max = 80) => {
  return Math.floor(Math.random() * (max - min + 1) + min) + "%";
};

/**
 * StyledComponets
 */

S.Canvas = styled.div`
  position: relative;
  box-sizing: 1 border-box;
  width: 200px;
  height: 200px;
  border: 1px solid silver;
  border-radius: 5px;
`;

S.TextCanvas = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
  color: black;

  z-index: 100;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
`;

S.BlobCanvas = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  background: green;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  .blob {
    z-index: -1;

    background: red;
    width: 0px;
    height: 0px;

    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out,
      opacity 0.4s ease-in-out;

    &.blob--show {
      width: 300%;
      height: 300%;
    }
  }
`;
