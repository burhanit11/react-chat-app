import { useState } from "react";
// import { toast } from "react-toastify";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload.js";

const Login = () => {
  const [isLoading, setIsloading] = useState(false);
  const [isLoading1, setIsloading1] = useState(false);
  const [loginVal, setLoginVal] = useState({
    email: "",
    password: "",
  });
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

  const handelLoginChange = async (e) => {
    const { name, value } = e.target;
    setLoginVal({
      ...loginVal,
      [name]: value,
    });
  };
  const handelSubmit = async (e) => {
    setIsloading1(true);
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginVal.email, loginVal.password);
      toast.success("Login Sussess");
      setIsloading1(false);
      console.log(loginVal);
    } catch (error) {
      setIsloading1(false);
      toast.error(error.message);
    }
  };

  // const handelLogin = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);

  //   const { email, password } = Object.fromEntries(formData);
  // };
  const handelSignup = async (e) => {
    setIsloading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      console.log(imgUrl, "imgURL");

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Account Created! You can login Now!");
      setIsloading(false);
    } catch (error) {
      toast.error(error.message);
      setIsloading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back!</h2>
        <form onSubmit={handelSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handelLoginChange}
            value={loginVal.email}
          />
          <input
            type="password"
            name="password"
            value={loginVal.password}
            placeholder="Password"
            onChange={handelLoginChange}
          />
          <button
            disabled={isLoading}
            type="submit"
            onKeyDown={(e) => e.key === "Enter" && handelSubmit(e)}
          >
            {" "}
            {isLoading1 ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handelSignup}>
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
          <input type="text" name="username" placeholder="username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
