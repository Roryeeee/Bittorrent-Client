# Tracker Module - tracker.js

## Overview
This module handles communication with BitTorrent trackers using the **UDP protocol**. It sends requests to obtain a list of peers for a given torrent file.

## Dependencies
- **dgram**: Used for sending and receiving UDP packets.
- **buffer**: Enables binary data manipulation.
- **crypto**: Generates random values (e.g., transaction IDs).
- **torrent-parser**: Parses `.torrent` files.
- **util**: Provides utility functions (e.g., generating peer IDs).

## File Structure
```
project-directory/
│-- tracker.js
│-- torrent-parser.js
│-- util.js
│-- some-torrent-file.torrent
```

## Usage
This module exports the `getPeers` function, which retrieves a list of peers from a tracker. To use it:
```js
const tracker = require('./tracker');
const torrent = require('./torrent-parser').parse('some-file.torrent');

tracker.getPeers(torrent, peers => {
    console.log('List of peers:', peers);
});
```

## Code Breakdown
### Importing Required Modules
```js
const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const crypto = require('crypto');
const torrentParser = require('./torrent-parser');
const util = require('./util');
```
- `dgram`: Creates a UDP socket for tracker communication.
- `buffer`: Manages binary data.
- `crypto`: Used for generating transaction IDs.
- `torrentParser`: Reads data from the torrent file.
- `util`: Provides helper functions like generating a peer ID.

### Getting Peers from the Tracker
```js
module.exports.getPeers = (torrent, callback) => {
  const socket = dgram.createSocket('udp4');
  const url = torrent.announce.toString('utf8');
```
- **Creates a UDP socket** (`udp4` means IPv4).
- **Extracts the tracker URL** from the torrent file.

### Sending a Connect Request
```js
udpSend(socket, buildConnReq(), url);
```
- Calls `buildConnReq()` to create a **connect request**.
- Sends it to the tracker using `udpSend()`.

### Handling Responses
```js
socket.on('message', response => {
    if (respType(response) === 'connect') {
        const connResp = parseConnResp(response);
        const announceReq = buildAnnounceReq(connResp.connectionId);
        udpSend(socket, announceReq, url);
    } else if (respType(response) === 'announce') {
        const announceResp = parseAnnounceResp(response);
        callback(announceResp.peers);
    }
});
```
#### **1. Handling Connect Response**
- If the response type is `'connect'`, it:
  1. Parses the connection response (`parseConnResp`).
  2. Extracts the **connection ID**.
  3. Builds and sends an **announce request** using `buildAnnounceReq()`.

#### **2. Handling Announce Response**
- If the response type is `'announce'`, it:
  1. Parses the announce response (`parseAnnounceResp`).
  2. Extracts the list of **peers**.
  3. Passes the peer list to the provided callback function.

## Expected Output
If successful, the script outputs a list of peers:
```sh
List of peers: [ { ip: '192.168.1.100', port: 6881 }, { ip: '203.0.113.45', port: 6882 } ]
```
---
**Author:** Ayush Shrestha   
**Last Updated:** 2/9/2025

