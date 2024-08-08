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
  const [signUpVal, setSignUpVal] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginVal, setLoginVal] = useState({
    email: "",
    password: "",
  });
  const [avatar, setAavtar] = useState({
    file: null,
    url: "",
  });

  // handel avatar img
  const handleAvatar = (e) => {
    setAavtar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  // handle onchange login from
  const handelLoginChange = async (e) => {
    const { name, value } = e.target;
    setLoginVal({
      ...loginVal,
      [name]: value,
    });
  };

  // handel Login submit data
  const handelSubmit = async (e) => {
    setIsloading1(true);
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginVal.email, loginVal.password);
      toast.success("Login Sussess");
      setIsloading1(false);
      setLoginVal({
        email: "",
        password: "",
      });
    } catch (error) {
      setIsloading1(false);
      toast.error(error.message);
      setLoginVal({
        email: "",
        password: "",
      });
    }
  };

  // handel sign up from On Change
  const handelSignUpOnChange = async (e) => {
    const { name, value } = e.target;
    setSignUpVal({
      ...signUpVal,
      [name]: value,
    });
  };

  // handel signUp submit
  const handelSignUpSubmit = async () => {
    setIsloading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        signUpVal.email,
        signUpVal.password
      );
      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username: signUpVal.username,
        email: signUpVal.email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Account Created! You can login Now!");
      setIsloading(false);
      setSignUpVal({
        username: "",
        email: "",
        password: "",
      });
      setAavtar({
        file: null,
        url: "",
      });
    } catch (error) {
      toast.error(error.message);
      setIsloading(false);
      setSignUpVal({
        username: "",
        email: "",
        password: "",
      });
      setAavtar({
        file: null,
        url: "",
      });
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
        <form onSubmit={handelSignUpSubmit}>
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
            onChange={handelSignUpOnChange}
            value={setSignUpVal.username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handelSignUpOnChange}
            value={setSignUpVal.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handelSignUpOnChange}
            value={setSignUpVal.password}
          />
          <button
            type="submit"
            disabled={isLoading}
            onKeyDown={(e) => e.key === "Enter" && handelSignUpSubmit(e)}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
