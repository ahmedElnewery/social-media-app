import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import convertToLocalDate from "../../utiltes/datePipe";
import Spinner from "../UI/Spinner/Spinner";
import axios from "axios";

const UserPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  const  request = axios.CancelToken.source();
   axios.get(`/profile/${props.username}/posts`, {
    cancelToken: request.token})
      .then((res) => {

        setPosts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      return ()=>{
        request.cancel("user posts request was cancelled")
      }
  }, [props.username]);
  if (loading) return <Spinner />;
  return (
    <>
      {posts.length === 0 ? (
        <div>there is no posts</div>
      ) : (
        <div className="list-group">
          {posts.map((post) => {
            return (
              <Link
                to={`/post/${post._id}`}
                className="list-group-item list-group-item-action"
                key={post._id}
              >
                <img className="avatar-tiny" src={post.author.avatar} alt="" />
                <strong>{post.title}</strong> 
                <span className="ml-3 text-muted small">
                  on{" "}
                  {convertToLocalDate(post.createdDate)}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserPosts;
