import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./newPicture.css";
import { useState } from "react";
import Axios from "axios";

const NewPicture = ({ setShowModal, setHideEverythingElse }) => {
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");

  const saveImage = () => {
    if ((imageURL === "", category === "")) {
      return false;
    }

    Axios.post("http://localhost:3001/adminpanel", {
      imageURL: imageURL,
      category: category,
    }).then(console.log("Image added to database"));

    setShowModal(false);
    setHideEverythingElse(false)
  };

  return (
    <div className="new-image-back-container">
      <div className="container new-image-front-container">
        {/* modal head */}
        <div className="upload-steps">
          <h2>Steps To Add A New Image</h2>
          <ol>
            <li>Click On This Link: <a href="https://cloudinary.com/console/c-343f2c615cf788840b2d735750353d/media_library/folders/home" target='blank'> Cloudinary.com</a></li>
            <li>Login Using Provided Username And Password</li>
            <li>Click On The "UPLOAD" Button On The Upper Right Side</li>
            <li>Browse Or Drag And Drop The Image You Want</li>
            <li>Wait For It To Finish Uploading</li>
            <li>Once The Upload Is Finished, Right Click On The New Image You Just Uploaded</li>
            <li>Select "Copy URL" </li>
            <li>Come Back To The Admin Panel And Paste In The "Image URL" Area</li>
            <li>Select A Category</li>
            <li>Finally, Click On The "Save Image" Button Below</li>

          </ol>
        </div>
        {/* modal body */}
        <div className="modal-body-inputs">
          <div className="mb-3">
            <label htmlFor="imageURL" className="form-label image-url">
              Image URL:
            </label>
            <input
              type="text"
              className="form-control"
              id="imageURL"
              placeholder="Paste image URL..."
              autoComplete="off"
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select name="" id="category" className="form-select" onChange={(e) => setCategory(e.target.value)}>
              <option value="interior design">Interior Design</option>
              <option value="exterior design">Exterior Design</option>
              <option value="plumbing">Plumbing</option>
              <option value="electricity">Electricity</option>
              <option value="humidity treatment">Humidity Treatment</option>
              <option value="construction plans">Construction Plans</option>
            </select>
          </div>
        </div>
        {/* modal footer */}
        <div className="modal-footer-cancel-save">
          <button className="cancel btn" onClick={() => {
            setHideEverythingElse(false)
            setShowModal(false)
          } }>
            Cancel
          </button>
          <button className="save btn" onClick={saveImage}>
            Save image
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPicture;
