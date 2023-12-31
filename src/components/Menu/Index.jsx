import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";

import { PortfolioContext } from "../../context/PortfolioContext";

import HeIsJuanda from "../HeIsJuanda/Index";
import { Contact } from "../Contact/Index";

import "./style.css";

const Menu = () => {
  const { setIsFromMenu } = useContext(PortfolioContext);

  const MENU_OPTIONS = [
    {
      id: 1,
      name: "About",
      path: "/",
    },
    {
      id: 2,
      name: "Work",
      path: "/work",
    },
    {
      id: 3,
      name: "Close",
      path: "",
    },
  ];

  const history = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  const handleMenuBton = (isOpen) => {
    const transformValue = isOpen ? "7px" : "0px";
    const rotateValue = isOpen ? "45deg" : "0deg";
    const opacityValue = isOpen ? "0" : "1";

    gsap.to("#burger-btn__one", {
      translateY: transformValue,
      rotate: rotateValue,
      duration: 0.3,
    });
    gsap.to("#burger-btn__two", {
      opacity: opacityValue,
      duration: 0.3,
    });
    gsap.to("#burger-btn__three", {
      translateY: `-${transformValue}`,
      rotate: `-${rotateValue}`,
      duration: 0.3,
    });
  };

  const openAnimtionMenu = () => {
    const tl = gsap.timeline();

    tl.to(".navigation__container", {
      translateY: "0",
      duration: 0.5,
      ease: "circ.inOut",
    });
    tl.to(".menu-link", {
      translateY: 0,
      duration: 0.5,
      ease: "power4.out",
      stagger: {
        amount: 0.1,
      },
    });
    tl.to(
      ".separator-menu",
      {
        duration: 0.3,
        scale: 1,
      },
      "<"
    );
    tl.to(
      ".contact-me",
      {
        duration: 0.3,
        opacity: 1,
        delay: 0.2,
      },
      "<"
    );
  };

  const closeAnimationMenu = () => {
    const tl = gsap.timeline();

    tl.to(".menu-link", {
      translateY: 100,
      duration: 0.5,
      ease: "power4.in",
      stagger: {
        amount: 0.1,
      },
    });
    tl.to(".navigation__container", {
      translateY: "-100%",
      duration: 0.5,
      ease: "circ.inOut",
    });
    tl.to(
      ".separator-menu",
      {
        duration: 0.3,
        scale: 0,
      },
      "+=-1"
    );
    tl.to(
      ".contact-me",
      {
        duration: 0.3,
        opacity: 0,
      },
      "+=-1"
    );
  };

  const disableButtonMenu = () => {
    setIsDisabledBtn(true);
    setTimeout(() => {
      setIsDisabledBtn(false);
    }, 1000);
  };

  const handleMenu = () => {
    disableButtonMenu();

    if (!isOpen) {
      openAnimtionMenu();
    } else {
      closeAnimationMenu();
    }
    handleMenuBton(!isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        role="button"
        title="burger-menu"
        className="burger-btn"
        onClick={handleMenu}
        disabled={isDisabledBtn}
      >
        <span id="burger-btn__one"></span>
        <span id="burger-btn__two"></span>
        <span id="burger-btn__three"></span>
      </button>
      <nav className="navigation-portfolio">
        <HeIsJuanda />
        <ol className="navigation__container">
          {MENU_OPTIONS.map((menuLink) => (
            <li key={menuLink.id}>
              <h2
                onClick={() => {
                  closeAnimationMenu();
                  if (menuLink.path) {
                    history(menuLink.path);
                    setIsFromMenu(true);
                    window.scrollTo({
                      top: 0,
                      behavior: "instant",
                    });
                  }
                  disableButtonMenu();
                  handleMenuBton(!isOpen);
                  setIsOpen(!isOpen);
                }}
                className="menu-link"
              >
                {menuLink.name}
              </h2>
            </li>
          ))}
          <div className="separator-menu"></div>
          <Contact />
        </ol>
      </nav>
    </>
  );
};

export default Menu;
