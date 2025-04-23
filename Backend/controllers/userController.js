const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Authenticate user (replace with your actual authentication logic)
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET,             // Secret key
            { expiresIn: "1h" }                 // Token expiration
        );

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevent client-side access
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { loginUser };