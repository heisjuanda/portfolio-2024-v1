import { SOCIAL_NETWORK } from "../../constants/footerConstants";

import ARROW from "/icons/arrow.png";

import "./style.css";

const Footer = () => {
  return (
    <footer>
      <header>
        <h1>
          Wanna connect with me? <img src={ARROW} alt="" />
        </h1>
        <ol>
          {SOCIAL_NETWORK.map((social) => (
            <li key={social.name}>
              <a href={social.url}>
                <p>{social.name}</p>
                <img
                  src={social.icon}
                  alt="social network to connect with Juan David Moreno Alfonso (he is JuanDa)"
                />
              </a>
            </li>
          ))}
        </ol>
      </header>
    </footer>
  );
};

export default Footer;
