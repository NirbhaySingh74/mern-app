import { Link } from "react-router-dom";
import "./user.css";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const User = () => {
  const [allData, setAllData] = useState([]);
  const fetchData = async () => {
    const data = await axios.get("http://localhost:3000/api/users/");

    setAllData(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(allData._id);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/${id}`);
      setAllData(allData.filter((item) => item._id !== id));
      toast.success("User deleted successfully", { position: "top-right" });
    } catch (error) {
      console.log("Error deleting user:", error);
      toast.error("Failed to delete user", { position: "top-right" });
    }
  };

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.fname}</td>
              <td>{item.email}</td>
              <td className="actionButtons">
                <button onClick={() => deleteHandler(item._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <Link to={`/edit/${item._id}`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
