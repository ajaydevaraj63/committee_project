import React from "react";
import "./share.css";
import {  Attachment, Send } from "@mui/icons-material";

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="../assets/assets/persons/1.jpg"
            alt=""
          />
          <input
            placeholder="What's in your mind Sophia?"
            className="shareInput"
          />
          <div className="shareOptions">
            <div className="shareOption">
              <Attachment
                sx={{
                  width: 40,
                }}
              />

              {/* <span className="shareOptionText">Photo</span> */}
            </div>
            <div className="shareOption">
              <Send
                sx={{
                  width: 40,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
