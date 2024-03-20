import * as aedes from 'aedes'
import * as net from 'net'
import * as mqtt from 'mqtt'

const mqttServer = aedes.createBroker();

const server = net.createServer(mqttServer.handle);

 
const TOPIC = {
    PING : "limitlesslogic/ping"
}

server.listen(1883,'0.0.0.0', function () {
    console.log('MQTT Broker listening on port 1883');
});

server.on('error', function (err) {
    console.log('Error:', err);
});

const brokerAddress = 'mqtt://localhost'; 
const brokerPort = 1883;
const client = mqtt.connect(brokerAddress, { port: brokerPort });

client.on('connect', function () {
    client.subscribe('#');
    client.publish("maison/lampe/1234","un gros payload")
});

client.on('message', function (topic, message) {
     switch (topic) {
        case TOPIC.PING:

             console.log(JSON.parse(message.toString()))
            break;
    
        default:
            console.log("UNKNOW TOPIC")
            break;
    }
});

client.on('error', function (err) {
    console.error('Error:', err);
});