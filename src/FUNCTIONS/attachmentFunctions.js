export const handleFileSelection = (e, setSelectedFile) => {
  if (!e.target.files || e.target.files.length === 0) {
    setSelectedFile({ fileName: undefined, fileUrl: undefined, isImage: false });
    return;
  }
  const fileName = e.target.files[0].name;
  const fileUrl = URL.createObjectURL(e.target.files[0]);
  const isImage = e.target.files[0].type.split("/")[0] === "image";

  setSelectedFile({ fileName, fileUrl, isImage });
};

export const fileUpload = async (file, axios, url, token) => {
  let postFile = "";
  const fileData = file;

  if (fileData.size > 10000000) {
    return "Error: File size too large. Use 10MB and below";
  } else {
    const formData = new FormData();
    formData.append("file", fileData);

    try {
      const {
        data: {
          file: { src },
        },
      } = await axios.post(`${url}/grasp-by-rltn/file-upload`, formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      postFile = src;
      return postFile;
    } catch (error) {
      postFile = undefined;
      console.log(error);
      return `Error: ${error.message}`;
    }
  }
};

export const handleRemoveFile = (setSelectedFile) => {
  setSelectedFile({ fileName: undefined, fileUrl: undefined, isImage: false });
};
