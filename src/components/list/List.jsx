import "./list.css";
import UserInfo from "./userInfo/UserInfo";
import ChatList from "./chatList/ChatList";
const List = () => {
  return (
    <div className="list text-white">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
