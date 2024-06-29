import React from "react";
import Comment from "./Comment";

function SectionComment({ comments }) {
  console.log(comments.length)

  return (
    <div>
      {comments.length > 0 &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </div>
  );
}
export default SectionComment;
