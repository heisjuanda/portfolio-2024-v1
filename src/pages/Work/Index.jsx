import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { WORK_PROJECTS } from "../../constants/workConstants";

import "./Work.css";

const Work = () => {
  const itemsRef = useRef([]);

  const history = useNavigate();

  const handleClickProject = (project) => {
    if (typeof project !== "object" || !project) return;

    gsap.to(".item-text h1", {
      duration: 1,
      opacity: "0",
      ease: "power2.inOut",
    });

    gsap.to(".item-img img", {
      duration: 1,
      scale: "0",
      ease: "power2.inOut",
    });

    gsap.to(
      ".container--title",
      {
        duration: 1,
        translateY: "100%",
        ease: "power4.inOut",
        stagger: {
          amount: 0.1
        }
      },
      "<"
    );

    setTimeout(() => {
      history(`/work/${project.handle}`);
    }, 1001);
  };

  useLayoutEffect(() => {
    window.scroll({
      top: 0,
      behavior: "instant",
    });
    const handleImagesScale = () => {
      itemsRef.current = document.querySelectorAll(".item");
      for (const element of itemsRef.current) {
        const img = element.querySelector(".item-img");
        gsap.set(img, { scale: 0 });
      }
    };
    const setScale = () => {
      for (const element of itemsRef.current) {
        const img = element.querySelector(".item-img");
        const rect = element.getBoundingClientRect();

        const viewportHeight = window.innerHeight;
        const itemCenter = rect.top + rect.height / 2;

        const distanceFromCenter = Math.abs(viewportHeight / 2 - itemCenter);

        const progress = distanceFromCenter / (viewportHeight / 2);

        const adjustedProgress = Math.pow(progress, 2);

        let scale = 1 - adjustedProgress * 0.5;
        scale = Math.max(0, Math.min(scale, 1));

        gsap.to(img, { scale: scale, duration: 0.1 });
      }
    };
    handleImagesScale();
    setScale();
    window.addEventListener("scroll", setScale);

    return () => {
      window.removeEventListener("scroll", setScale);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.to(".container--title", {
      duration: 1,
      delay: 0.5,
      translateY: 0,
      ease: "power4.inOut",
      stagger: {
        amount: 0.1
      }
    });

    tl.to(
      "article",
      {
        duration: 1,
        delay: 0.5,
        opacity: 1,
        ease: "power4.inOut",
      },
      "<"
    );
  }, []);

  return (
    <main className="work-section">
      <section className="work-section__container">
        <header>
          <h2>
            <span className="container--title">Selected</span>
          </h2>
          <h2>
            <span className="container--title">Projects</span>
          </h2>
        </header>
        <article>
          {WORK_PROJECTS.length > 0 &&
            WORK_PROJECTS.map((project) => (
              <div key={project.key} className="item">
                <div className="item-text">
                  <h1>{project.name}</h1>
                </div>
                <div
                  className="item-img"
                  onClick={() => {
                    handleClickProject(project);
                  }}
                >
                  <img
                    src={project.mainPicutre}
                    alt="project poster"
                    loading="eager"
                  />
                </div>
              </div>
            ))}
        </article>
      </section>
    </main>
  );
};

export default Work;
