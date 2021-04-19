import { useFormik } from "formik";
import { withRouter } from "react-router";
import * as Yup from "yup";
import * as authServices from "./../../services/auth";
const Signup = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
        username: Yup.string()
        .trim()
        .min(3, "Must be 3 characters or more")
        .max(30, "Username cannot exceed 30 characters.")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .trim()
        .min(12, "Must be 12 characters or more")
        .max(50, "Must be 50 characters or less")
        .required("Required"),
    }),
    onSubmit: async ({ username, email, password }) => {
      try {
        const res = await authServices.register({ username, email, password });
        formik.setErrors(formik.initialErrors)
        formik.setTouched(formik.initialTouched)
        formik.setValues(formik.initialValues)
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        props.setIsLogin(true)

        props.history.push("/")
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="username-register" className="text-muted mb-1">
          <small>Username</small>
        </label>
        <input
          id="username-register"
          name="username"
          className="form-control"
          type="text"
          placeholder="Pick a username"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <small className="form-text text-danger">
          {formik.touched.username && formik.errors.username
            ? formik.errors.username
            : null}
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="email-register" className="text-muted mb-1">
          <small>Email</small>
        </label>
        <input
          id="email-register"
          name="email"
          className="form-control"
          type="text"
          placeholder="you@example.com"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <small className="form-text text-danger">
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null}
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="password-register" className="text-muted mb-1">
          <small>Password</small>
        </label>
        <input
          id="password-register"
          name="password"
          className="form-control"
          type="password"
          placeholder="Create a password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <small className="form-text text-danger">
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </small>
      </div>
      <button
        type="submit"
        className="py-3 mt-4 btn btn-lg btn-success btn-block"
        disabled={
          (formik.touched.username && formik.errors.username) ||
          (formik.touched.email && formik.errors.email) ||
          (formik.touched.password && formik.errors.password)
        }
      >
        Sign up for ComplexApp
      </button>
    </form>
  );
};

export default withRouter(Signup) ;
