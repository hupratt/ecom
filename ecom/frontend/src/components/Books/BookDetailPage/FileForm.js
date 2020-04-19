import React, { Fragment, useState } from "react";
import axios from "axios";
import { endpoint, s3_base_url } from "../../../constants";

const FileForm = ({ book }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formData2 = new FormData();
    if (file !== undefined) {
      formData2.append("image", file);
      formData2.append("alt", "blank");
    }
    for (var key in book) {
      if (
        book[key] !== undefined &&
        key !== "picture" &&
        key !== "prix_barre"
      ) {
        formData.append(key, book[key]);
      }
    }
    axios
      .put(`${endpoint}/books/${book.id}/update/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .catch((err) => console.log(err));
    axios
      .put(`${endpoint}/bookimages/${book.pictureid}/update/`, formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit} enctype="multipart/form-data">
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="picture"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="picture">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Save"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </Fragment>
  );
};

const Message = ({ msg }) => {
  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
      {msg}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

const Progress = ({ percentage }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};
export default FileForm;
