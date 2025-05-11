import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Log the Authorization header
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Authorization token missing or invalid');
        return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    // Log the extracted token
    console.log('Extracted Token:', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Log the decoded token
        console.log('Decoded Token:', decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(401).json({ message: 'Token is invalid or expired' });
    }
};

export default authMiddleware;
