# proxy-protocol-parser

[![npm version](https://badge.fury.io/js/%40balena%2Fproxy-protocol-parser.svg)](http://badge.fury.io/js/%40balena%2Fproxy-protocol-parser)
[![dependencies](https://david-dm.org/balena-io-modules/proxy-protocol-parser.png)](https://david-dm.org/balena-io-modules/proxy-protocol-parser.png)

## Overview

A simple encoder and decoder for proxy protocol headers using the v1 text and v2 binary formats.

See http://www.haproxy.org/download/1.5/doc/proxy-protocol.txt for details.

Supports IPv4 and IPv6, UDP and TCP, but not UNIX sockets.

## install

    npm install @balena/proxy-protocol-parser

## encode

Separate v1 and v2 encoders are provided.

````
var buf = require('@balena/proxy-protocol-parser').v2_encode(socket);
````

or

````
var buf = require('proxy-protocol-parser').v2_encode({
  remoteFamily: 'IPv4',
  remoteAddress: '12.34.56.78',
  remotePort: 1234,
  localAddress: '172.16.0.1,
  localPort: 8080,
  protocol: 'udp'
});
````

`protocol` defaults to `'tcp'` if unspecified.

The `v1_encode` function has the same API but is constrained by the limits of the v1 format, so only the `tcp` protocol is supported.

## decode

A generic decoder is provided that detects the format of any header. If no valid v1 or v2 signature is detected, `null` is returned.

````
var details = require('@balena/proxy-protocol-parser').decode(buf);
if(details === null) {
    console.log('No proxy protocol header detected');
}

var remoteFamily = details.remoteFamily,
    remoteAddress = details.remoteAddress,
    remotePort = details.remotePort,
    localAddress = details.localAddress,
    localPort = details.localPort,
    protocol = details.prototol;
````

Separate decoders are provided for each version if the expected version is known.

````
var v1_details = require('@balena/proxy-protocol-parser').v1_decode(buf);
var v2_details = require('@balena/proxy-protocol-parser').v2_decode(buf);
````

The format-specific functions will assume the presence of a header and may throw an Error or return invalid details if a header is not present.

Each decode operation takes an optional `validate` second argument which causes the header to be validated (with an Error being thrown if invalid) at the minor cost of checking the signature validity an other validity checks on field values.

## test

    nodeunit test
