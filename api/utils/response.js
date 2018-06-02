
let Response = {};

Response.sendSuccess = (res, data) => {
    res.status(200);
    res.json({'status': 'success', 'data': data})
};

Response.sendError = (res, msg, data=null) => {
    res.status(200);
    res.json({'status': 'error', 'msg': msg, data: data})
};

export default Response;

