const express = require('express');

function serve() {
  const app = express();
  app.use(express.static('./'));
  const port = process.env.PORT || 3000;
  app.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log('');
    console.log('-------------------------------------------------');
    console.log(`Development server listening on port ${port}:`);
    console.log(`http://localhost:${port}`);
    console.log('-------------------------------------------------');
    console.log('');
  });
}

module.exports = serve;
