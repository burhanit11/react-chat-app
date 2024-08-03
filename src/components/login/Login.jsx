import { useState } from "react";
// import { toast } from "react-toastify";
import "./login.css";
const Login = () => {
  const [value, setValue] = useState("");
  const [avatar, setAavtar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    setAavtar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handelLogin = () => {
    console.log(value);
  };
  const handelSignup = () => {};

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back!</h2>
        <form action="" onSubmit={handelLogin}>
          <input
            type="email"
            value={value}
            name="email"
            placeholder="Email"
            onChange={handleInput}
          />
          <input
            type="password"
            name="password"
            value={value}
            placeholder="Password"
            onChange={handleInput}
          />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form action="" onSubmit={handelSignup}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an Image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleInput}
            value={value}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
            value={value}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            value={value}
          />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
