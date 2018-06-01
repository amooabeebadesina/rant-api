import mongoose from 'mongoose';
const URI = "";

mongoose.Promise = global.Promise;

const options = {
    autoReconnect: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    poolSize: 10
};
mongoose.connect(URI, options);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + URI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
    mongoose.disconnect();
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

export default mongoose;