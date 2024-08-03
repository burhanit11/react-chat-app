import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavio: "smooth" });
  });

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat ">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Burhan</span>
            <p>Lorem ipsum dolor sit amet consect.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts  ">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              quod consectetur mollitia sed, sit animi recusandae veritatis
              suscipit ducimus accusamus iusto? Excepturi nesciunt, ipsam
              quibusdam dolores commodi natus consequatur labore.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts ">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              quod consectetur mollitia sed, sit animi recusandae veritatis
              suscipit ducimus accusamus iusto? Excepturi nesciunt, ipsam
              quibusdam dolores commodi natus consequatur labore.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts ">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              quod consectetur mollitia sed, sit animi recusandae veritatis
              suscipit ducimus accusamus iusto? Excepturi nesciunt, ipsam
              quibusdam dolores commodi natus consequatur labore.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts ">
            <img src="./avatar.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              quod consectetur mollitia sed, sit animi recusandae veritatis
              suscipit ducimus accusamus iusto? Excepturi nesciunt, ipsam
              quibusdam dolores commodi natus consequatur labore.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          name="text"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendBotton">send</button>
      </div>
    </div>
  );
};

export default Chat;
