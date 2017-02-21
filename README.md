# botkit-helper-slack
#### Helps Slack bots get their point across


Never have to look up how to use **bold**, *italics*, ~~strikethrough~~, `code`, ```pre```... formats again for [Slack API](https://api.slack.com/docs/message-formatting) (I still had to look it all up for this [Github Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) though).

### Getting started
```sh
$ npm install --save botkit-helper-slack
```
___
### Usage
```javascript
var SS = require('botkit-slack-helper');

SS('My Emphatic Decree!').italic()  // -> '_My Emphatic Decree!_' (in Slack italics)

// or
SS.extendPrototype()
'var meta = x'.slackCode() // -> '`var meta = x`' (in Slack code format)
```

### Methods
Calling `extendPrototype()` will extend the Javascript `String` prototype, but in order to not poison the
`String` namespace, each function name will start with 'slack' and maintain camelCase format

e.g. italic -> slackItalic
```javascript
SS('I really need to italicize this').italic() //-> "_I really need to italicize this_"

// or extend the String prototype
SS.extendPrototype()
'and this one'.slackItalic() //-> "_and this one_"
```
##### .italic( ) (slackItalic)
Italicizes your string according to Slack format  
`'italics'` -> `'_italics_'`  
_italics_

##### .bold( )  (slackBold)
Bolds your string according to Slack format  
`'bold'` -> `'*bold*'`  
**bold**

##### .code( ) (slackCode)
Makes your string look like `code` according to Slack format  
`'code'` -> '\`code\`'  
`code`

##### .pre( ) (slackPre)
Makes your string look like `pre-formatted fixed width text` according to Slack format  
`'pre'` -> `'```pre```'`
```
pre
```

##### .strike( ) (slackStrike)
Strikes through your string, according to Slack format  
`'strike'` -> `'~strike~'`  
~~strike~~

##### .quote( ) (slackQuote)
Creates a single line quote. This function **does not** surround your string with quotes.
`'quote'` -> `'> quote'`
> quote

##### .paragraph( ) (slackParagraph)
Creates a multi-line quote.  
`'paragraph'` -> `'>>> paragraph'`
> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris

##### .emoji( ) (slackEmoji)
Formats your string into Slack emoji style.
```javascript
('Do NOT Litter').emoji( ) //-> ':do_not_litter:'`
```
:do_not_litter:

##### .user( ) (slackUser)
Formats your user ID into Slack's desired format  
`'U112233'` -> `'<@U112233>'`

##### .channel( ) (slackChannel)
Formats your channel ID into Slack's desired format  
`'C445566'` -> `'<@C445566>'`

##### .subteam(handle) (slackSubteam)
Will create message linking to the subteam ID viewed as _required_ @`handle`
```javascript
// having called extendPrototype()
'S289524'.slackSubteam('the-homies') //-> '<!subteam^S289524|the-homies>'
```

##### .url(handle) (slackSubteam)
Creates a formatted link displayed as _optional_ `handle`
```javascript
// having called extendPrototype()
'https://mfix22.github.io'.slackUrl('My Portfolio') //-> '<https://mfix22.github.io/|My Portfolio>'
```
[My Portfolio](https://mfix22.github.io)

##### .email(handle) (slackEmail)
Creates a formatted mailto: email link displayed at `handle`
```javascript
// having called extendPrototype()
'admin@squadup.io'.slackEmail('Email Me') //-> '<mailto:admin@squadup.io|Email Me>'
```
[Email Me](mailto:admin@squadup.io)

##### .atHere( ) (slackAtHere)
See `get('here')`

##### .atEveryone( ) (slackAtEveryone)
See `get('everyone')`

##### .atGroup( ) (slackAtGroup)
See `get('group')`

##### .atChannel( ) (slackAtChannel)
See `get('channel')`

##### .html( ) (slackHtml)
Formats your HTML code using Slack desired format.
```javascript
SS('<div></div>').html() //-> '&lt;div&gt;&lt;/div&gt;
```

### Helpers
Other functions to help you format Slack messages
##### .get(key)
Will return the corresponding string `value` for each `key` below.

|key         |value (string)    
|------------|------------------
|'bullet'    |•                 
|'here'      |<!here&#124;here>
|'channel'   |<!channel>        
|'group'     |<!group>         
|'everyone'  |<!everyone>       

### Test
```sh
$ npm test
```
