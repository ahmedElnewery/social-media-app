import { useEffect, useState } from "react";

import Spinner from "../UI/Spinner/Spinner";
import axios from "axios";
import Post from "../Shared/Post";

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
      { posts.length === 0 ? (
        <div>there is no posts</div>
      ) : (
        <div className="list-group">
          {posts.map((post) => {
            return (
              <Post post ={post} key={post._id} hasNoAuther={true}/>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserPosts;
