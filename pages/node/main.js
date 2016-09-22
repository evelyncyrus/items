var fs = require('fs');

var data = fs.readFile('file/demo.txt', function(err, data) {
  if(err) {
    return console.error(err);
  } else {
    console.log(data.toString());
  }
});

console.log('程序结束');