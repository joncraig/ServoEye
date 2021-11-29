const Gpio = require('pigpio').Gpio;
const dgram = require('dgram');
const osc = require("osc-min");
const sock = dgram.createSocket("udp4", function (msg, rinfo) {
  var error, error1;
  try {
    onMessage(osc.fromBuffer(msg));
  } catch (error1) {
    error = error1;
    return console.log("invalid OSC packet");
  }
});
let degX = 0.0;
let degY = 0.0;
let min = -90.0;
let max = 90.0;
let increment = 1.0;
let dir = 1;
let step = 0.1;
let rate = 10;
sock.bind(3333);

function onMessage(msg) {
  if (msg.oscType != 'message') {
    console.log(msg);
    return;
  }
  // if (msg.address == '/step') {
  //   step = msg.args[0].value;
  // } else if (msg.address == '/rate') {
  //   rate = msg.args[0].value;
  // } else if (msg.address == '/deg') {
  //   degX = msg.args[0].value;
  // } else
  if (msg.address == '/eyeDirection') {
    degX = msg.args[0].value;
    degY = msg.args[1].value;
  } else {
    console.log(msg);
  }
}
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
let last = Date.now() - 1000;
doStep();

function doStep() {
  const delta = Date.now() - last;
  last = Date.now();
  motor17.servoWrite(degXToPw(degX));
  motor22.servoWrite(degXToPw(degY));
  // motor24.servoWrite(pulseWidth);
  // motor25.servoWrite(pulseWidth);
  setTimeout(doStep, rate);
}

function degXToPw(degX) {
  const minP = 500;
  const maxP = 2500;
  const minD = -90;
  const maxD = 90;
  let pulseWidth = Math.round(((degX - minD) / (maxD - minD)) * (maxP - minP)) + minP
  pulseWidth = Math.min(Math.max(pulseWidth, minP), maxP);
  return pulseWidth;
}
