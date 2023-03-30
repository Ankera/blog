function logger3(source){
  console.log('log3');
  return source + "// logger 3";
}

logger3.pitch = function(source){
  console.log('log3 pitch');
  // return 'var a = 1;'
}
module.exports = logger3;