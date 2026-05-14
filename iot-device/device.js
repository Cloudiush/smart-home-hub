const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'iot.proto'));
const iotProto = grpc.loadPackageDefinition(packageDefinition).SmartHome;
const client = new iotProto('central-hub:50051', grpc.credentials.createInsecure());

setInterval(() => {
    const val = (Math.random() * 5 + 20).toFixed(2);
    client.sendReport({ id: process.env.DEVICE_ID, type: 'Temp', value: val }, (err) => {
        if (!err) console.log(`Wysłano: ${val}`);
    });
}, 3000);