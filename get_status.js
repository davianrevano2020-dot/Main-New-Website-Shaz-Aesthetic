const http = require('http');
http.get('http://localhost:3000/reviews', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
});
