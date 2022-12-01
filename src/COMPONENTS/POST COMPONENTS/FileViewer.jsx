import React from "react";
import { GrLinkNext } from "react-icons/gr";

export default function FileViewer(props) {
  const fileName =
    props.post?.file_name || props.post?.submitted_file_name || props.post?.task_file_name;
  return (
    props.file && (
      <a href={props.file} target="_blank" rel="noreferrer">
        <div className="custom-light-border p-3 parent custom-flex flex-col w-fit hover:text-pr-grn">
          {props.file?.endsWith(".pdf") ? (
            <iframe
              className="rounded-lg max-h-96 w-full
                    tablet:h-52"
              src={props.file}
              title={props.file}
            />
          ) : props.file?.endsWith(".mp4") ? (
            <video controls={true} src={props.file} className="rounded-lg max-h-96" />
          ) : (
            (props.file?.endsWith(".jpg") ||
              props.file?.endsWith(".png") ||
              props.file?.endsWith(".jpeg")) && (
              <img className="rounded-lg max-h-96" src={props.file} align="center" alt="post" />
            )
          )}

          {fileName && (
            <div className="font-Poppins custom-flex flex-col w-full font-medium">
              <div className="custom-divider my-3" />
              <div className="custom-flex gap-3">
                <div className="child transition-all delay-500 font-light font-Work absolute bg-pr-blk text-pr-wht -translate-y-11 -translate-x-2 p-2 rounded-md">
                  {fileName}
                </div>
                {fileName.length > 25 ? fileName.slice(0, 25) + "..." : fileName}
                <GrLinkNext />
              </div>
            </div>
          )}
        </div>
      </a>
    )
  );
}
