const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = "qwerty";

exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email, address, phone } =
    req.body;
  try {
    if (
      !(username && password && confirmPassword && email && address && phone)
    ) {
      return next(new Error("Please fill in all fields"));
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        address,
        phone,
      },
    });

    res.json({ msg: "Registration successful" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!(email && password)) {
      throw new Error("Email and password must be provided");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("user", user);
    if (!user) {
      throw new Error("User not found");
    }

    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error("Invalid login credentials");
    }

    const token = jwt.sign({ userId: user.id }, "qwerty");

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getme = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("userId22", userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    console.log("user11", user);
    delete user.password;
    console.log("user22", user);
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
