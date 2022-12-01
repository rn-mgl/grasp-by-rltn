import React from "react";

// home components
import Post from "../COMPONENTS/GLOBAL COMPONENTS/Post";

// utils components
import DropDownError from "../COMPONENTS/ERROR COMPONENTS/DropDownError";

export default function Home() {
  const [error, setError] = React.useState({ active: false, message: "" });

  return (
    <div
      className="custom-flex flex-col w-full p-2 mx-auto items-center gap-5 mb-5 my-10 
                  tablet:w-10/12 
                  4k:mt-10"
    >
      {error && <DropDownError error={error} setError={setError} />}

      <Post from={"admin"} writePostType={"admin"} postType={"post"} />
    </div>
  );
}
