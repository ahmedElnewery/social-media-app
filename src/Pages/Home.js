import { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import Page from "../Components/Layout/Page";
import { StateContext } from "../store/context";
import axios from "axios";
import Post from "../Components/Shared/Post";
import Spinner from "../Components/UI/Spinner/Spinner";
const Home = () => {
  const appState = useContext(StateContext);
  const [state, setState] = useImmer({
    feed: [],
    loading: true,
  });
  useEffect(() => {
    const req = axios.CancelToken.source();
    async function getPosts() {
     
      const res = await axios.post(
        "/getHomeFeed",
        { token: appState.userInfo.token },
        { cancelToken: req.token }
      );
      setState((draft)=>{
        draft.feed = res.data;
        draft.loading = false
      })
    }
    getPosts()
    return () => {
      req.cancel("user posts request was cancelled");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (state.loading) return <Spinner/>
  return (
    <Page title={appState.userInfo.username}>
      {!state.loading && state.feed.length === 0 && (
        <>
          <h2 className="text-center">
            Hello <strong>{appState.userInfo.username}</strong>, your feed is
            empty.
          </h2>
          <p className="lead text-muted text-center">
            Your feed displays the latest posts from the people you follow. If
            you don&rsquo;t have any friends to follow that&rsquo;s okay; you
            can use the &ldquo;Search&rdquo; feature in the top menu bar to find
            content written by people with similar interests and then follow
            them.
          </p>
        </>
      )}
      {state.feed.length > 0 && (
        <div className=" mb-4">
          <h2 className="text-center mb-4">The lastest posts:</h2>
          <div className="list-group">
            {state.feed.map((post) => (
              <Post post={post} key={post._id}/>
            ))}
          </div>
        </div>
      )}
    </Page>
  );
};

export default Home;
