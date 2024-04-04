import { Link, useParams, useNavigate } from "react-router-dom";
import "../addUser/add.css";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Edit = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
  };
  const { id } = useParams();
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3000/api/update/${id}`, user)
      .then((res) => {
        toast.success("user updated successfffully", { position: "top-right" });
        navigate("/");
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update user</h3>
      <form className="addUserForm" onSubmit={submitHandler}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            value={user.fname}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">Last name</label>
          <input
            type="text"
            value={user.lname}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last name"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">Email</label>
          <input
            type="email"
            value={user.email}
            name="email"
            id="email"
            autoComplete="off"
            placeholder="email"
            onChange={inputChangeHandler}
          />
        </div>

        <div className="inputGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
