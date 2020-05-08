import React from "react";
import { Button, Modal } from "semantic-ui-react";

const ModalCookies = ({ handleCloseNoCookies, handleCloseYesCookies }) => {
  return (
    <Modal open={true} basic size="small" style={{ width: "100%" }}>
      <div className="cookies-container">
        <div className="cookies">
          <h4>
            This website uses cookies to ensure the best user experience and
            continously improve our services.
          </h4>
          <div className="buttonwrapper">
            <Button color="red" onClick={handleCloseNoCookies} inverted>
              No cookies
            </Button>
            <Button color="green" onClick={handleCloseYesCookies} inverted>
              <i className="fas fa-check"></i> Got it
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCookies;
