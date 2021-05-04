/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useParams } from "react-router";
import Page from "../Components/Layout/Page";
import Spinner from "../Components/UI/Spinner/Spinner";
import ConvertToLocalDate from "../utiltes/datePipe";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { StateContext } from "../store/context";
import NotFound from "./NotFound";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";

const PostDetails = (props) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  const appState = useContext(StateContext);

  const { id } = useParams();
  useEffect(() => {
    const request = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(`/post/${id}`, {
        cancelToken: request.token,
      })
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return () => {
      request.cancel("post request was cancelled");
    };
  }, [id]);
  const deleteHandler = async () => {
    const isOk = window.confirm("do you want to delete");
    if (isOk) {
      try {
        const res = await axios.delete(`/post/${id}`, {
          data: { token: appState.userInfo.token },
        });
        if (res.data === "Success") {
          toast.success("deleted successfully");
          props.history.replace(`/profile/${appState.userInfo.username}`);
        }
      } catch (error) {}
    }
  };
  function isOwner() {
    if (
      appState.isLogin &&
      post.author &&
      appState.userInfo.username === post.author.username
    ) {
      return true;
    }
    return false;
  }
  if (!loading && !post) {
    return <NotFound />;
  }
  return loading ? (
    <Spinner />
  ) : (
    <Page title={`${post.title} | ${post.author && post.author.username}`}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner && (
          <>

            <span className="pt-2">
            <ReactTooltip className="custom-tooltip" id="edit" />
              <Link
                to={`/post/${id}/edit`}
                className="text-primary mr-2"
                title="Edit"
                data-tip="Edit"
                data-for="edit"
              >
                <i className="fas fa-edit"></i>
              </Link>
              <ReactTooltip className="custom-tooltip" id="delete" />
              <a
                onClick={deleteHandler}
                className="delete-post-button text-danger"
                title="Delete"
                data-tip="Delete"
                data-for="delete"
              >
                <i className="fas fa-trash"></i>
              </a>
            </span>
          </>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to="/">
          <img
            className="avatar-tiny"
            src={post.author && post.author.avatar}
            alt=""
          />
        </Link>
        Posted by <Link to="/">{post.author && post.author.username}</Link> on{" "}
        {ConvertToLocalDate(post.createdDate)}
      </p>

      <div className="body-content">
        <ReactMarkdown children={post.body} />
      </div>
    </Page>
  );
};

export default withRouter(PostDetails);
