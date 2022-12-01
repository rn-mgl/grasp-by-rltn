export const handleSendComment = async (
  e,
  setCommentData,
  setShownComments,
  fetch,
  commentData,
  class_id,
  url,
  axios,
  token
) => {
  e.preventDefault();
  const { public_comment_text: comment_text, postId } = commentData;
  try {
    const { data } = await axios.post(
      `${url}/classes/${class_id}/comments/${postId}`,
      { comment_text },
      { headers: { Authorization: token } }
    );
    if (data) {
      setCommentData({ postId: -1, public_comment_text: "" });
      e.target.comment.value = "";
      setShownComments((prev) => (prev.includes(data.insertId) ? prev : [...prev, data.insertId]));
      fetch();
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export const sendTaskComment = async (
  e,
  commentData,
  setCommentData,
  fetch,
  axios,
  url,
  class_id,
  token
) => {
  e.preventDefault();
  const { comment_text, is_private, postId } = commentData;
  try {
    const { data } = await axios.post(
      `${url}/classes/${class_id}/tasks-comments/${postId}`,
      {
        comment_text,
        is_private,
      },
      { headers: { Authorization: token } }
    );
    if (data) {
      fetch();
      setCommentData((prev) => {
        return { ...prev, comment_text: "", postId: -1 };
      });
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export const handleCommentData = (setCommentData, { name, value }, post_id) => {
  setCommentData((prev) => {
    return {
      ...prev,
      postId: post_id,
      [name]: value,
    };
  });
};

export const handleCommentIcon = (id, setShownComments) => {
  setShownComments((prev) => {
    if (prev.includes(id)) {
      return prev.filter((pId) => pId !== id);
    }
    return [...prev, id];
  });
};

export const handleUniqueComments = (comments, setUniqueComments) => {
  let uniqueComs = [];
  let included = [];

  comments.forEach((comm) => {
    const post_id = comm.post_id;
    if (!included.includes(post_id)) {
      uniqueComs.push(comm);
      included.push(post_id);
    }
  });
  setUniqueComments(uniqueComs);
};
