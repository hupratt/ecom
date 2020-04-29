import React from "react";

const FallBackPage = () => {
  return (
    <div>
      <img
        style={{ height: "100%", width: "100%" }}
        src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/offline.png"
      />
    </div>
  );
};

export default FallBackPage;
