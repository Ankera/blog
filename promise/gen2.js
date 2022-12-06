const fs = require('fs').promises;

function* read () {
  const name = yield fs.readFile('name.txt', 'utf8');
  const age = yield fs.readFile(name, 'utf8');

  return age;
}
