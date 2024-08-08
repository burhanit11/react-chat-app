import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import useChatStore from "../../lib/chatStore";
import useUserStore from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  console.log(img?.url, "img");

  const { chatId, user, isCurrentUserBlocked, isReceiverBLocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavio: "smooth" });
  });

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handelImg = async (e) => {
    const imgfile = e.target.files ? e.target.files[0] : null;
    setImg({
      file: e.target.files[0],
      url: URL.createObjectURL(imgfile),
    });
  };

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleClick = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userchatsData = userChatsSnapshot.data();
          const chatIndex = userchatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userchatsData.chats[chatIndex].lastMessage = text;
          userchatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userchatsData.chats[chatIndex].updateAt = Date.now();
          await updateDoc(userChatsRef, {
            chats: userchatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  return (
    <div className="chat ">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
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
        {chat?.messages?.map((message) => (
          <div
            className={
              message?.senderId === currentUser.id ? "message own" : "message"
            }
            key={message?.createAt}
          >
            <div className="texts ">
              {message.img ? <img src={message?.img} alt="" /> : null}
              <p>{message?.text}</p>
              <span>1 min ago</span>
            </div>
          </div>
        ))}
        {img?.url && (
          <div className="message own">
            <div className="texts">
              <img src={img?.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onClick={handelImg}
            style={{ display: "none" }}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          name="text"
          value={text}
          placeholder={
            isCurrentUserBlocked || isReceiverBLocked
              ? "You can't send message."
              : "Type a message..."
          }
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
        <button
          className="sendBotton"
          onClick={handleClick}
          // onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
          disabled={isCurrentUserBlocked || isReceiverBLocked}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
