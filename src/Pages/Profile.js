/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import { useContext, useEffect } from "react";
import { Route, Switch, useParams } from "react-router";
import Page from "../Components/Layout/Page";
import UserPosts from "../Components/Profile/UserPosts";
import axios from "axios";
import { StateContext } from "../store/context";
import { useImmer } from "use-immer";
import { NavLink } from "react-router-dom";
import ProfileFollowers from "../Components/Profile/ProfileFollowers";
import ProfileFollowing from "../Components/Profile/ProfileFollowing";
const Profile = () => {
  const [state, setState] = useImmer({
    followingCount: 0,
    stopFollowingCount:0,
    followingLoading:false,
    profileInfo: {
      profileUsername: "...",
      profileAvatar: "https://gravatar.com/avatar/s=128",
      isFollowing: false,
      counts: {
        postCount: 0,
        followerCount: 0,
        followingCount: 0,
      },
    },
  });
  const { username } = useParams();
  const appState = useContext(StateContext);

  useEffect(() => {
    const request = axios.CancelToken.source();
    async function getProfile() {
      try {
        const res = await axios.post(
          `/profile/${username}`,
          { token: appState.userInfo.token },
          {
            cancelToken: request.token,
          }
        );
        setState((draft) => {
          draft.profileInfo = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
    return () => {
      request.cancel("user profile request was cancelled");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
   if(state.followingCount){
     setState(draft=>{
      draft.followingLoading =true
     })
    const request = axios.CancelToken.source();
    async function following() {
      try {
        await axios.post(
          `/addFollow/${state.profileInfo.profileUsername}`,
          { token: appState.userInfo.token },
          {
            cancelToken: request.token,
          }
        );
        setState((draft) => {
          draft.profileInfo.isFollowing = true;
          draft.profileInfo.counts.followerCount++
          
            draft.followingLoading =false
 
        });
      } catch (error) {
        console.log(error);
      }
    }
    following();
    return () => {
      request.cancel("user profile request was cancelled");
    };
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.followingCount]);
  useEffect(() => {
    if(state.stopFollowingCount){
      setState(draft=>{
       draft.followingLoading =true
      })
     const request = axios.CancelToken.source();
     async function following() {
       try {
         await axios.post(
           `/removeFollow/${state.profileInfo.profileUsername}`,
           { token: appState.userInfo.token },
           {
             cancelToken: request.token,
           }
         );
         setState((draft) => {
           draft.profileInfo.isFollowing = false;
           draft.profileInfo.counts.followerCount--
           
             draft.followingLoading =false
  
         });
       } catch (error) {
         console.log(error);
       }
     }
     following();
     return () => {
       request.cancel("user profile request was cancelled");
     };
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.stopFollowingCount]);
  const startFollowing = () => {
    setState((darft) => {
      darft.followingCount++
    });
  };
  const stopFollowing = () => {
    setState((darft) => {
      darft.stopFollowingCount--
    });
  };
  return (
    <Page title={state.profileInfo.profileUsername}>
      <h2>
        <img className="avatar-small" src={state.profileInfo.profileAvatar} />{" "}
        {state.profileInfo.profileUsername}
        {appState.isLogin &&
          !state.profileInfo.isFollowing &&
          state.profileInfo.profileUsername !== "..." &&
          appState.userInfo.username !== state.profileInfo.profileUsername && (
            <button
              onClick={startFollowing}
              className="btn btn-primary btn-sm ml-2"
              disabled={state.followingLoading}
            >
              Follow <i className="fas fa-user-plus"></i>
            </button>
          )}
          {appState.isLogin &&
          state.profileInfo.isFollowing &&
          state.profileInfo.profileUsername !== "..." &&
          appState.userInfo.username !== state.profileInfo.profileUsername && (
            <button
              onClick={stopFollowing}
              className="btn btn-danger btn-sm ml-2"
              disabled={state.followingLoading}
            >
              Unfollow <i className="fas fa-user-times"></i>
            </button>
          )}
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <NavLink to={`/profile/${state.profileInfo.profileUsername}`} className=" nav-item nav-link">
          Posts:{" "}
          {state.profileInfo.counts && state.profileInfo.counts.postCount}
        </NavLink>
        <NavLink to={`/profile/${state.profileInfo.profileUsername}/followers`} className="nav-item nav-link">
          Followers:{" "}
          {state.profileInfo.counts && state.profileInfo.counts.followerCount}
        </NavLink>
        <NavLink to={`/profile/${state.profileInfo.profileUsername}/following`} className="nav-item nav-link">
          Following:{" "}
          {state.profileInfo.counts && state.profileInfo.counts.followingCount}
        </NavLink>
      </div>
        <Switch>
          <Route exact path='/profile/:username'>
           <UserPosts username={username} />
          </Route>
          <Route path='/profile/:username/followers'>
            <ProfileFollowers/>
          </Route>
          <Route path='/profile/:username/following'>
            <ProfileFollowing/>
          </Route>
        </Switch>
    </Page>
  );
};

export default Profile;
