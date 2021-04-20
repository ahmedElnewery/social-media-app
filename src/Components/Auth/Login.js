import { useFormik } from "formik";
import { useContext } from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { DispatchContext } from "../../store/context";
import * as authServices from "./../../services/auth";
import * as actionTypes from './../../store/action-types'
const Login = (props) => {

const dispatch = useContext(DispatchContext)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(3, "Must be 3 characters or more")
        .max(30, "Username cannot exceed 30 characters.")
        .required("Required"),
      password: Yup.string()
        .trim()
        .min(12, "Must be 12 characters or more")
        .max(50, "Must be 50 characters or less")
        .required("Required"),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const res = await authServices.login({ username, password });
        dispatch({type:actionTypes.login, payload:res.data})
        toast.success("login Successfully")
        formik.resetForm()
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form className="mb-0 pt-2 pt-md-0" onSubmit={formik.handleSubmit}>
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.username}
          />

   
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className="col-md-auto">
          <button type="submit" className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
};

export default withRouter(Login);
