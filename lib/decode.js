'use strict';

const common = require('./v2_common');
const v1_decode = require('./v1_decode');
const v2_decode = require('./v2_decode');

module.exports = (buf, validate) => {
	if (buf.length >= 16) {
		var sigBytes = common.sigBytes,
			sigLength = sigBytes.length,
			receivedSig = buf.slice(0, sigLength);

		if (!sigBytes.compare(receivedSig)) {
			return v2_decode(buf, validate, receivedSig);
		}
	}

	buf = String(buf);
	if (buf.length >= 8) {
		if (buf.slice(0, 5) == 'PROXY') {
			return v1_decode(buf, validate);
		}
	}

	return null;
};
