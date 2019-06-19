/**
 * Copyright (c) 2019 Oracle and/or its affiliates. All rights reserved.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
/* global console, process, __dirname */
/* jshint esversion: 6 */

/**
 * Test CEC Content SDK
 */

var express = require('express'),
	app = express(),
	path = require('path'),
	request = require('request'),
	cors = require('cors'),
	contentRouter = require('./server/contentRouter.js');

// project root is the current dir
var projectDir = path.join(__dirname);

var port = process.env.CEC_CONTENTSDK_PORT || 7071;

// allow cross-origin requests for all
app.use(cors());

// enable cookies
request = request.defaults({
	jar: true,
	proxy: null
});
app.locals.request = request;

app.use('/', express.static(projectDir));
app.use('/node_modules', express.static(path.join(projectDir, 'node_modules')));

// All /content requests are handled by contentRouter
app.get('/content*', contentRouter);
app.post('/content*', contentRouter);

// Handle startup errors
process.on('uncaughtException', function (err) {
	'use strict';
	if (err.code === 'EADDRINUSE' || err.errno === 'EADDRINUSE') {
		console.log('======================================');
		console.error(`Another server is using port ${err.port}. Stop that process and try to start the server again.`);
		console.log('======================================');
	} else {
		console.error(err);
	}
});

// start the server without remote server
app.listen(port, function () {
	"use strict";
	console.log('NodeJS running...:');
	console.log('Local server: http://localhost:' + port);
});

