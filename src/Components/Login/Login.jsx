import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login(props) {
  let { saveUserData } = props;
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("");
  let navigate = useNavigate();

  async function handleLogin(values) {
    setisLoading(true);

    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .catch((error) => {
        setisLoading(false);
        setmessageError(`${error.response.data.message}`);
      });

    if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      saveUserData();
      navigate("/home");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("passsword is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with Uppercase .. min 5.. max 10"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="w-75 mx-auto py-4">
      <h3>Login </h3>
      <form onSubmit={formik.handleSubmit}>
        {messageError ? (
          <div className="alert alert-danger">{messageError}</div>
        ) : null}

        <label htmlFor="email">User Email :</label>
        <input
          className="form-control mb-2 "
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="email"
          name="email"
          id="email"
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">User Password :</label>
        <input
          className="form-control mb-2 "
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger">{formik.errors.password}</div>
        ) : null}

        {isLoading ? (
          <button type="button" className="btn  text-white">
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn  text-white"
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
}
