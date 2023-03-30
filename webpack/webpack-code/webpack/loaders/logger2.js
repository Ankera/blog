function logger2(source){
  console.log('log2');
  return source + "// logger 2";
}

logger2.pitch = function(source){
  console.log('log2 pitch');
}

module.exports = logger2;