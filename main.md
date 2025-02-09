# BitTorrent Client - Main Script

## Overview
This script serves as the entry point for a simple BitTorrent client. It reads a torrent file, decodes its contents, and queries the tracker for a list of available peers.

## Dependencies
Ensure the following dependencies are installed before running the script:
- **Node.js** (latest version recommended)
- **fs** (built-in Node.js module for file system operations)
- **bencode** (for decoding torrent files)
- **tracker** (custom module for handling tracker communication)

To install `bencode`, run:
```sh
npm install bencode
```

## File Structure
```
project-directory/
│-- main.js
│-- tracker.js
│-- puppy.torrent
```

## Usage
Run the script using Node.js:
```sh
node main.js
```
Ensure `puppy.torrent` is present in the same directory as `main.js`.

## Code Breakdown
### Importing Required Modules
```js
'use strict';
const fs = require('fs');
const bencode = require('bencode');
const tracker = require('./tracker');
```
- `fs`: Reads the torrent file from the file system.
- `bencode`: Decodes the torrent file contents.
- `tracker`: A module that handles tracker communication.

### Reading and Decoding the Torrent File
```js
const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));
```
- Reads `puppy.torrent` synchronously.
- Decodes the bencoded data into a JavaScript object.

### Fetching Peers from the Tracker
```js
tracker.getPeers(torrent, peers => {
    console.log('list of peers: ', peers);
});
```
- Calls `tracker.getPeers()` to request peers from the tracker.
- Prints the list of peers to the console once received.

## Expected Output
If successful, the script will output a list of peer IP addresses and ports:
```sh
list of peers:  [ { ip: '192.168.1.100', port: 6881 }, { ip: '203.0.113.45', port: 6882 } ]
```


---
**Author:** Ayush Shrestha    
**Last Updated:** 2/9/2025

