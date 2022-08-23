import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
import Axios from "axios";
import hplogo1 from "../../images/hplogo1.PNG";
import hplogo from "../../images/hplogo.PNG";
import NewPicture from "../NewPicture/NewPicture";
import Edit from "../Edit/Edit";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [hideEverythingElse, setHideEverythingElse] = useState(false)
  const [imagesList, setImagesList] = useState([]);
  const [IsEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [editURL, setEditURL] = useState('')
  const [editCategory, setEditCategory] = useState('')

  // GET ALL IMAGES FROM DATABASE AND SET THEM IN IMAGELIST STATE
  const getImages = () => {
    Axios.get("http://localhost:3001/images").then((result) =>
      setImagesList(result.data.reverse()) 
    );
  };

  // OPEN EDIT MODAL WITH ITEM ID
  const catchIDAndOpenEditModal = (item) => {
    setEditID(item.imageid)
    setEditURL(item.imageurl)
    setEditCategory(item.imagecategory)
    setIsEditing(true)
    setHideEverythingElse(true)
  }

  // DELETE FROM DATABASE
  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(console.log('Item deleted!'))
  }

  // LOAD EVERYTIME THE IMAGELIST STATE CHANGES
  useEffect(() => {
    getImages();
  }, [imagesList]);

  const logoutFromDashboard = () => {
    localStorage.clear()
    window.location.reload()
  }


  return (
    <div className="position-relative bg-white">
        {!hideEverythingElse && <div>
            <nav className="navbar navbar-light bg-white">
        <div className="container">
          <img src={hplogo1} alt="" className="lg-screen-logo"/>
          <img src={hplogo} alt="" className="sm-screen-logo"/>
          <button className="logout-btn btn" onClick={logoutFromDashboard}>Logout</button>
        </div>
      </nav>
      <div className=" p-5">
        <div className="new-input-btn container">

          <button
            className=" text-white"
            onClick={() => {
                setShowModal(true)
                setHideEverythingElse(true)
            } }
          >
            + New Picture
          </button>
          
        </div>
        <div className="table-container">
          <table className="table1">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Images</th>
                <th scope="col">Categories</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {imagesList.map((imageItem, key) => (
                <tr key={imageItem.imageid}>
                  <td id="id-td"><span>ID: </span>{key + 1}</td>
                  <td className="image-box">
                    <img
                      className="image-from-db"
                      src={imageItem.imageurl}
                      alt=""
                      // style={{ width: "100px", height: "80px" }}
                    />
                  </td>
                  <td style={{textTransform:'capitalize'}}><span>Category: </span> {imageItem.imagecategory}</td>
                  <td className="">
                    <button className="btn text-success fw-bold" onClick={() => catchIDAndOpenEditModal(imageItem)}>
                      Edit
                    </button>
                    <button className="btn text-danger fw-bold" onClick={() => deleteItem(imageItem.imageid)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
            </div>}
      
      {showModal && <NewPicture setShowModal={setShowModal} setHideEverythingElse={setHideEverythingElse}/>}
      {IsEditing && <Edit setIsEditing={setIsEditing} setHideEverythingElse={setHideEverythingElse} editID={editID} editCategory={editCategory} editURL={editURL}/>}
    </div>
  );
};

export default Dashboard;
