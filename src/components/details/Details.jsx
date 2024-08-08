import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import useChatStore from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import useUserStore from "../../lib/userStore";
import "./details.css";

const Details = () => {
  const { currentUser } = useUserStore();
  const {
    chatId,
    user,
    changeChat,
    isCurrentUserBlocked,
    isReceiverBLocked,
    changeBlock,
  } = useChatStore();

  const handelBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBLocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="details">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetails">
                <img src="./avatar.png" alt="" />
                <span>photo_2024_2.png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img src="./avatar.png" alt="" />
                <span>photo_2024_2.png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img src="./avatar.png" alt="" />
                <span>photo_2024_2.png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img src="./avatar.png" alt="" />
                <span>photo_2024_2.png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Share File</span>
            <img src="./arrowDwon.png" alt="" />
          </div>
        </div>
        <button onClick={handelBlock}>
          {isCurrentUserBlocked
            ? "You are block"
            : isReceiverBLocked
            ? "User Block"
            : "Block user"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Details;
