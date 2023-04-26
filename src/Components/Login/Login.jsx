import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import image2 from "../../assets/images/logo (1).png";
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
        console.log(values);
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
    <div className="row ">
      <div className="col-6 d-none  d-lg-block register-bg-img "></div>
      <div className="col-6 ">
        <div className=" w-75 text-center  mt-5 mx-auto">
          <img className="w-25" src={image2} />
          <h4 className="text-light">Log in to GameOver </h4>
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
              className="form-control mb-4 "
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
                className="btn mb-2 text-white form-control"
              >
                Login
              </button>
            )}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed et
              delectus saepe. Perspiciatis sed, eos tenetur quisquam rem nam
              accusamus.
            </p>
          </form>
          <hr />

          <Link to="">Forgot password?</Link>
          <br />
          <span className="text-light">Not a member yet </span>
          <Link to="">Create account &gt; </Link>
        </div>
      </div>
    </div>
  );
}
