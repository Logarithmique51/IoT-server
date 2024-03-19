const aedes = require('aedes');
const net = require('net');
const mqtt = require('mqtt')

// Create an MQTT server instance
const mqttServer = aedes();

// Create a TCP server
const server = net.createServer(mqttServer.handle);

// Listen to the server's listening event
server.listen(1883,'0.0.0.0', function () {
    console.log('MQTT Broker listening on port 1883');
});

// Handle errors
server.on('error', function (err) {
    console.log('Error:', err);
});

const brokerAddress = 'mqtt://localhost'; // Change to your MQTT broker address
const brokerPort = 1883; // Default MQTT port

// Connect to the MQTT broker
const client = mqtt.connect(brokerAddress, { port: brokerPort });

// Listen for 'connect' event
client.on('connect', function () {
    console.log('Connected to MQTT broker');
    // Subscribe to all topics (wildcard)
    client.subscribe('#');
});

// Listen for 'message' event
client.on('message', function (topic, message) {
    console.log('Received message:', topic, message.toString());
});

// Handle errors
client.on('error', function (err) {
    console.error('Error:', err);
});