import "./style.css";

const HeIsJuanda = () => {
  const goTo = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div onClick={goTo} className="current-section--breadcrum">
      <h3>He is JuanDa</h3>
    </div>
  );
};

export default HeIsJuanda;
