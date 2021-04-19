import { useFormik } from "formik";
import { withRouter } from "react-router";
import * as Yup from "yup";
import * as authServices from "./../../services/auth";
const Login = (props) => {
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
          console.log(username ,password);
        const res = await authServices.login({ username, password });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        formik.resetForm()

        props.setIsLogin(true)

        props.history.push("/")
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
