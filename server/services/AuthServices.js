const genToken = require("../Helper");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

class AuthServices {
  async login(req, res) {
    try {
      let webToken = null;

      const client = new OAuth2Client();

      async function verify() {
        let token = req.body.credential;
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience:
            "201340605088-8pikerd5bveklcettp2mhnl8ev46h5l4.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const {
          given_name: firstname,
          family_name: lastname,
          email,
          picture: image,
          sub: googleId,
        } = payload;

        const isExist = await User.findOne({
          googleId,
        });

        if (!isExist)
          await User.create({
            firstname,
            lastname,
            email,
            image,
            googleId,
          });

        webToken = genToken({
          id: googleId,
        });


        if (webToken) {
          return {
            error: false,
            message: "Successful",
            data: {
              id: googleId,
              webToken
            },
          };
        }
        return {
          error: true,
          message: "Something went wrong!",
          data: null,
        };
      }
      return await verify(); // verifying google token


    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AuthServices();
