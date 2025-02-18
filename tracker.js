'use strict';

const dgram = require('dgram'); // this is for sending/receiving UDP packets
const Buffer = require('buffer').Buffer; // lets us handle binary data
const crypto = require('crypto');
const torrentParser = require('./torrent-parser');
const util = require('./util');

// function to get peers from the tracker
module.exports.getPeers = (torrent, callback) => {
  const socket = dgram.createSocket('udp4'); // create a UDP socket
  const url = torrent.announce.toString('utf8'); // get the tracker URL from the torrent file

  // step 1: send a connect request to the tracker
  udpSend(socket, buildConnReq(), url); 

  // when we get a response from the tracker
  socket.on('message', response => {
    if (respType(response) === 'connect') {
      // step 2: got the connect response, now we parse it
      const connResp = parseConnResp(response);
      
      // step 3: send an announce request using the connection ID we just got
      const announceReq = buildAnnounceReq(connResp.connectionId);
      udpSend(socket, announceReq, url);
    } else if (respType(response) === 'announce') {
      // step 4: got an announce response, time to extract peer info
      const announceResp = parseAnnounceResp(response);
      
      // step 5: give the list of peers back using the callback
      callback(announceResp.peers); 
    }
  });
};

// function to send a UDP packet to the tracker
function udpSend(socket, message, rawUrl, callback = () => {}) {
  const url = new URL(rawUrl); // breaks down the URL into hostname & port
  socket.send(message, 0, message.length, url.port, url.hostname, callback); // actually sends the data
}


function respType(resp) {
  // ...
}


function buildConnReq() {
  const buf = Buffer.alloc(16); // 16-byte buffer allocated to store the conn req msg

  //connection id
  buf.writeUInt32BE(0x417, 0); // 4 butes is written at offset 0
  buf.writeUInt32BE(0x27101980, 4);// 4 butes is written at offset 4
//action
  buf.writeUInt32BE(0, 8);//4 bytes at offset 8 representing the action
//transaction id
  crypto.randonBytes(4).copy(buf, 12);//4 bytes starting at offset 12 store a random transac ID

  return buf;
}

function parseConnResp(resp) {
  return {
    action: resp.readUInt32BE(0),//read 4 byte unsigned integer from offset 0(should always be 0)
    transactionId: resp.readUInt32BE(4),//read 4 byte transaction ID at offset 4(should match the randon transId sent in the request, ensuring the response is valid)
    connectionId: resp.slice(8)//extract last 8 byte offset 8 to 15(connection id is assigned by the tracker)
  }
}




module.exports.getPeers = (torrent, callback) => {
  const announceReq = buildAnnounceReq(connResp.connectionId, torrent);
}


function buildAnnounceReq(connId, torrent, port=6881) {
const buf = Buffer.allocUnsafe(98);


//connection id
connId.copy(buf,0);
//action
buf.writeUInt32BE(1, 8);
//transaction id
crypto.randomBytes(4).copy(buf, 12);
//info hash
torrentParser.infoHash(torrent).copy(buf, 16);
//peerId
util.genId().copy(buf, 36);
//downloaded
buffer.alloc(8).copy(buf, 56)
//left
torrentParser.size(torrent).copy(buf, 64);
//uploaded
buffer.alloc(8).copy(buf, 72);
//event
buf.writeUInt32BE(0, 80);
//ip address
buf.writeUInt32BE(0, 80);
//key
crypto.randomBytes(4).copy(buf, 88);
//num want
buf.writeInt32BE(-1, 92);
//part
buf.writeUInt16BE(port, 96);

return buf;
}

function parseAnnounceResp(resp) {
  // ...
}