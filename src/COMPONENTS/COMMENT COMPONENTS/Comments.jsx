import React from "react";
import axios from "axios";
import CommentBar from "./CommentBar";
import DropDownError from "../ERROR COMPONENTS/DropDownError";
import PostIcons from "../POST COMPONENTS/PostIcons";
import InputComment from "./InputComment";
import * as fns from "../../FUNCTIONS/commentFunctions";
import { useGlobalContext } from "../../context";

export default function Comments(props) {
  const [comments, setComments] = React.useState([]);
  const [uniqueComments, setUniqueComments] = React.useState([]);
  const [shownComments, setShownComments] = React.useState([]);
  const [error, setError] = React.useState({ active: false, message: "" });
  const [activeCommentHeader, setActiveCommentHeader] = React.useState(-1);
  const [commentToEdit, setCommentToEdit] = React.useState(-1);
  const [commentData, setCommentData] = React.useState({
    [props.name]: "",
    postId: -1,
  });

  const { url } = useGlobalContext();
  const user = parseInt(localStorage.getItem("curr"));
  const token = localStorage.getItem("token");
  const baseUrl = `${url}/classes/${props.class_id}`;

  const commentPath =
    props.type === "private_comment"
      ? `tasks-comments/${props.post_id}/private`
      : props.type === "public_comment"
      ? `tasks-comments/${props.post_id}/public`
      : `comments/${props.post_id}`;

  const commentEnd =
    props.post?.class_handler === user ? props.post?.user_id : props.post?.class_handler;

  const fetchComments = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/${commentPath}`, {
        params: props.type === "private_comment" && { comment_to: commentEnd },
        headers: { Authorization: token },
      });

      if (data) {
        setComments(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [token, baseUrl, commentPath, props.type, commentEnd]);

  const handleDeleteComment = async (comment_id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/${commentPath}/${comment_id}`, {
        headers: { Authorization: token },
      });
      if (data) {
        fetchComments();
      }
    } catch (error) {
      console.log(error);
      setCommentData((prev) => {
        return { ...prev, [props.name]: "", postId: -1 };
      });
      setError({ active: true, message: error });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const comment_text = commentData[props.name];
    if (comment_text !== "" && comment_text.trim() !== "") {
      try {
        const { data } = await axios.post(
          `${baseUrl}/${commentPath}`,
          {
            comment_text,
            comment_to: commentEnd,
          },
          { headers: { Authorization: token } }
        );
        if (data) {
          fetchComments();
        }
        setCommentData((prev) => {
          return { ...prev, [props.name]: "", postId: -1 };
        });
      } catch (error) {
        console.log(error);
        setError({ active: true, message: error });
      }
    } else {
      setError({ active: true, message: "Enter content before sending comment." });
    }
  };

  const handleActiveCommentHeader = (id) => {
    setActiveCommentHeader((prev) => (prev !== id ? id : -1));
  };

  const handleCommentToEdit = (id) => {
    setCommentToEdit((prev) => (prev !== id ? id : -1));
  };

  const handleUniqueComments = React.useCallback(() => {
    fns.handleUniqueComments(comments, setUniqueComments);
  }, [comments]);

  React.useEffect(() => {
    handleUniqueComments();
  }, [handleUniqueComments]);

  React.useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <DropDownError error={error} setError={setError} />

      <PostIcons
        handleCommentIcon={() => fns.handleCommentIcon(parseInt(props.post_id), setShownComments)}
      />
      {props.post?.class_is_ongoing === 0 || props.classData?.class_is_ongoing === 0 ? undefined : (
        <InputComment
          name={props.name}
          value={props.post?.post_id === commentData.postId ? commentData[props.name] : ""}
          handleSendComment={(e) => sendComment(e)}
          handleCommentData={(e) =>
            fns.handleCommentData(setCommentData, e.target, props.post?.post_id)
          }
        />
      )}

      <div className="custom-flex gap-3 font-Work">
        <div>Comments</div>
        <div className="custom-divider" />
      </div>
      {shownComments.includes(props.post_id)
        ? comments.map((com) => {
            return (
              <CommentBar
                key={com.comment_id}
                activeCommentHeader={activeCommentHeader}
                handleActiveCommentHeader={handleActiveCommentHeader}
                commentToEdit={commentToEdit}
                handleCommentToEdit={handleCommentToEdit}
                handleDeleteComment={() => handleDeleteComment(com.comment_id)}
                commentData={com}
                fetchComments={fetchComments}
                post_id={props.post_id}
                type={props.type}
              />
            );
          })
        : uniqueComments.map((com) => {
            return (
              <CommentBar
                key={com.comment_id}
                activeCommentHeader={activeCommentHeader}
                commentToEdit={commentToEdit}
                handleCommentToEdit={handleCommentToEdit}
                handleActiveCommentHeader={handleActiveCommentHeader}
                handleDeleteComment={() => handleDeleteComment(com.comment_id)}
                commentData={com}
                fetchComments={fetchComments}
                post_id={props.post_id}
                type={props.type}
              />
            );
          })}
    </div>
  );
}
