import { useContext } from "react";
import { Link } from "react-router-dom";
import { DispatchContext, StateContext } from "../../store/context";
import * as actionTypes from '../../store/action-types'
const UserHeader = (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

    const handleSignOut =() =>{
        dispatch({type:actionTypes.logout})
    }
    return ( 
        <div className="flex-row my-3 my-md-0">
          <Link to="/" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"></i>
          </Link>
          <span className="mr-2 header-chat-icon text-white">
            <i className="fas fa-comment"></i>
            <span className="chat-count-badge text-white"> </span>
          </span>
          <Link to="/" className="mr-2">
            <img className="small-header-avatar" src={state.userInfo.avatar} alt={state.userInfo.username}/>
          </Link>
          <Link className="btn btn-sm btn-success mr-2" to="/create-post">
            Create Post
          </Link>
          <button className="btn btn-sm btn-secondary" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
     );
}
 
export default UserHeader;