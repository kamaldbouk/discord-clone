const User = require('../../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
    try {
        const { username, mail, password } = req.body;

        // check if user exists
        const userExists = await User.exists({ mail: mail.toLowerCase() });
        if (userExists){
            return res.status(409).send('Email already in use.');
        }

        // encrypt passwords
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user document and save it in db
        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: encryptedPassword
        });

        // create JWT token
        const token = jwt.sign(
            {
              userId: user._id,
              mail,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );

        res.status(201).json({
            userDetails: {
                mail: user.mail,
                token: token,
                username: user.username,
            }
        })
    }
    catch (err) {
        return res.status(500).send('Error occured. Try again.')
    }
}
 
module.exports = postRegister;