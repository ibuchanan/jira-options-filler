const fetch = require('cross-fetch');
const faker = require('faker');
const config = require('./config');

faker.seed(config.numOptions);
var bodyData = {};
bodyData.options = new Array();
for (var i = 0; i < config.numOptions; i++) {
  bodyData.options.push({
    "disabled": false,
    "value": faker.fake("{{commerce.productAdjective}} {{random.word}} {{commerce.product}} {{system.semver}}")
  })
}

fetch(`${config.baseUrl}/rest/api/3/field/${config.fieldId}/context/${config.contextId}/option`, {
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
  .catch(err => console.error(err));