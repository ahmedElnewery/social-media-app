import { useFormik } from "formik";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Page from "../Components/Layout/Page";
// import * as actionTypes from "./../store/action-types";
import * as postServices from './../services/post'
const CreatePost = (props) => {
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
        const res = await postServices.addPost({ title, body,token:JSON.parse(localStorage.getItem("userInfo")).token});
        toast.success("Post Added Successfully")
        props.history.push(`/post/${res.data}`)
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });



  return (
    <Page title="Create New Post">
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
          />
          <small className="form-text text-danger">
          {formik.touched.title && formik.errors.title
            ? formik.errors.title
            : null}
        </small>
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
          ></textarea>
          <small className="form-text text-danger">
          {formik.touched.body && formik.errors.body
            ? formik.errors.body
            : null}
        </small>
        </div>

        <button type="submit" className="btn btn-primary" disabled={
            !formik.values.title || (formik.touched.title && formik.errors.title)
            || ( !formik.values.body || (formik.touched.body && formik.errors.body)) 
        } >Save New Post</button>
      </form>
    </Page>
  );
};

export default withRouter(CreatePost);
