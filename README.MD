# This project has been superseded by the [Content Management SDK](http://github.com/oracle/content-management-sdk).
---

## Content and Experience Cloud - Content JS SDK (NodeJS)
The Content SDK for Oracle Content and Experience Cloud is a light-weight JavaScript wrapper that interacts with the Content REST APIs. This read-only SDK retrieves structured content, digital assets, and content layouts that are managed in Content and Experience Cloud.  The Content SDK allows you to write a NodeJS application that is content rich - allowing the use of Content and Experience Cloud for a comprehensive Content management, authoring and approval, and delivering on your own channel through your NodeJS application.

The Content SDK consists of three main modules:

- ContentSDK: The main entry-point object. The ContentSDK object lets you create client objects to access content based on your requirements.
- ContentDeliveryClient : A client object that is set up to access published content items and digital assets.
- ContentPreviewClient : A client object that is set up to access content types, draft content items, and draft digital assets. 

The Content SDK for NodeJS provides a NodeJS runtime to support two samples, one for testing the Delivery client, and the other for the Preview client.  The samples provide code examples of how to integrated Content from Content and Experience Cloud into your own NodeJS application.

### Documentation

Developing for Oracle Content and Experience Cloud
[https://docs.oracle.com/en/cloud/paas/content-cloud/developer/content-sdk.html](https://docs.oracle.com/en/cloud/paas/content-cloud/developer/content-sdk.html)

Content JS SDK - JS Doc
[https://docs.oracle.com/en/cloud/paas/content-cloud/sdk-content-delivery/ContentSDK.html](https://docs.oracle.com/en/cloud/paas/content-cloud/sdk-content-delivery/ContentSDK.html)

Administering Oracle Content and Experience Cloud
[https://docs.oracle.com/en/cloud/paas/content-cloud/administer/use-rest-apis-sites-sdk-and-content-delivery-sdk.html](https://docs.oracle.com/en/cloud/paas/content-cloud/administer/use-rest-apis-sites-sdk-and-content-delivery-sdk.html)

Integrating Oracle Content and Experience Cloud
[https://docs.oracle.com/en/cloud/paas/content-cloud/solutions/use-rest-apis-sites-sdk-and-content-delivery-sdk.html](https://docs.oracle.com/en/cloud/paas/content-cloud/solutions/use-rest-apis-sites-sdk-and-content-delivery-sdk.html)

### Installation
Prerequisite: node.js 10.9.0 or later, and node and npm on your path.

`npm install`

### Start Local Server

`npm start`

## Run Delivery Client Samples

`node ./samples/delivery.js`

### Run PreviewClient Samples

`node ./samples/preview.js`
