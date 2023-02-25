export const fetchPosts = async (axios, url, class_id, token, setPosts, setError) => {
  try {
    const { data } = await axios.get(`${url}/classes/${class_id}/posts`, {
      headers: { Authorization: token },
    });
    if (data) {
      setPosts(data);
    }
  } catch (error) {
    console.log(error);
    setError({ active: true, message: error });
  }
};
