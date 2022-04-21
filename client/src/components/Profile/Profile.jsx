import React, { useState } from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const name = user ? user.result.name : '';
  const email = user? user.result.email : '';
  const [formData, setFormData] = useState({
    image: "",
    userId: localStorage.getItem('currentUserUniqueId'),
    name: name,
    email: email,
    role: "",
    department: "",
    extension: "",
    office: ""
  });
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Use a regex to remove data url part
      const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');

      console.log(base64String);
      setFormData({...formData, image: base64String});
      // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(fileUploaded);
  };

  const saveProfile = () => {
    console.log(formData);
  }

  const hidden = {
    display: 'none'
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container profile-page">
        <div className="profile-header">
          <div className="profile-picture">
            <div className="upload-picture flex-center">
              <i className="uil uil-camera" onClick={handleClick}></i>
              <input type="file" style={hidden} ref={hiddenFileInput} onChange={handleChange}></input>
            </div>
          </div>
          <div className="information-section">
            <div>
              <h2 className="profile-heading" >{name}</h2>
              <h5 className="profile-subheading">
                American University of Beirut
              </h5>
              <h5 className="profile-subheading">
                Beirut
                <i className="location-icon uil uil-map-marker"></i>
              </h5>
            </div>
            <div className="profile-stats">
              <div className="stat-card">
                <h4 className="stat-card-title">Active Classes</h4>
                <h1>4</h1>
              </div>
              <div className="stat-card">
                <h4 className="stat-card-title">Polls Administered</h4>
                <h1>5</h1>
              </div>
              <div className="stat-card">
                <h4 className="stat-card-title">Sheets Graded</h4>
                <h1>7</h1>
              </div>
              <div className="stat-card">
                <h4 className="stat-card-title">Students</h4>
                <h1>80</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-body">
          <div className="profile-sidebar">
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Role</h4>
              <h5 className="profile-subheading">{formData.role}</h5>
            </div>
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Department</h4>
              <h5 className="profile-subheading">{formData.department}</h5>
            </div>
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Email</h4>
              <h5 className="profile-subheading">{formData.email}</h5>
            </div>
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Extension</h4>
              <h5 className="profile-subheading">{formData.extension}</h5>
            </div>
            <div className="sidebar-row">
              <h4 className="sidebar-heading">Office</h4>
              <h5 className="profile-subheading">{formData.office}</h5>
            </div>
          </div>
          <div className="profile-form">
            <div className="profile-form-column">
              <div className="input-container">
                <label>Name</label>
                <input className="std-input" defaultValue={name} onChange={(e) => setFormData({...formData, name: e.target.value})}></input>
              </div>
              <div className="input-container">
                <label>Department</label>
                <input className="std-input" defaultValue={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}></input>
              </div>
              <div className="input-container">
                <label>Office</label>
                <input className="std-input" defaultValue={formData.office} onChange={(e) => setFormData({...formData, office: e.target.value})}></input>
              </div>
            </div>
            <div className="profile-form-column">
              <div className="input-container">
                <label>Role</label>
                <input className="std-input" defaultValue={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}></input>
              </div>
              <div className="input-container">
                <label>Extension</label>
                <input className="std-input" defaultValue={formData.extension} onChange={(e) => setFormData({...formData, extension: e.target.value})}></input>
              </div>
              <div className="input-container">
                <label style={{visibility:'hidden'}}>Save button</label>
                <button type="submit" className="form-button" onClick={saveProfile}>
                  Save profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
