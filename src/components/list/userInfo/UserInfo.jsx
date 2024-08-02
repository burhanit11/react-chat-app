import "./userInfo.css";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src="./avatar.png" alt="" className="avtarImg" />
        <h2>Burhan</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" className="iconImg" />
        <img src="./video.png" alt="" className="iconImg" />
        <img src="./edit.png" alt="" className="iconImg" />
      </div>
    </div>
  );
};

export default UserInfo;
