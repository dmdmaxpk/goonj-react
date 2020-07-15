const EdgeAuth = require('akamai-edgeauth');
const http = require('http') // Module for the test


var EA_HOSTNAME = 'alpha.goonj.pk'
var EA_ENCRYPTION_KEY = '72fb58000a0d1561f60da877b5a009fb' 
var DURATION = 500 // seconds

var ea = new EdgeAuth({
    key: EA_ENCRYPTION_KEY,
    windowSeconds: DURATION,
    escapeEarly: false
})
var token = ea.generateURLToken("/*");
console.log("token token", token);
localStorage.setItem('streamingToken', token)
var options = {
    hostname: EA_HOSTNAME,
    path: "//kaios.streamax.io",
    encoding: false,
    headers: {[ea.options.tokenName]: token}
}

// Function just for the simple test
export function makeRequest(options) {
    var request = http.request(options, function(res){
        // callback(res);
        console.log(res)
    })
    request.on('error', (err) => {
        // callback(err);
        console.log(err);
    })
    request.end()
}