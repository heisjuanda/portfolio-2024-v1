/* eslint-disable react/prop-types */
import { useLayoutEffect, useRef, useState } from "react";

import Matter from "matter-js";

import Button from "../Button/Index";

import "./TechStack.css";

export const TechStack = ({ techStackImages }) => {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const cacheWidthRef = useRef(window.innerWidth);

  const [isReset, setIsReset] = useState(false);

  useLayoutEffect(() => {
    function getRandomChoice() {
      const choices = [2, 4, 8, 1.5, 1.25];
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
    }

    let engine, render, runner, mouse;
    const handleResetCanvas = () => {
      if (engine && render && runner && mouse) {
        Engine.clear(engine);
        Render.stop(render);
        Runner.stop(runner);
        Mouse.clearSourceEvents(mouse);
      }
      if (canvasRef.current) {
        engine = Engine.create();
        render = Render.create({
          canvas: canvasRef.current,
          engine: engine,
          options: {
            background: "rgb(40, 40, 40)",
            wireframes: false,
            width: window.innerWidth,
            height: window.innerHeight,
          },
        });
        let boxes = [];
        for (const logo of techStackImages) {
          let box = Bodies.rectangle(
            window.innerWidth / getRandomChoice(),
            0,
            95,
            95,
            {
              label: "",
              density: 0.8,
              frictionAir: 0.01,
              restitution: 0.5,
              friction: 0.001,
              render: {
                sprite: {
                  texture: logo,
                  xScale: 1.2,
                  yScale: 1.2,
                },
              },
            }
          );
          boxes.push(box);
        }
        let ground = Bodies.rectangle(
          window.innerWidth / 2,
          window.innerHeight,
          window.innerWidth,
          1,
          { isStatic: true }
        );
        let wallL = Bodies.rectangle(
          window.innerWidth,
          window.innerHeight / 2,
          1,
          window.innerHeight,
          { isStatic: true }
        );
        let wallR = Bodies.rectangle(
          0,
          window.innerHeight / 2,
          1,
          window.innerHeight,
          { isStatic: true }
        );
        let ciel = Bodies.rectangle(
          window.innerWidth / 2,
          0,
          window.innerWidth,
          1,
          { isStatic: true }
        );
        for (const box of boxes) {
          Composite.add(engine.world, [box, ground, wallL, wallR, ciel]);
        }
        Render.run(render);

        runner = Runner.create();

        Runner.run(runner, engine);

        mouse = Mouse.create(render.canvas);
        let mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        });

        Composite.add(engine.world, mouseConstraint);
      }
    };
    handleResetCanvas();

    buttonRef.current = document.querySelector(".reset-btn__tech");

    if (buttonRef.current) {
      buttonRef.current.addEventListener("click", handleResetCanvas);
    }

    const handleCacheWidth = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== cacheWidthRef.current) {
        cacheWidthRef.current = newWidth;
        handleResetCanvas();
      }
    };

    window.addEventListener("resize", handleCacheWidth);

    return () => {
      window.removeEventListener("resize", handleCacheWidth);
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
      Mouse.clearSourceEvents(mouse);
    };
  }, [
    Bodies,
    Composite,
    Engine,
    Mouse,
    MouseConstraint,
    Render,
    Runner,
    techStackImages,
    isReset,
  ]);

  return (
    <section className="tech-tack-section">
      <Button
        click={() => {
          setIsReset((prev) => !prev);
        }}
        className={"reset-btn__tech"}
        text="Reset"
      />
      <canvas ref={canvasRef}></canvas>
    </section>
  );
};
