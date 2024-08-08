// import { toast } from "react-toastify";
import "./addUser.css";
import {
  collection,
  doc,
  // getDocs,
  // query,
  serverTimestamp,
  setDoc,
  // where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
// import { useState } from "react";
import useUserStore from "../../../../lib/userStore";

const AddUser = ({ user }) => {
  // const [user, setUser] = useState(null);

  console.log(user, "user search");
  const { currentUser } = useUserStore();

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const username = formData.get("username");
  //   try {
  //     const userRef = collection(db, "users");

  //     const q = query(userRef, where("username", "==", username));

  //     const querySnapShot = await getDocs(q);
  //     if (!querySnapShot.empty) {
  //       setUser(querySnapShot.docs[0].data());
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createAt: serverTimestamp(),
        message: [],
      });
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updateAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updateAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      {/* <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder="Username" />
        <button type="submit">Search</button>
      </form> */}
      {user && (
        <div className="user">
          <div className="details">
            <img src={user?.avatar || "./avatar.png"} alt="" />
            <span>{user?.username}</span>
          </div>
          <button onClick={handleAdd} type="submit">
            AddUser
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
