const http = require('http');

http.get('http://localhost:3000/back-office/reviews', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      console.log(data.substring(0, 1000));
    }
  });
}).on('error', (err) => {
  console.log(`Error: ${err.message}`);
});
