import User from '../models/user';
import Response from '../utils/response';
import cuid from 'cuid';
import Errors from '../utils/errors';
import Jwt from '../utils/jwt';

let UserController = {};

UserController.createUser = async (req, res) => {
    try {
        if (!req.body.username) {
            const msg = "Name  is required";
            return Response.sendValidationError(res, msg);
        }
        const user = new User({
            username: req.body.username,
            cuid: cuid()
        });
        user.save().then((doc) => {
            if (doc) {
                const payload = {
                    id: doc._id,
                    username: doc.username,
                    cuid: doc.cuid
                };
                const token = Jwt.getToken(payload);
                return Response.sendSuccess(res, {cuid: doc.cuid, token: token});
            } else {
                return Response.sendError(res, Errors.USER_SAVE_ERROR )
            }
        })
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