/* eslint-disable react/prop-types */
import "./style.css";

const Button = ({
  text,
  link,
  isDownload,
  click,
  style,
  type,
  disabled,
  child,
}) => {
  return (
    <button
      onClick={click}
      type={type}
      className={`custom-button ${style && style}`}
      disabled={disabled}
    >
      {link ? (
        <a href={link} target="_blank" download={isDownload} rel="noreferrer">
          <p>{text}</p>
        </a>
      ) : (
        <>
          {text && <p>{text}</p>}
          {child ? child : null}
        </>
      )}
    </button>
  );
};

export default Button;
