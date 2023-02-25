import React from "react";
import axios from "axios";

// post components
import PostHeader from "../../COMPONENTS/POST COMPONENTS/PostHeader";
import PostBody from "../../COMPONENTS/POST COMPONENTS/PostBody";
import Comments from "../../COMPONENTS/COMMENT COMPONENTS/Comments";
import EditClassPost from "../POST COMPONENTS/EditClassPost";
import TaskPostPreview from "../TASKS COMPONENTS/TaskPostPreview";
import WritePost from "./WritePost";

// utils components
import DropDownError from "../ERROR COMPONENTS/DropDownError";
import MessagePage from "../ERROR COMPONENTS/MessagePage";

// global function components
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import * as head_fns from "../../FUNCTIONS/headerFunction";

export default function ClassPost(props) {
  const [activeHeader, setActiveHeader] = React.useState(-1);
  const [shownPostBody, setShownPostBody] = React.useState([]);
  const [postToEdit, setPostToEdit] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });
  const [posts, setPosts] = React.useState([]);

  const { class_id } = useParams();
  const token = localStorage.getItem("token");
  const { url } = useGlobalContext();
  const postPath = props.postType === "class" ? `classes/${class_id}/posts` : `home`;

  const fetchPosts = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/${postPath}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
    setLoading(false);
  }, [token, url, postPath]);

  //edit post
  const handleDeletePost = async (post_id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${url}/${postPath}/${post_id}`, {
        headers: { Authorization: token },
      });

      if (data) {
        fetchPosts();
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
    setLoading(false);
  };

  const handleShownPostBody = (id) => {
    setShownPostBody((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pId) => pId !== id);
      }
      return [...prev, id];
    });
  };

  const handlePostToEdit = (post_id) => {
    setPostToEdit(post_id);
  };

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <React.Fragment>
      <DropDownError error={error} setError={setError} />
      {props.classData?.class_is_ongoing === 0 ? undefined : (
        <WritePost
          writePostType={props.writePostType}
          class_id={props.class_id}
          fetchPage={fetchPosts}
        />
      )}

      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <div
              key={post.post_id}
              className={`custom-postbody ${
                post.post_type === "post" ? "bg-pr-wht" : "bg-pr-grn text-pr-wht"
              } ${loading && "blur-sm transition-all"} w-full`}
            >
              {postPath === "class"
                ? props.classData?.class_is_ongoing === 1 && postToEdit === post.post_id
                : postToEdit === post.post_id && (
                    <EditClassPost
                      post_id={post.post_id}
                      handlePostToEdit={() => handlePostToEdit(-1)}
                      fetchPage={fetchPosts}
                    />
                  )}

              {post.post_type === "task" && <TaskPostPreview post={post} />}

              {/* main topic, post body, post file */}
              {post.post_type === "post" && (
                <div className="flex flex-col gap-5">
                  <PostHeader
                    handleActiveHeader={() =>
                      head_fns.handleActiveHeader(post.post_id, setActiveHeader)
                    }
                    activeHeader={activeHeader}
                    post={post}
                    handlePostToEdit={() => handlePostToEdit(post.post_id)}
                    handleDeletePost={() => handleDeletePost(post.post_id)}
                  />

                  <PostBody
                    post={post}
                    shownPostBody={shownPostBody}
                    handleShownPostBody={handleShownPostBody}
                  />

                  {/* visible comments*/}
                  {props.from !== "admin" && (
                    <Comments
                      name="comment_text"
                      post_id={parseInt(post.post_id)}
                      post={post}
                      fetchPage={props.fetchPage}
                      classData={props.classData}
                      type="post_comments"
                      class_id={props.classData?.class_id}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <MessagePage
          header={"No Posts Yet"}
          body={"this is where posts will be displayed"}
          fetch={fetchPosts}
          footer={"Try To Get Posts"}
        />
      )}
    </React.Fragment>
  );
}
