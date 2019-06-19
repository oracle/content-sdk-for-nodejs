/**
 * Copyright (c) 2019 Oracle and/or its affiliates. All rights reserved.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
/*global require,console,Promise*/
/*jslint node: true,plusplus: true */
'use strict';

var sep = '##########';
var sprintf = require('sprintf-js').sprintf;

var port = process.env.CEC_CONTENTSDK_PORT || 7071;

// create the contentDeliveryClient
var contentSDK = require('../sdk/content.min.js');
var contentClient = contentSDK.createPreviewClient({
	'contentServer': 'http://localhost:' + port,
	'contentVersion': 'v1.1'
});
console.log('');
console.log(sep + ' createPreviewClient - getInfo() ' + sep);
console.log(contentClient.getInfo());
console.log('');

var getTypes = function () {
	var typesPromise = new Promise(function (resolve, reject) {
		console.log(sep + ' createPreviewClient - getTypes() ' + sep);
		console.log('Types:');
		contentClient.getTypes().then(function (result) {
			var items = result && result.items || [];
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				console.log(' ' + item.name);
			}
			console.log('');
			return resolve({});
		});
	});
	return typesPromise;
};

var getType = function (name) {
	var typesPromise = new Promise(function (resolve, reject) {
		console.log(sep + ' createPreviewClient - getType() ' + sep);
		console.log('Type name: ' + name);
		contentClient.getType({
			'typeName': name
		}).then(function (result) {
			console.log('Fields:');
			console.log(sprintf('%-34s %-32s %-10s', 'Field Name', 'Data Type', 'Required'));
			var fields = result.fields || [];
			for(var i = 0; i < fields.length; i++) {
				var field = fields[i];
				var datatype = field.datatype;
				if (field.referenceType) {
					datatype += ' (' + field.referenceType.type + ')';
				}
				console.log(sprintf('%-34s %-32s %-10s', field.name, datatype, field.required));
			}
			console.log('');
			return resolve({});
		});
	});
	return typesPromise;
};

getTypes()
	.then(function () {
		return getType('Starter-Blog-Author');
	})
	.then(function () {
		return getType('Starter-Blog-Post');
	})
	.then(function () {
		console.log(sep + ' Finishes ' + sep);
	});
