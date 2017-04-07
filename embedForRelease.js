const fs = require('fs');

fs.readFile('dest/bundle.js', 'utf8', (err, js) => {
  fs.readFile('dest/index.html', 'utf8', (err, html) => {
    html = html.replace('<script type="text/javascript" src="./bundle.js"></script>', `<script>${js}</script>`);
    fs.writeFileSync('docs/index.html', html);
  });
});

