function logger1(source){
  console.log('log1');
  return source + "// logger 1";
}

logger1.pitch = function(source){
  console.log('log1 pitch');
}
module.exports = logger1;