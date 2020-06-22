const PoweredUP = require("node-poweredup");
const poweredUP = new PoweredUP.PoweredUP();

// NEED TO DO:
// npm install xmlhttprequest 
// npm install jsdom 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; // Need this to use XMLHttpRequest since this is a nodejs file
const jsdom = require("jsdom"); // Need this to use jsdom and parse html string 
const { JSDOM } = jsdom; // JSDOM Constructor 

function GetInfo(name){ 
    var key = "7f9c8b30-9ae0-43b8-89f1-d796ca1a757c"; 
    var url = "https://pp-1909111719d4.portal.ptc.io/Thingworx/Things/RealityEngine/Properties/" + name;
    html_text = httpGet(url,key); // Gets the html String
    const dom = new JSDOM(html_text); // Begin to parse 
    return dom.window.document.querySelector("TD").textContent; //Gets html TD tag (parsed text)
}
function httpGet(url,key){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.setRequestHeader("AppKey",key);
    xmlHttp.setRequestHeader("Accept","application/json");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send();
    return xmlHttp.responseText;
}


function PutInfo(name,val){ 
    var key = "7f9c8b30-9ae0-43b8-89f1-d796ca1a757c"; 
    var url = "https://pp-1909111719d4.portal.ptc.io/Thingworx/Things/RealityEngine/Properties/" + name;
    httpPut(url,key,name,val); 
}
function httpPut(url,key,name,val){
    var xmlHttp = new XMLHttpRequest();
    var propValue = {[name]:val}; // This updates only LEGO_BOOST name in Thingworx
    xmlHttp.open("PUT", url, false);
    xmlHttp.setRequestHeader("AppKey",key);
    xmlHttp.setRequestHeader("Accept","application/json");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify(propValue));
}

// PutInfo("LEGO_BOOST","It work!");
while (true) {
    console.log("The r value is: " + GetInfo("Boost_r"));
    console.log("The g value is: " + GetInfo("Boost_g"));
    console.log("The b value is: " + GetInfo("Boost_b"));
    console.log("\n");
    console.log("\n");
    console.log("\n");
}

poweredUP.on("discover", async (hub) => { // Wait to discover a Hub
    console.log(`Discovered ${hub.name}!`);
    await hub.connect(); // Connect to the Hub
    const motorA = await hub.waitForDeviceAtPort("A"); // Make sure a motor is plugged into port A
    const motorB = await hub.waitForDeviceAtPort("B"); // Make sure a motor is plugged into port B
    console.log("Connected");

    console.log("Running motor B and A at speed 50");
    motorB.setPower(30);
    motorA.setPower(35);
    await hub.sleep(2000); // Do nothing for 2 seconds
    motorB.brake(); // Stop motor B
    motorA.brake(); // Stop motor A 
    console.log("Running motor B speed 50");
    motorB.setPower(100);
    await hub.sleep(1000); // Do nothing for 1 seconds
    motorB.brake();
    motorB.setPower(30);
    motorA.setPower(35);
    await hub.sleep(2000); // Do nothing for 2 seconds
    motorB.brake(); // Stop motor B
    motorA.brake(); // Stop motor A 
});

poweredUP.scan(); // Start scanning for Hubs
console.log("Scanning for Hubs...");



    // while (true) { // Repeat indefinitely
    //     console.log("Running motor B at speed 50");
    //     motorB.setPower(50); // Start a motor attached to port B to run a 3/4 speed (75) indefinitely
    //     console.log("Running motor A at speed 100 for 2 seconds");
    //     motorA.setPower(100); // Run a motor attached to port A for 2 seconds at maximum speed (100) then stop
    //     await hub.sleep(2000);
    //     motorA.brake();
    //     await hub.sleep(1000); // Do nothing for 1 second
    //     console.log("Running motor A at speed -30 for 1 second");
    //     motorA.setPower(-30); // Run a motor attached to port A for 2 seconds at 1/2 speed in reverse (-50) then stop
    //     await hub.sleep(2000);
    //     motorA.brake();
    //     await hub.sleep(1000); // Do nothing for 1 second
    // }