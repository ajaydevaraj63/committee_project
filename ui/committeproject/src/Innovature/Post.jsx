import React, { useState } from "react";
import "./post.css";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import Configuration from './Configuration';

// import {Users} from "./dummyData"

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isliked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt="" />{" "}
            {post.User.map((value) => (
              <span className="postUsername">{value.username}</span>
            ))}
            <span className="postDate">
              {new Date(post.createdAt).toLocaleDateString("en-us", options)}
            </span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.EventDescription}</span><br />
          <img className="postImg" src={post.File} alt="" download/>
          <a  href={post.File} download><InsertDriveFileRoundedIcon  className="svg_icons"/></a>
        </div>
        <div className="postBottom">
          {/* <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="../assets/assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}