# Utility Module - util.js

## Overview
This module provides a function to generate a unique peer ID for a BitTorrent client. The peer ID is a 20-byte identifier required for communication with trackers and peers.

## Dependencies
- **crypto** (Node.js built-in module for generating random bytes)

## File Structure
```
project-directory/
│-- util.js
```

## Usage
Import and call the `genId` function in another script:
```js
const { genId } = require('./util');
console.log(genId());
```

## Code Breakdown
### Importing Required Modules
```js
const crypto = require('crypto');
```
- The `crypto` module is used to generate secure random bytes.

### Generating a Unique Peer ID
```js
let id = null;
```
- A variable `id` is declared to store the generated peer ID, ensuring consistency across function calls.

### Defining the `genId` Function
```js
module.exports.genId = () => {
    if (!id) {
        id = crypto.randomBytes(20);
        Buffer.from('-AT0001-').copy(id, 0);
    }
    return id;
};
```
- If `id` is `null`, a **new 20-byte buffer** is generated using `crypto.randomBytes(20)`.
- The first **8 bytes** are replaced with `-AT0001-`, following BitTorrent client ID conventions.
- The ID remains **constant** after the first call.

## Expected Output
When calling `genId()`, the function returns a **Buffer object** representing the peer ID:
```sh
<Buffer 2d 41 54 30 30 30 31 2d a3 f4 67 89 d2 b3 5e 12 48 92 d1 b7>
```
- The first **8 bytes** represent `-AT0001-`.
- The remaining **12 bytes** are random.
---
**Author:** Ayush Shrestha  
**Last Updated:** 2/9/2025

