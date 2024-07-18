import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import parentsModel from "../../models/parentsModel.js";

const loginParent = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await parentsModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const payload = {
      username,
      id: user_id,
      role: user.role,
      uuid: user.password,
    };
    const token = jwt.sign(payload, process.env.PARENT_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "password match..", token });
  } catch (error) {
    res.status(500).json({ message: "Server error...", error });
  }
};

export default loginParent;
