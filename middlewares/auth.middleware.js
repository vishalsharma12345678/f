import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    // Check if the token is present in the cookies
    const token = req.headers.cookie?.split('=')[1];
    if (token) {
        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                // Invalid token, redirect to the login page
                console.log("user is not verified!!", err.message);
                req.session.previousUrl = req.originalUrl;
                res.redirect('/auth/login');
            } else {
                // user is verified
                next();
            }
        });
    } else {
        // Token is not present, redirect to the login page
        console.log("user is not verified!!");
        res.cookie('previousUrl', req.originalUrl);
        res.redirect('/auth/login');
    }
};

export default authenticate;
