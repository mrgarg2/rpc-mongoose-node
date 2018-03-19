const Rpc = require("mongoose-os-rpc").Rpc;
 
// Instantiate Rpc object using the short format (specifying address property)
// The Rpc object will internally create an instance of an appropriate transport
let rpc = new Rpc({
  address: 'http://192.168.0.119/rpc/'
  // OR: address: 'ws://deviceIpOrName/rpc'
  // OR: address: 'mqtt://deviceIpOrName/esp8266_C6D764'  <-- In this case esp8266_C6D764 is device's name as configured in Mongoose OS
});
 
// Subscribe for error events
rpc.on('error', function(){
  console.log("RPC ERROR");
  console.log(arguments);
})
 
// Subscribe for disconnect events
rpc.on('close', function() {
  console.log("RPC channel was closed!");
});
 
// Subscribe for connect events
// To distinguish between connect and reconnect use isReconnect() function
rpc.on('open', function() {
  console.log("RPC channel was opened!");
 
    if (!rpc.isReconnect()) {
      
      rpc.call("RPC.List", {}, "abc", function(err, result, tag){
        
        console.log("CALLBACK (FS.List)");
        console.log(err);
//        console.log(result);
        console.log("Tag : " + tag);
        
        if (err) {
          // Oops, something went wrong
        } else {
          console.log(result)
        }
                
      });
 
    } else {
      console.log("The underlying transport had reconnected");
    }
    
});