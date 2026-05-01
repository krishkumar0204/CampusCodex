import { User } from "../models/user.models.js";

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { username } = req.body;

    const avatar = req.file?.path;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { username, ...(avatar && { avatar }) },
      { new: true },
    );

    res.json({
      message: "Profile updated",
      user: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { updateProfile };
