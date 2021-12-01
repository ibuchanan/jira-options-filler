# Jira Options Filler

An example JavaScript script for filling up options in a Jira custom select list using the REST API.

## Working with the script

### 0. Start with Node.js 14

Glitch will automatically install Node.js 14
based on the `engines` settings in `package.json`.
For local clones,
you need the LTS [release](https://nodejs.org/en/about/releases/) for 14.

### 1. Create a `.env` file

```bash
ATLASSIAN_SITE_BASE_URL=
ATLASSIAN_ACCOUNT_EMAIL=
ATLASSIAN_ACCOUNT_API_KEY=
ATLASSIAN_SITE_FIELD_ID=
ATLASSIAN_SITE_CONTEXT_ID=
ATLASSIAN_SITE_NUMBER_OF_NEW_OPTIONS=
```

<dl>
    <dt><code>ATLASSIAN_SITE_BASE_URL</code></dt>
        <dd>This script uses <a href="https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ad-hoc-api-calls">ad-hoc API calls</a> so the URL are the same pattern as UI URLs. For example, <code>https://your-domain.atlassian.net/</code>. The script does string concatenation for URL construction so be sure to include the trailing backslash. You will want to run this in a safe environment, like on a <a href="http://go.atlassian.com/cloud-dev">Cloud developer environment</a>.</dd>
    <dt><code>ATLASSIAN_ACCOUNT_EMAIL</code></dt>
        <dd>This script uses <a href="https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/">basic auth</a> so the <code>username</code> in basic auth is an email address associated with an Atlassian account.</dd>
    <dt><code>ATLASSIAN_ACCOUNT_API_KEY</code></dt>
        <dd>This script uses <a href="https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/">basic auth</a> so the <code>password</code> in basic auth is an <a href="https://confluence.atlassian.com/x/Vo71Nw">API token</a>.</dd>
    <dt><code>ATLASSIAN_SITE_FIELD_ID</code></dt>
        <dd>Identifies the field as the target for filling up with option values. You can <a href="https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-search-get">search fields</a> using <code>GET /rest/api/3/field/search</code> with the <code>query</code> parameter to find the field id. For example, <code>GET https://your-domain.atlassian.net/rest/api/3/field/search?query=overload</code> returns <code>{"values": [{"id": "customfield_10443"}]}</code>.</dd>
    <dt><code>ATLASSIAN_SITE_CONTEXT_ID</code></dt>
        <dd>Identifies the context for the option field. You can <a href="https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-search-get">list custom field contexts</a> using <code>GET /rest/api/3/field/{fieldId}/context</code>. For example, <code>GET https://your-domain.atlassian.net/rest/api/3/field/custom_10443/context</code> returns <code>{"values": [{"id": "11110"}]}</code>.</dd>
    <dt><code>ATLASSIAN_SITE_NUMBER_OF_NEW_OPTIONS</code></dt>
        <dd>New options are generated using <a href="https://github.com/marak/Faker.js/">Faker.js</a> because hand-crafted values would be tedious at scale.</dd>
</dl>

### 2. Install dependencies

Glitch will fulfill the dependencies automatically.
For local clones, be sure to `npm install`.

### 3. Run the script

For local clones, `npm start`.