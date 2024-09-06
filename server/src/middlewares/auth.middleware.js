import jwt from 'jsonwebtoken';

export const verifyjwt = async (req, res, next) => {
    try {
        const atoken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const retoken = req.cookies?.refreshToken; // Ensure consistent cookie name

        if (!atoken) {
            // No access token provided
            if (!retoken) {
                return res.status(401).json({
                    message: "Unauthorized, no tokens provided",
                    success: false
                });
            } else {
                // Refresh the access token using the refresh token
                try {
                    const result = await jwt.verify(retoken, process.env.REFRESH_TOKEN_KEY);
                    // Generate a new access token
                    const newacctoken = jwt.sign({ id: result.user_id,program:result.program }, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TIME });
                    const theop = {
                        httpOnly: true,
                        secure: true, // Use secure cookies in production
                    };

                    res.cookie("accessToken", newacctoken, theop);
                    req.user = result; // Pass the decoded user information
                    next();
                } catch (err) {
                    return res.status(401).json({
                        message: 'Invalid or expired refresh token',
                        success: false
                    });
                }
            }
        } else {
            // Verify the access token
            try {
                const decoded = await jwt.verify(atoken, process.env.ACCESS_TOKEN_KEY);
                req.user = decoded;
                next();
            } catch (err) {
                if (err.name === 'TokenExpiredError' && retoken) {
                    // Handle token expiration
                    try {
                        const result = await jwt.verify(retoken, process.env.REFRESH_TOKEN_KEY);
                        // Generate a new access token
                        const newacctoken = jwt.sign({ id: result.user_id,program:result.program }, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TIME });
                        const theop = {
                            httpOnly: true,
                            secure: true,
                        };

                        res.cookie("accessToken", newacctoken, theop);
                        req.user = result;
                        next();
                    } catch (err) {
                        return res.status(401).json({
                            message: 'Invalid or expired refresh token',
                            success: false
                        });
                    }
                } else {
                    // Access token is invalid for reasons other than expiration
                    return res.status(401).json({
                        message: 'Unauthorized, invalid access token',
                        success: false
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};
