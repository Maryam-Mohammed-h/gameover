import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("");
  let navigate = useNavigate();

  async function handleRegister(values) {
    setisLoading(true);

    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((error) => {
        setisLoading(false);
        setmessageError(`${error.response.data.message}`);
      });

    if (data.message === "success") {
      setisLoading(false);
      navigate("/login");
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name min length is 3")
      .max(10, "name max number is 10"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("passsword is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with Uppercase .. min 5.. max 10"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Password and rePassword does not match"),
    phone: Yup.string()
      .required("name is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be valid egyption number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="w-75 mx-auto py-4">
      <h3>Register Form</h3>
      <form onSubmit={formik.handleSubmit}>
        {messageError ? (
          <div className="alert alert-danger">{messageError}</div>
        ) : null}

        <label htmlFor="name">User name :</label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2 "
          value={formik.values.name}
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="alert alert-danger">{formik.errors.name}</div>
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
        <label htmlFor="phone">User phone :</label>
        <input
          className="form-control mb-2 "
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          type="tel"
          name="phone"
          id="phone"
          onChange={formik.handleChange}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger">{formik.errors.phone}</div>
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
        <label htmlFor="rePassword">Re write your password :</label>
        <input
          className="form-control mb-2 "
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
          type="password"
          name="rePassword"
          id="rePassword"
          onChange={formik.handleChange}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div className="alert alert-danger">{formik.errors.rePassword}</div>
        ) : null}
        {isLoading ? (
          <button type="button" className="btn bg-main text-white">
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white"
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
}
