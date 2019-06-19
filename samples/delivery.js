/**
 * Copyright (c) 2019 Oracle and/or its affiliates. All rights reserved.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
/*global require,console,Promise*/
/*jslint node: true,plusplus: true */
'use strict';

var sep = '**********';

var port = process.env.CEC_CONTENTSDK_PORT || 7071;

var Marked = require('marked');

// create the contentDeliveryClient
var contentSDK = require('../sdk/content.min.js');
var contentClient = contentSDK.createDeliveryClient({
	'contentServer': 'http://localhost:' + port,
	'contentVersion': 'v1.1'
});
console.log('');
console.log(sep + ' ContentDeliveryClient - getInfo() ' + sep);
console.log(contentClient.getInfo());
console.log('');

// Helper function to parse markdown text.
function parseMarkdown(mdText) {
	if (mdText && /^<!---mde-->\n\r/i.test(mdText)) {
		mdText = mdText.replace("<!---mde-->\n\r", "");
		mdText = Marked(mdText);
	}

	return mdText;
}

var queryItems = function (contentType) {
	var queryItemsPromise = new Promise(function (resolve, reject) {
		console.log(sep + ' ContentDeliveryClient - queryItems() ' + sep);
		console.log('');
		contentClient.queryItems({
			'q': '(type eq "' + contentType + '")'
		}).then(function (result) {
			var items = result && result.items || [];
			console.log('Content type:    Starter-Blog-Post');
			console.log('Number of items: ' + items.length);
			console.log('Items:');
			for (var i = 0; i < items.length; i++) {
				var data = items[i].fields;
				console.log(' ' + data['starter-blog-post_title']);
				if (data['starter-blog-post_header_image']) {
					// create the rendition URL 
					var url = contentClient.getRenditionURL({
						'id': data['starter-blog-post_header_image'].id
					});
					console.log(' ' + url);
				}
				console.log(' ' + data['starter-blog-post_summary']);
				console.log('');
			}
			return resolve({});
		});
	});
	return queryItemsPromise;
};

var getItems = function (ids) {
	var getItemsPromise = new Promise(function (resolve, reject) {
		console.log(sep + ' ContentDeliveryClient - getItems() ' + sep);
		console.log('');
		console.log('Content Ids: ' + ids);
		contentClient.getItems({
			'ids': ids
		}).then(function (result) {
			console.log('Items:');
			var items = result && result.items;
			if (items) {
				Object.keys(items).forEach(function (key) {
					var item = items[key];
					var data = item.fields;
					console.log(' ' + data['starter-blog-post_title']);
					// create the rendition URL 
					if (data['starter-blog-post_header_image']) {
						var url = contentClient.getRenditionURL({
							'id': data['starter-blog-post_header_image'].id
						});
						console.log(' ' + url);
					}
					console.log(' ' + data['starter-blog-post_summary']);
					console.log('');
				});
			}
			return resolve({});
		});
	});
	return getItemsPromise;
};

var dateToMDY = function (date) {
	var dateObj = new Date(date);
	var options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	var formattedDate = dateObj.toLocaleDateString('en-US', options);
	return formattedDate;
};

var getItem = function (id) {
	var getItemPromise = new Promise(function (resolve, reject) {
		console.log(sep + ' ContentDeliveryClient - getItem() ' + sep);
		console.log('');
		console.log('Content Id: ' + id);
		contentClient.getItem({
			'id': id
		}).then(function (result) {
			if (result && result.fields) {
				var item = result;
				var data = item.fields;

				if (data['starter-blog-post_header_image']) {
					data['starter-blog-post_header_image']['url'] = contentClient.getRenditionURL({
						'id': data['starter-blog-post_header_image'].id
					});
				}

				data['starter-blog-post_content'] = contentClient.expandMacros(data['starter-blog-post_content']);

				// get reference item - author
				var authorId = data['starter-blog-post_author'] && data['starter-blog-post_author']['id'];
				var authorPromise = contentClient.getItem({
					id: authorId
				});
				authorPromise.then(function (author) {
					var authorName = author && author.fields && author.fields['starter-blog-author_name'];
					data['starter-blog-post_author']['name'] = authorName;
					data['starter-blog-post_author']['bio'] = parseMarkdown(author && author.fields && author.fields['starter-blog-author_bio']);
					var authorAvatar = author && author.fields && author.fields['starter-blog-author_avatar'];
					if (authorAvatar) {
						// create the rendition URL
						data['starter-blog-post_author']['avatarUrl'] = contentClient.getRenditionURL({
							'id': authorAvatar.id
						});
					}

					var createdOn = dateToMDY(item.updatedDate.value);
					data['metadata'] = authorName ? 'Posted by ' + authorName + ' on ' + createdOn : 'Posted on ' + createdOn;

					var _displayAttr = function (attr, value) {
						console.log(attr + ':');
						console.log(' ' + (value || data[attr]));
					};
					// display item
					console.log(data['metadata']);
					_displayAttr('starter-blog-post_title');
					_displayAttr('starter-blog-post_summary');
					_displayAttr('starter-blog-post_author.name', data['starter-blog-post_author']['name']);
					_displayAttr('starter-blog-post_author.bio', data['starter-blog-post_author']['bio']);
					_displayAttr('starter-blog-post_header_image', data['starter-blog-post_header_image']['url']);
					_displayAttr('starter-blog-post_content');
					console.log('');
				});
			}
		});

	});
	return getItemPromise;
};

queryItems('Starter-Blog-Post')
	.then(function () {
		return getItems(['CORE195955C2A63C419FBEB1E1793C389610', 'CORE6E10572BC43649B4B0AC4BD82AF3F90A']);
	})
	.then(function () {
		return getItem('CORE6E10572BC43649B4B0AC4BD82AF3F90A');
	})
	.then(function () {
		console.log(sep + ' Finishes ' + sep);
	});
