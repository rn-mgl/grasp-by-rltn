import React from "react";

import FileViewer from "../POST COMPONENTS/FileViewer";

export default function TaskBody(props) {
  return (
    <div className="flex-col gap-5 font-Work">
      <div className="flex flex-col gap-5 whitespace-pre-wrap">
        <div>{props.task_info}</div>
        <FileViewer file={props.file} post={props.task} />
      </div>
    </div>
  );
}
