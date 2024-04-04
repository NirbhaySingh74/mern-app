import { Link, useParams } from "react-router-dom";
import "../addUser/add.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Edit = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
  };
  const { id } = useParams();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update user</h3>
      <form className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
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
