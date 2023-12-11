const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { userData } = req;
    delete userData.password;

    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successfully",
      token: token,
      userData,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userData } = req;

    console.log(userData);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  login,
  getProfile,
};
