const convict = require('convict')
const { email, url } = require('convict-format-with-validator');
const { getConfig } = require('convict-dotenv');

convict.addFormat(email);
convict.addFormat(url);

// Define a schema
const schema = {
  env: {
    doc:
      "The NODE_ENV environment variable specifies the environment in which an application is running.",
    format: ["production", "development"],
    default: "development",
    env: "NODE_ENV",
  },
  baseUrl: {
    doc: "The Base URL is where users access Jira Cloud.",
    format: "url",
    default: null,
    env: "ATLASSIAN_SITE_BASE_URL",
    arg: "baseUrl",
  },
  username: {
    doc: "The username is the email used to login to Jira Cloud.",
    format: "email",
    default: null,
    env: "ATLASSIAN_ACCOUNT_EMAIL",
    arg: "username",
  },
  apiToken: {
    doc: "The API token is a secret that authenticates with Jira Cloud.",
    format: String,
    default: null,
    env: "ATLASSIAN_ACCOUNT_API_KEY",
    arg: "apiToken",
  },
  fieldId: {
    doc: "The field id identifies which option field will get new options.",
    format: String,
    default: null,
    env: "ATLASSIAN_SITE_FIELD_ID",
    arg: "fieldId",
  },
  contextId: {
    doc: "The context id is required to know where the options appear.",
    format: "int",
    default: null,
    env: "ATLASSIAN_SITE_CONTEXT_ID",
    arg: "contextId",
  },
  numOptions: {
    doc: "The number of new options is the count of fake options to add.",
    format: "int",
    default: null,
    env: "ATLASSIAN_SITE_NUMBER_OF_NEW_OPTIONS",
    arg: "numOptions",
  }
};

const config = getConfig(schema);
module.exports = config;