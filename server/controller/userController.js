import User from "../model/userModal.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    const savedData = await userData.save();
    console.log(savedData);
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleData = await User.findById(id);
    if (!getSingleData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(getSingleData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "USer not found" });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await User.findById(id);
    if (!deleteData) {
      return res.status(401).json({ msg: "user not found" });
    }
    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
