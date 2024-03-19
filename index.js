var dgram = require('dgram');

var client = dgram.createSocket('udp4')

client.on('message',(buffer,rinfo)=>{

    const payload = JSON.parse(buffer.toString())
    console.log(payload)
})

client.send('Hello World!',0, 12, 2013, '239.255.255.3');
client.send('Hello2World!',0, 12, 12000, '127.0.0.1');
// client.send('Hello3World!',0, 12, 12000, '127.0.0.1', function(err, bytes) {
// client.close();
// });