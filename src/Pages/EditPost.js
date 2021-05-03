import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Page from "../Components/Layout/Page";
import { StateContext } from "../store/context";
// import * as actionTypes from "./../store/action-types";
const EditPost = (props) => {
  const appState = useContext(StateContext);
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .min(3, "Must be 3 characters or more")
        .max(50, "it's too long title")
        .required("Required"),
      body: Yup.string().trim().min(3, "it's too short").required("Required"),
    }),
    onSubmit: async ({ title, body }) => {
      try {
        await axios.post(`/post/${id}/edit`, {
          title,
          body,
          token: appState.userInfo.token,
        });
        toast.success("edited successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    console.log("title:", formik.values.title);
    const req = axios.CancelToken.source();
    axios
      .get(`/post/${id}`, { cancelToken: req.token })
      .then((res) => {
        const { title, body } = res.data;
        formik.setValues({ ...formik.values, title, body });
      })
      .catch();
    return () => {
      req.cancel();
    };
  }, [id]);
  return (
    <Page title="Create New Post">
      <div className="mb-5">
      <Link to={`/post/${id}`}>{"<< "}back</Link>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="alert alert-danger liveValidateMessage small">
              {formik.errors.title}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.body}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.body && formik.errors.body ? (
            <div className="alert alert-danger liveValidateMessage small">
              {formik.errors.body}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            (formik.touched.title && formik.errors.title) ||
            (formik.touched.body && formik.errors.body) ||
            formik.isSubmitting
          }
        >
          {formik.isSubmitting ? (
            <>
              {" "}
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Loading...</span>
            </>
          ) : null}{" "}
          update
        </button>
      </form>
    </Page>
  );
};

export default withRouter(EditPost);
