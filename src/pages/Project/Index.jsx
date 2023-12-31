import { useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import gsap from "gsap";

import Button from "../../components/Button/Index";

import { TechStack } from "../../components/TechStack/Index";

import {
  getNextProject,
  getPreviousProject,
} from "../../helpers/getNextProject";

import useProject from "../../hooks/useProject";

import checked from "/icons/checkProject.png";
import arrowB from "/icons/arrow-b.png";
import arrowW from "/icons/arrow-w.png";

import "./style.css";

const Project = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const { handle } = useParams();

  const history = useNavigate();

  const { currentProject } = useProject(handle);

  const handleNextHandle = (isNext) => {
    const nextHandle = isNext
      ? getNextProject(handle)
      : getPreviousProject(handle);
    setIsDisabled(true);
    gsap.to(".project-section__container header h1 span", {
      translateY: "100%",
      duration: 0.5,
      ease: "power2.in",
    });
    gsap.to(".project-section__container header h4 span", {
      translateY: "100%",
      duration: 0.5,
      ease: "power4.in",
    });
    gsap.to(".disappear", {
      opacity: 0,
      duration: 0.5,
      ease: "power4.out",
    });

    setTimeout(() => {
      history(`/work/${nextHandle}`);
    }, 501);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1001);
  };

  useLayoutEffect(() => {
    const handleTitleReveal = () => {
      window.scroll({
        top: 0,
        behavior: "instant",
      });

      gsap.to(".container-project--name", {
        translateY: "0",
        duration: 0.5,
        delay: 0.5,
        ease: "power2.out",
      });
      gsap.to(".container-project--category", {
        translateY: "0",
        duration: 0.5,
        delay: 0.5,
        ease: "power4.out",
      });
      gsap.to(".disappear", {
        opacity: "1",
        duration: 0.5,
        delay: 0.5,
        ease: "power4.in",
      });
    };
    handleTitleReveal();
  }, [currentProject]);

  return (
    <main className="project-section">
      <section className="project-section__container" id="top"
      >
        <header>
          {currentProject?.name && (
            <h1>
              <span className="container-project--name">
                {currentProject.name}
              </span>
              {currentProject?.isMine && (
                <img
                  src={checked}
                  className="disappear"
                  alt="this project was made by heisjuanda (not apply for projects made in heisjuanda's job)"
                />
              )}
            </h1>
          )}
          {currentProject?.category && (
            <h4>
              <span className="container-project--category">
                {Array.isArray(currentProject.category) &&
                  currentProject.category.map((category, index) => {
                    if (index === currentProject.category.length - 1)
                      return category;
                    return category + " - ";
                  })}
              </span>
            </h4>
          )}
        </header>
        <article className="disappear">
          {currentProject?.description && (
            <div className="project-description">
              <p>{currentProject.description}</p>
            </div>
          )}
        </article>
        <article className="project-navigation--control disappear">
          <Button
            click={() => {
              handleNextHandle(true);
            }}
            text="following"
            disabled={isDisabled}
          />
          <Button
            click={() => {
              handleNextHandle(false);
            }}
            text="Previous"
            disabled={isDisabled}
          />
        </article>
        <article className="project-demo disappear">
          {currentProject?.demo && (
            <div>
              <img
                src={currentProject.demo}
                alt={`${currentProject.name}'s demo`}
                loading="eager"
              />
            </div>
          )}
        </article>
        <article className="disappear">
          {currentProject?.tech && (
            <ul className="project-tech--stack">
              {Array.isArray(currentProject.tech) &&
                currentProject.tech.map((tech, key) => (
                  <li key={key}>{tech}</li>
                ))}
            </ul>
          )}
        </article>
        {currentProject?.techStack && (
          <article className="disappear">
            <TechStack techStackImages={currentProject.techStack} />
          </article>
        )}
        <article className="disappear">
          {currentProject?.repo && (
            <h3 className="project-repository">
              <a href={currentProject.repo}>See details</a>
            </h3>
          )}
        </article>
        <article className="disappear">
          {currentProject?.details && (
            <ul className="project-details">
              {Array.isArray(currentProject.details) &&
                currentProject.details.map((images, key) => (
                  <li key={key}>
                    <LazyLoadImage
                      effect="blur"
                      src={images}
                      alt={`${currentProject.name}'s demo picture`}
                    />
                  </li>
                ))}
            </ul>
          )}
        </article>
        <article>
          <h6>Need help to go up?</h6>
          <div className="go--up">
            <a href="#top">
              <img src={arrowW} alt="" />
              <img src={arrowB} alt="" />
            </a>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Project;
