import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { signup } from "../actions/auth";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const register = async (e) => {
    e.preventDefault();
    dispatch(signup(formData, navigate));
  };

  if (localStorage.getItem("profile") != null) {
    return <Navigate to="/Home"></Navigate>;
  }
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Register</h1>
            <h4 id="login-message">Welcome to the University Companion App</h4>
            <form onSubmit={register}>
              <div className="field-wrapper">
                <label for="email">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="First and last name"
                  id="registername"
                  className="login-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="field-wrapper">
                <label for="email">Email</label>
                <input
                  type="email"
                  name="registerEmail"
                  placeholder="mail@website.com"
                  id="registerEmail"
                  className="login-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="field-wrapper">
                <label for="password">Password</label>
                <input
                  type="password"
                  name="registerPassword"
                  placeholder="Minimum eight characters"
                  id="registerPassword"
                  className="login-input"
                  value={formData.password}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="field-wrapper">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="registerConfirmPassword"
                  placeholder="min. 8 characters"
                  id="registerConfirmPassword"
                  className="login-input"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div id="forgotpass-container">
                <a href="/">Already a user? Sign in</a>
              </div>
              <button className="form-button" type="submit">
                <h4>Register</h4>
              </button>
            </form>
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
