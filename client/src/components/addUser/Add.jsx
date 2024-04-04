import { useState } from "react";
import "./add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Add = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/create/", user)
      .then((res) => {
        toast.success("user created successfully", { position: "top-right" });
        navigate("/");
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Add new user</h3>
      <form className="addUserForm" onSubmit={submitHandler}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">Last name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last name"
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            placeholder="email"
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="password"
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
