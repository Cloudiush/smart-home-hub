const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'iot.proto'));
const iotProto = grpc.loadPackageDefinition(packageDefinition).SmartHome;

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

function sendReport(call, callback) {
    const { id, type, value } = call.request;
    console.log(`[gRPC] ${id}: ${value}`);
    io.emit('device-update', { id, type, value });
    callback(null, { message: "Odebrano", success: true });
}

const grpcServer = new grpc.Server();
grpcServer.addService(iotProto.service, { sendReport });
grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    grpcServer.start();
    console.log('Centrala gRPC (50051) i WS (8080) gotowa.');
});
server.listen(8080);