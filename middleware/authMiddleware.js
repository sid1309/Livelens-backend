const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];//extracts the Bearer token from the Authorization header.
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    //If it's valid, it returns the payload (decoded data) originally signed (e.g., { id: user._id }).
    req.user = decoded;
    next();
  }
  catch{
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;

