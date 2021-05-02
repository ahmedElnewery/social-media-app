/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import {  useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Page from "../Components/Layout/Page";
import UserPosts from "../Components/Profile/UserPosts";
import axios from "axios";
import { StateContext } from "../store/context";
const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/s=128",
    isFollowing: false,
    counts: {
      postCount: 0,
      followerCount: 0,
      followingCount: 0,
    },
  });
  const { username } = useParams();
  const state = useContext(StateContext)

  useEffect(() => {
    const request = axios.CancelToken.source();
    async function getProfile() {
      try {
        const res = await axios.post(`/profile/${username}`, {token:state.userInfo.token},{
         
          cancelToken: request.token,
        });
        setProfileInfo(res.data);

      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
    return ()=>{
      request.cancel("user profile request was cancelled")
    }
  }, [username,state.userInfo.token]);
  return (
    <Page title={profileInfo.profileUsername}>
      <h2>
        <img className="avatar-small" src={profileInfo.profileAvatar} />{" "}
        {profileInfo.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileInfo.counts && profileInfo.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileInfo.counts && profileInfo.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileInfo.counts && profileInfo.counts.followingCount}
        </a>
      </div>

      <UserPosts username={username} />
    </Page>
  );
};

export default Profile;
