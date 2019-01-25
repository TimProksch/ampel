const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const { spawn } = require( 'child_process' ),
fun = (req, res) => {
//conslog(req.url)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Ampel\n');
  var url = req.url
  var par = url.split("/")
  var light = par[1]
  var onof = par[2]
  function l(light)  {
  // body...

  if (light ==="red") {
    var colour = 0
  }
  if (light === "yellow" ) {
    var colour = 1
  }
  if (light === "green"){
    var colour = 2
  }
  cmd = spawn( './clewarecontrol.dms',  ["-c" , "1" , "-as" , colour , onof ]);
          cmd.stdout.on( 'data', data => console.log( `stdout: ${data}` ) );
          cmd.stderr.on( 'data', data => console.log( `stderr: ${data}` ) );
          cmd.on( 'error', code => console.log( `child process exited with code ${code}` ) );
  }
  if ( par.length == 3 ) {
  switch(onof) {
     case "0" :
      switch(light) {
       case "green":
             l(light)
          break
       case "red":
          l(light)
          break
       case "yellow":
         l(light)
          break
       default:
        console.log("Cant find colour please only use red, yellow or green")
      }
     break
     case "1":
      switch(light) {
       case "green":
         l(light)
          break
       case "red":       
          l(light)
          break
       case "yellow":
          l(light)
          break
       default:
          console.log("Cant find colour please only use red, yellow or green")
      }        
     break
     default:
          console.log("please enter 1 for the light to turn on or 0 to turn it off")
  }        
}
  else { console.log ( "url not excepted" ) }     
res.end('Ampel\n');
}
const server = http.createServer(fun);
server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`)
})