import { useLayoutEffect, useContext } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import Aos from "aos";
import "aos/dist/aos.css";

import { PortfolioContext } from "../../context/PortfolioContext";

import Button from "../../components/Button/Index";

import { EXPERIENCE } from "../../constants/homeConstants";

import discover from "../../assets/images/home/discover.webp";
import pic from "../../assets/images/heisjuanda/heisjuandaPic1.webp";

import "./style.css";

const Home = () => {
  const { isFromMenu, setIsFromMenu } = useContext(PortfolioContext);

  const history = useNavigate();

  const animationClickWork = () => {
    const tl = gsap.timeline();
    tl.to(".work--transition", {
      duration: 0.8,
      translateY: "0",
      ease: "power3.inOut",
    });
    setTimeout(() => {
      history("/work");
    }, 800);
  };

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.to(".home-title", {
      delay: isFromMenu ? 1 : 0,
      duration: 1,
      translateY: 0,
      ease: "power4.inOut",
      stagger: {
        amount: 0.1,
      },
    });

    tl.to(
      ".home-discover",
      {
        delay: isFromMenu ? 1 : 0,
        duration: isFromMenu ? 0.5 : 1.5,
        opacity: 1,
        ease: "power4.inOut",
      },
      "<"
    );

    if (isFromMenu) {
      setIsFromMenu(false);
    }

    Aos.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="home-section">
      <section>
        <header>
          <h1>
            <span className="home-title">Your Favorite</span>
          </h1>
          <h1>
            <span className="home-title">Front End</span>
          </h1>
          <h1>
            <span className="home-title">Developer</span>
            <a href="#experience">
              <img
                className="home-discover"
                src={discover}
                alt="Discover about Juan David Moreno Alfonso"
              />
            </a>
          </h1>
        </header>
      </section>

      <section>
        <article
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <img src={pic} alt="monkey well-dressed asking for a job" />
        </article>
      </section>

      <section>
        <header>
          <h2 id="experience">Experience</h2>
        </header>
        <article>
          <ol>
            {EXPERIENCE.map((experience) => (
              <li key={experience.title}>
                <h3>{experience.title}</h3>
                <h6>{experience.role}</h6>
                <p>{experience.description}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section>
        <Button text="Visit my work" click={animationClickWork} />
        <Button
          isDownload
          link="https://github.com/heisjuanda/heisjuanda/blob/main/Juan%20David%20Moreno%20Alfonso.pdf"
          text="Check my CV"
        />
      </section>

      <div className="work--transition"></div>
    </main>
  );
};

export default Home;
