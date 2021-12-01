// cross-fetch is a simple http client
// similar enough to node-fetch
// but avoids problems with require().
const fetch = require('cross-fetch');
// faker provides fake data
// making it easy to generate many options
const faker = require('faker');
// config, in turn, leverages convict
// to grab configuration values out of the .env file
// (and other ways of passing data)
const config = require('./config');

// The same fake data will be generated for the same seed.
faker.seed(config.numOptions);
var bodyData = {};
bodyData.options = new Array();
for (var i = 0; i < config.numOptions; i++) {
  bodyData.options.push({
    "disabled": false,
    // Jira will reject the whole request if any are duplicates.
    // Faker's word data sets are too small to avoid duplication at scale.
    // `system.semver` brings enough entropy to avoid collisions up to 1000.
    "value": faker.fake("{{commerce.productAdjective}} {{commerce.product}} {{system.semver}}")
  })
}

// Create custom field options (context)
// POST /rest/api/3/field/{fieldId}/context/{contextId}/option
// https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-post
fetch(`${config.baseUrl}/rest/api/3/field/${config.fieldId}/context/${config.contextId}/option`, {
  // POST means always adding new values.
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      config.username + ':' + config.apiToken
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bodyData)
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch((err) => {
    console.error(err);
    // If things go wrong, show the data that got sent.
    console.error(JSON.stringify(bodyData));
  })