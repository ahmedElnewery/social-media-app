/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DispatchContext, StateContext } from "../../store/context";
import * as actionTypes from '../../store/action-types'
import ReactTooltip from 'react-tooltip';

const UserHeader = (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

    const handleSignOut =() =>{
        dispatch({type:actionTypes.LOGOUT})
    }
    const handleOpenSearch = (e) =>{
      e.preventDefault()
      dispatch({type:actionTypes.OPEN_SEARCH})
    }
    return ( 
        <div className="flex-row my-3 my-md-0">
          <ReactTooltip className="custom-tooltip" id="search"/>
          <a  onClick={handleOpenSearch} data-for="search" data-tip="Search" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"></i>
          </a>
          <ReactTooltip className="custom-tooltip" id="chat"/>

          <span onClick={()=>dispatch({type:actionTypes.TOGGLE_CHAT})}  data-for="chat" data-tip="Chat" className={"mr-2 header-chat-icon "+(state.unreadMessages ?" text-danger" : " text-white")}>
            <i className="fas fa-comment"></i>
            <span className="chat-count-badge text-white">{state.unreadMessages <10 ?  state.unreadMessages : "+9"}</span>
          </span>
          <ReactTooltip className="custom-tooltip" id="profile"/>

          <Link to={ `/profile/${state.userInfo.username}`} className="mr-2" data-for="profile" data-tip="Profile">
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