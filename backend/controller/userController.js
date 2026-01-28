import User from "../models/User.js";

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // req.user vient du middleware isAuth (payload du token)
    if (!req.user || req.user.id !== Number(id)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to access this user's informations" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // renvoie safe (pas de hash)
    return res.status(200).json({ id: user.id, mail: user.mail });
  } catch (err) {
    return res.status(500).json({
      error: err?.message || err,
      message: "Error retrieving user",
    });
  }
};

export default { getUserById };
