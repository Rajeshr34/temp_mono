const config = require('conventional-changelog-conventionalcommits')

const commitPartial = `
*{{#if scope}} **{{scope}}:**
{{~/if}} {{#if subject}}
  {{~subject}}
{{~else}}
  {{~header}}
{{~/if}}

{{~!-- commit link --}}{{~#if hash}} {{#if @root.linkReferences~}}
  ([{{shortHash}}]({{commitUrlFormat}}))
{{~else}}
  {{~shortHash}}
{{~/if}}{{~/if}}

{{~!-- commit references --}}
{{~#if references~}}
  , closes
  {{~#each references}} {{#if @root.linkReferences~}}
    [
    {{~#if this.owner}}
      {{~this.owner}}/
    {{~/if}}
    {{~this.repository}}{{this.prefix}}{{this.issue}}]({{issueUrlFormat}})
  {{~else}}
    {{~#if this.owner}}
      {{~this.owner}}/
    {{~/if}}
    {{~this.repository}}{{this.prefix}}{{this.issue}}
  {{~/if}}{{/each}}
{{~/if}}
{{#if body}}
  <br/>
  {{body}} // The addition
{{~/if}}
`

module.exports = config({
    issuePrefixes: ['TEST-'],
    issueUrlFormat: 'myBugTracker.com/{prefix}{id}',
}).then((preset) => {
    preset.conventionalChangelog.writerOpts.commitPartial = commitPartial
    return preset
})
