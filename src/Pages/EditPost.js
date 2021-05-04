/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import {  useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Page from "../Components/Layout/Page";
import Spinner from "../Components/UI/Spinner/Spinner";
import { StateContext } from "../store/context";
import NotFound from "./NotFound";
// import * as actionTypes from "./../store/action-types";
const EditPost = (props) => {
  const appState = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

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
    setLoading(true);

    const req = axios.CancelToken.source();
    axios
      .get(`/post/${id}`, { cancelToken: req.token })
      .then((res) => {
        if (
          !appState.userInfo &&
          res.data.author.username !== appState.userInfo
        ) {
          toast.error("you are not authorized to edited this post");
          props.history.push("/");
        }
        const { title, body } = res.data;
        if (res && !res.data) {
          setNotFound(true);
        }
        formik.setValues({ ...formik.values, title, body });
        setLoading(false);
      })
      .catch((ex) => {
        setLoading(false);
        if (ex.response && ex.response.data) setError(ex.response.data);
      });
    return () => {
      req.cancel();
    };
  }, [id]);
  if (notFound) {
    return <NotFound />;
  }
  return loading ? (
    <Spinner />
  ) : (
    <Page title="Create New Post">
      <div className="mb-5">
        <Link to={`/post/${id}`}> &laquo; back</Link>
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
