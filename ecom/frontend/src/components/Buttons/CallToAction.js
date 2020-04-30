import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

const CallToAction = () => {
  const [cta, setCTA] = useState(true);
  const cacheCTA = localStorage.getItem("cta") == undefined ? true : false;
  const handleClick = (_) => {
    localStorage.setItem("cta", false);
    setCTA(!cta);
  };
  return (
    <CSSTransition
      in={cta && cacheCTA}
      classNames="fadeout"
      unmountOnExit
      timeout={300}
    >
      <div className="container-wrapper">
        <div className="container container-cta">
          <h1>European School books</h1>
          <h3>
            Available <a>here</a>
          </h3>
          <a onClick={handleClick}>
            <i className="fas fa-times"></i>
          </a>
        </div>
      </div>
    </CSSTransition>
  );
};

export default CallToAction;
