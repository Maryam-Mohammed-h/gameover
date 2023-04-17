import React from "react";
import { useFormik } from "formik";

export default function Register() {
  function handleRegister(values) {
    console.log({ values });
  }
  function validate(values) {
    let errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3) {
      errors.name = "Name should be more than 3 charcters";
    } else if (values.name.length > 10) {
      errors.name = "Name max length is 10";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!/^[A-Z][a-z0-9]{5,10}$/.test(values.password)) {
      errors.password = "Password must start with Uppercase .. min 5.. max 10";
    }
    if (!values.rePassword) {
      errors.rePassword = "re password is required";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "repassword should match password";
    }
    if (!values.phone) {
      errors.phone = "Phone is required";
    } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
      errors.phone = "phone must be egyption number";
    }
    return errors;
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validate,
    onSubmit: handleRegister,
  });

  return (
    <div className="w-75 mx-auto py-4">
      <h3>Register Form</h3>
      <form onSubmit={formik.handleSubmit}>
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
        <label htmlFor="repassword">Re write your password :</label>
        <input
          className="form-control mb-2 "
          onBlur={formik.handleBlur}
          value={formik.values.repassword}
          type="password"
          name="repassword"
          id="repassword"
          onChange={formik.handleChange}
        />
        {formik.errors.repassword && formik.touched.repassword ? (
          <div className="alert alert-danger">{formik.errors.repassword}</div>
        ) : null}

        <button type="submit" className="btn bg-main text-white">
          Register
        </button>
      </form>
    </div>
  );
}
