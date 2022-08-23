import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./edit.css";
import { useState } from "react";
import Axios from "axios";

const Edit = ({ setIsEditing, setHideEverythingElse, editID, editURL, editCategory }) => {
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");


  const updateImage = (id) => {
    if(imageURL === "" && category === "") {
      return false
    }
    Axios.put("http://localhost:3001/update", {
      id: id,
      imageURL: imageURL,
      category: category
    }).then(console.log('Data updated'))

    setIsEditing(false)
    setHideEverythingElse(false)

  }
  
  return (
    <div className="edit-back-container">
      <div className="container edit-front-container">
        {/* modal head */}
        <div className="modal-head-title">
          <h3>Edit Image with ID: {editID}</h3>
        </div>
        {/* modal body */}
        <div className="modal-body-inputs">
          <div className="mb-3">
            <label for="imageURL" className="form-label image-url">
              Image URL:
            </label>
            <input
              type="text"
              className="form-control"
              id="imageURL"
              placeholder="Paste new image URL here..."
              autoComplete="off"
              onChange={(e) => setImageURL(e.target.value)}
              // defaultValue={editURL}
            />
          </div>

<div className="mb-3">
            <label for="category" className="form-label">
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
            setIsEditing(false)
          } }>
            Cancel
          </button>
          <button className="save btn" onClick={() => updateImage(editID)}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
