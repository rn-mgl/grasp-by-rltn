import React from "react";
import { AiOutlineSend } from "react-icons/ai";

export default function InputComment(props) {
  return (
    <form className="custom-flex gap-7 w-full" method="POST" onSubmit={props.handleSendComment}>
      <textarea
        type="textbox"
        className="custom-light-border font-Work text-base w-full rounded-full resize-none"
        placeholder="add a comment"
        id="comment"
        rows={1}
        name={props.name}
        value={props.value}
        onChange={props.handleCommentData}
      />
      <button type="submit">
        <AiOutlineSend size={"1.3rem"} />
      </button>
    </form>
  );
}
