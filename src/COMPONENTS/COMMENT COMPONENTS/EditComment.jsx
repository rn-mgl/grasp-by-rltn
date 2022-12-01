import React from "react";
import axios from "axios";

// form components
import TextArea from "../FORM COMPONENTS/TextArea";
import SubmitButton from "../FORM COMPONENTS/SubmitButton";
import CancelButton from "../FORM COMPONENTS/CancelButton";

// global/functional components
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";

// utils components
import DropDownError from "../ERROR COMPONENTS/DropDownError";

export default function EditComment(props) {
  const [commentData, setCommentData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });

  const { class_id } = useParams();
  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");

  const baseUrl =
    props.type === "post_comments"
      ? `${url}/classes/${class_id}/comments/${props.post_id}`
      : `${url}/classes/${class_id}/tasks-comments/${props.post_id}`;

  const path_direction =
    props.type === "post_comments"
      ? `${baseUrl}/${props.comment_id}`
      : props.type === "public_comment"
      ? `${baseUrl}/public/${props.comment_id}`
      : `${baseUrl}/private/${props.comment_id}`;
  console.log(props.type);
  // get comment data function
  const fetchComment = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(path_direction, {
        headers: { Authorization: token },
      });
      if (data) {
        setCommentData(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
    setLoading(false);
  }, [token, path_direction]);

  // update comment function
  const updateComment = async (e) => {
    e.preventDefault();
    const { comment_text } = commentData;
    setLoading(true);
    try {
      const { data } = await axios.patch(
        path_direction,
        { comment_text },
        { headers: { Authorization: token } }
      );
      if (data) {
        props.fetchComments();
      }
      props.handleCommentToEdit(-1);
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
    setLoading(false);
  };

  // onchange comment data function
  const handleCommentData = ({ name, value }) => {
    setCommentData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  React.useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  return (
    <div className={`${loading && "opacity-70"} w-full h-full flex flex-col gap-3`}>
      <DropDownError error={error} setError={setError} />
      <div className="mr-auto px-2">
        <div className="font-Poppins font-medium text-md break-words">{`${commentData.user_name} ${commentData.user_surname}`}</div>
        <div className="font-Work font-light text-sm">{commentData.comment_created}</div>
      </div>
      <div className="custom-divider bg-pr-blk" />
      <form method="POST" className="custom-flex flex-col gap-5" onSubmit={(e) => updateComment(e)}>
        <TextArea
          placeholder={"Your Comment"}
          name={"comment_text"}
          value={commentData.comment_text}
          onChange={handleCommentData}
          rows={2}
        />
        <div
          className="custom-flex gap-5 justify-start w-full
                    tablet:w-72 tablet:items-start tablet:ml-auto"
        >
          <SubmitButton value="EDIT" />
          <CancelButton onClick={() => props.handleCommentToEdit(-1)} />
        </div>
      </form>
    </div>
  );
}
