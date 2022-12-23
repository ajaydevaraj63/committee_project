import React, { useState } from "react";
import "./post.css";

export default function Post({ post }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date();
  console.log(date);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
              alt=""
            />{" "}
            {post.userlist.map((value) => (
              <span key={post.id} className="postUsername">
                {value.UserName}
              </span>
            ))}
            {date === post.createdAt ? (
              <span className="postDate">Today</span>
            ) : (
              <span className="postDate">
                {new Date(post.createdAt).toLocaleDateString("en-us", options)}
              </span>
            )}
            {/* <span className="postDate">
              {new Date(post.createdAt).toLocaleDateString("en-us", options)}
            </span> */}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.PostDescription}</span>
          <br />
         
              <img className="postImg" src={post.PostImage} alt="" download />
         
          
          
        </div>
        <div className="postBottom"></div>
      </div>
    </div>
  );
}
