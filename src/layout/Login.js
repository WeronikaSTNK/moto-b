import React from "react";
import { MotorcyclesContext } from "../context";
import { useHistory } from "react-router-dom";
export const Login = () => {
  const { dispatch } = React.useContext(MotorcyclesContext);

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    //tutaj nie wiem co mam złapać XD nie umiem w resta, dej mnie coś. tu uderzam w api z innego tutoriala

    fetch("https://hookedbe.herokuapp.com/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        dispatch({
          type: "LOGIN",
          payload: resJson,
        });
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  return (
    <div className="iconsContainer">
      <div className="card">
        <div className="iconsContainer">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">
              Email Address
              <input
                type="text"
                value={data.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>
            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}
            <button className="moreInfoBtn" disabled={data.isSubmitting}>
              {data.isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
