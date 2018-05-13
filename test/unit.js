var assert = require('assert');
var ss = require('../index');

assert.equal(ss('My italic message').italic(), '_My italic message_');
assert.equal(ss('My bold message').bold(), '*My bold message*');
assert.equal(ss('My code message').code(), '`My code message`');
assert.equal(ss('My pre message').pre(), '```My pre message```');
assert.equal(ss('My strikethrough message').strike(), '~My strikethrough message~');
assert.equal(ss('My paragraph message').paragraph(), '>>> My paragraph message');
assert.equal(ss('My quote message').quote(), '> My quote message');
assert.equal(ss('Do NOT litter').emoji(), ':do_not_litter:');
assert.equal(ss('My pre message').pre(), '```My pre message```');
assert.equal(ss('U123456').user(), '<@U123456>');
assert.equal(ss('C123456').channel(), '<@C123456>');
assert.equal(ss('S123456').subteam('sub-team'), '<!subteam^S123456|sub-team>');
assert.equal(ss('S123456').subteam('sub-team'), '<!subteam^S123456|sub-team>');
assert.equal(ss('1526249506').date(), '<!date^1526249506^{date}|Sun, 13 May 2018 22:11:46 GMT>');
assert.equal(ss('2018-05-13').date(), '<!date^1526169600^{date}|Sun, 13 May 2018 00:00:00 GMT>');
assert.equal(ss(1526249506).date(), '<!date^1526249506^{date}|Sun, 13 May 2018 22:11:46 GMT>');
assert.equal(ss(new Date(1526249506)).date(), '<!date^1526249506^{date}|Sun, 13 May 2018 22:11:46 GMT>');
assert.equal(ss(1526249506).date({format:'{time}', link:'link', fallback: 'fallback'}), '<!date^1526249506^{time}^link|fallback>');
assert.equal(ss('https://google.com').url('google.com'), '<https://google.com|google.com>');
assert.equal(ss('test@gmail.com').email('Test'), '<mailto:test@gmail.com|Test>');
assert.equal(ss('<div></div>').html(), '&lt;div&gt;&lt;/div&gt;');
assert.equal(ss().atHere(), '<!here|here>');
assert.equal(ss().atEveryone(), '<!everyone>');
assert.equal(ss().atGroup(), '<!group>');
assert.equal(ss().atChannel(), '<!channel>');
assert.equal(ss.get('bullet'), '•');


ss.extendPrototype();
assert.equal('My italic message'.slackItalic(), '_My italic message_');
assert.equal('My bold message'.slackBold(), '*My bold message*');
assert.equal('My code message'.slackCode(), '`My code message`');
assert.equal('My pre message'.slackPre(), '```My pre message```');
assert.equal('My strikethrough message'.slackStrike(), '~My strikethrough message~');
assert.equal('My paragraph message'.slackParagraph(), '>>> My paragraph message');
assert.equal('My quote message'.slackQuote(), '> My quote message');
assert.equal('Do NOT litter'.slackEmoji(), ':do_not_litter:');
assert.equal('My pre message'.slackPre(), '```My pre message```');
assert.equal('U123456'.slackUser(), '<@U123456>');
assert.equal('C123456'.slackChannel(), '<@C123456>');
assert.equal('S123456'.slackSubteam('sub-team'), '<!subteam^S123456|sub-team>');
assert.equal('1526249506'.slackDate(), '<!date^1526249506^{date}|Sun, 13 May 2018 22:11:46 GMT>');
assert.equal('1526249506'.slackDate({format: '{time}', link: 'link', fallback: 'fallback'}), '<!date^1526249506^{time}^link|fallback>');
assert.equal('https://google.com'.slackUrl('google.com'), '<https://google.com|google.com>');
assert.equal('test@gmail.com'.slackEmail('Test'), '<mailto:test@gmail.com|Test>');
assert.equal('<div></div>'.slackHtml(), '&lt;div&gt;&lt;/div&gt;');
assert.equal(''.slackAtHere(), '<!here|here>');
assert.equal(''.slackAtEveryone(), '<!everyone>');
assert.equal(''.slackAtGroup(), '<!group>');
assert.equal(''.slackAtChannel(), '<!channel>');
assert.equal(ss.get('bullet'), '•');
