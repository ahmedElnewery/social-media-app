import { Link } from "react-router-dom";
import convertToLocalDate from "../../utiltes/datePipe";

const Post = (props) => {
    const post = props.post
    return ( 
        <Link
                to={`/post/${post._id}`}
                className="list-group-item list-group-item-action"
                onClick={props.onClick}
              >
                <img className="avatar-tiny" src={post.author.avatar} alt="" />
                <strong>{post.title}</strong> 
                {!props.hasNoAuther &&<span className="ml-2 text-muted ">
                  by{" "}
                 <strong >{post.author.username}</strong> 
                </span>}
                <span className="ml-2 text-muted small">
                  on{" "}
                  {convertToLocalDate(post.createdDate)}
                </span>
              </Link>
     );
}
 
export default Post;