import User from '../models/user';
import Response from '../utils/response';
import * as Bcrypt from 'bcrypt';
import Errors from '../utils/errors';
import Jwt from '../utils/jwt';
import * as Randomstring from "randomstring";

let UserController = {};

UserController.createUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            const msg = "Username and password  is required";
            return Response.sendError(res, msg);
        }
        const checkUsername = await User.findOne({username: req.body.username}).exec();
        if (checkUsername) {
            const msg = "Username already taken";
            return Response.sendError(res, msg);
        } else {
            const user = new User({
                username: req.body.username,
                faculty: req.body.faculty,
                password: Bcrypt.hashSync(req.body.password, 10)
            });
            user.save().then((doc) => {
                if (doc) {
                    const payload = {
                        id: doc._id,
                        username: doc.username,
                    };
                    const token = Jwt.getToken(payload);
                    const profile = {id: doc._id, username: doc.username, faculty: doc.faculty};
                    return Response.sendSuccess(res, {profile: profile, token: token});
                } else {
                    return Response.sendError(res, Errors.USER_SAVE_ERROR )
                }
            })
        }
    } catch (e) {
        return Response.sendError(res, e)
    }
};

UserController.getUsers = async(req, res) => {
    try {
        const users = await User.find().exec();
        if (users) {
            return Response.sendSuccess(res, users);
        }
    } catch (err) {
        return Response.sendError(res, Errors.SERVER_ERROR);
    }
};

export default UserController;