const Gpio = require('pigpio').Gpio;
const osc = require("osc");
var oscPort = new osc.UDPPort({
  localAddress: "127.0.0.1",
  localPort: 3333,
  metadata: true
});
// Listen for incoming OSC messages.
// Open the socket.
oscPort.open();
oscPort.on("ready", () => {
  debug('OSC Ready');
});
oscPort.on("message", (oscMsg, timeTag, info) => {
  let address = oscMsg.address.toLowerCase();
  let data = _.map(oscMsg.args, a => a.value);
  console.log(address, data);
});
const motor17 = new Gpio(17, {
  mode: Gpio.OUTPUT
});
const motor22 = new Gpio(22, {
  mode: Gpio.OUTPUT
});
const motor24 = new Gpio(24, {
  mode: Gpio.OUTPUT
});
const motor25 = new Gpio(25, {
  mode: Gpio.OUTPUT
});
let deg = 0.0;
let min = -90.0;
let max = 90.0;
let increment = 1.0;
let dir = 1;
const step = 0.1;
let last = Date.now() - 1000;
doStep();

function doStep() {
  const delta = Date.now() - last;
  last = Date.now();
  if (deg >= max) {
    dir = -1;
  } else if (deg <= min) {
    dir = 1;
  }
  const variStep = delta * step * dir;
  deg = Math.round(deg + variStep);
  const pulseWidth = degToPw(deg);
  // console.log(deg, pulseWidth);
  motor17.servoWrite(pulseWidth);
  motor22.servoWrite(pulseWidth);
  motor24.servoWrite(pulseWidth);
  motor25.servoWrite(pulseWidth);
  setTimeout(doStep, 100);
}

function degToPw(deg) {
  const minP = 500;
  const maxP = 2500;
  const minD = -90;
  const maxD = 90;
  let pulseWidth = Math.round(((deg - minD) / (maxD - minD)) * (maxP - minP)) + minP
  pulseWidth = Math.min(Math.max(pulseWidth, minP), maxP);
  return pulseWidth;
}
