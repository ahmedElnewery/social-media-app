import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useImmer } from "use-immer";
import { DispatchContext, StateContext } from "../../store/context";
import * as actionTypes from "./../../store/action-types";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef(null)
  const appState = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const chatInput = useRef(null);
  const chatLog = useRef(null);

  const [state, setState] = useImmer({
    messageValue: "",
    messages: [],
  });
  useEffect(() => {
    if (appState.isChatOpen) {
      chatInput.current.focus();
      dispatch({ type: actionTypes.RESET_UNREAD_MESSAGES });
    }
  }, [appState.isChatOpen]);

  useEffect(() => {
    socket.current =io("http://localhost:8080/");
    socket.current.on("chatFromServer", (message) => {
      setState((draft) => {
        draft.messages.push(message);
      });
    });
    return ()=>socket.current.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    chatLog.current.scrollTop = chatLog.current.scrollHeight;
    if (!appState.isChatOpen && state.messages.length) {
      dispatch({ type: actionTypes.INCREMENT_UNREAD_MESSAGES });
    }
  }, [state.messages]);

  const handleChange = (e) => {
    const value = e.target.value;
    setState((draft) => {
      draft.messageValue = value;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.messageValue.trim()) {
      socket.current.emit("chatFromBrowser", {
        message: state.messageValue,
        token: appState.userInfo.token,
      });
      setState((draft) => {
        draft.messages.push({
          message: draft.messageValue,
          username: appState.userInfo.username,
          avatar: appState.userInfo.avatar,
        });

        draft.messageValue = "";
      });
    }
  };
  return (
    <div
      id="chat-wrapper"
      className={
        "chat-wrapper  shadow border-top border-left border-right " +
        (appState.isChatOpen ? " chat-wrapper--is-visible" : "")
      }
    >
      <div className="chat-title-bar bg-primary">
        Chat
        <span
          className="chat-title-bar-close"
          onClick={() => dispatch({ type: actionTypes.CLOSE_CHAT })}
        >
          <i className="fas fa-times-circle"></i>
        </span>
      </div>
      <div id="chat" className="chat-log" ref={chatLog}>
        {state.messages.map((message, i) =>
          message.username === appState.userInfo.username ? (
            <div key={i} className="chat-self">
              <div className="chat-message">
                <div className="chat-message-inner">{message.message}</div>
              </div>
              <img
                className="chat-avatar avatar-tiny"
                src={message.avatar}
                alt=""
              />
            </div>
          ) : (
            <div className="chat-other" key={i}>
              <Link to={`/profile/${appState.userInfo.username}`}>
                <img className="avatar-tiny" src={message.avatar} alt="" />
              </Link>
              <div className="chat-message">
                <div className="chat-message-inner">
                  <Link to={`/profile/${message.username}`}>
                    <strong>{message.username}:</strong>
                  </Link>
                  {message.message}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <form
        id="chatForm"
        className="chat-form border-top"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="chat-field"
          id="chatField"
          placeholder="Type a message…"
          autoComplete="off"
          ref={chatInput}
          onChange={handleChange}
          value={state.messageValue}
        />
      </form>
    </div>
  );
};

export default Chat;
