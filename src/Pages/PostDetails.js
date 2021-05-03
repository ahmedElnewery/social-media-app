import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useParams } from "react-router";
import Page from "../Components/Layout/Page";
import Spinner from "../Components/UI/Spinner/Spinner";
import ConvertToLocalDate from "../utiltes/datePipe";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { StateContext } from "../store/context";

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
  function isOwner() {
    if(appState.isLogin &&
      post.author&&
        appState.userInfo.username === post.author.username ){
          return true
        }
    return false
  }
      
  return loading ? (
    <Spinner />
  ) : (
    <Page title={`${post.title} | ${post.author && post.author.username}`}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner && (
            <span className="pt-2">
              <Link
                to={`/post/${id}/edit`}
                className="text-primary mr-2"
                title="Edit"
              >
                <i className="fas fa-edit"></i>
              </Link>
              <Link
                to="/"
                className="delete-post-button text-danger"
                title="Delete"
              >
                <i className="fas fa-trash"></i>
              </Link>
            </span>
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