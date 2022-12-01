import React from "react";
import { Buffer } from "buffer";

import FileViewer from "./FileViewer";

export default function PostBody(props) {
  const file = props.post.post_file ? Buffer.from(props.post.post_file).toString() : "";

  return (
    <div className="custom-light-border bg-gray-50">
      <div className="font-Poppins font-medium break-words whitespace-pre-wrap">
        {props.post.post_main_topic}
      </div>
      <div>
        {/* render see more or see less if included in shownPostBody */}
        {props.shownPostBody?.includes(props.post.post_id) ? (
          <div>
            {/* add see less button if length is > 200 and included in shownPostBody*/}
            {props.post.post_text.length > 200 ? (
              <div className="flex flex-col gap-4">
                <div className="break-words whitespace-pre-wrap">{props.post.post_text}</div>
                <div
                  className="custom-btn text-sm w-24 p-0"
                  onClick={() => props.handleShownPostBody(props.post.post_id)}
                >
                  See Less
                </div>
              </div>
            ) : (
              // do not add see less button because length < 200
              <div className="break-words whitespace-pre-wrap">{props.post.post_text}</div>
            )}
          </div>
        ) : (
          <div>
            <div>
              {/* add see more button if length > 200 */}
              {props.post.post_text.length > 200 ? (
                <div className="flex flex-col gap-4">
                  <div className="break-words whitespace-pre-wrap">
                    {props.post.post_text.slice(0, 200)}...
                  </div>
                  <div
                    className="custom-btn text-sm w-24 p-0"
                    onClick={() => props.handleShownPostBody(props.post.post_id)}
                  >
                    See More
                  </div>
                </div>
              ) : (
                // do not add see more button because length < 200
                <div className="break-words">{props.post.post_text}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-fit mt-10">
        {props.post.post_file && props.post.post_file.data.length !== 0 && (
          <FileViewer file={file} post={props.post} />
        )}
      </div>
    </div>
  );
}
