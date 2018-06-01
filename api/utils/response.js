
let Response = {};

Response.sendSuccess = (res, data) => {
    res.status(200);
    res.json({'status': 'success', 'data': data})
};

Response.sendError = (res, msg) => {
    res.status(500);
    res.json({'status': 'error', 'data': {'msg': msg }})
};

Response.sendValidationError = (res, msg) => {
    res.status(400);
    res.json({'status': 'error', 'data': {'msg': msg }})
};

export default Response;

