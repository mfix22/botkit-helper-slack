require('../index').extendPrototype();

console.log('_My italic message_');
console.log('*My bold message*');
console.log('`My code message`');
console.log('```My pre message```');
console.log('~My strikethrough message~');
console.log('Do NOT litter'.slackEmoji());
console.log('<@U123456>');
console.log('<!subteam^S123456|sub-team>');
console.log('<https://google.com|google.com>');
console.log('<mailto:test@gmail.com|Test>');
console.log('<!here|here>');
console.log('<!everyone>');
console.log('<!group>');
console.log('<!channel>');
console.log('> My quote message');
console.log('>>> My paragraph message');
