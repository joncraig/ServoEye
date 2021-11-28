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
let deg = 0.0;
let min = -90.0;
let max = 90.0;
let increment = 1.0;
let dir = 1;
let step = 0.1;
let rate = 100;
sock.bind(3333);

function onMessage(msg) {
  if (msg.oscType != 'message') {
    console.log(msg);
    return;
  }
  if (msg.address == '/step') {
    step = msg.args[0].value;
  }
  if (msg.address == '/rate') {
    rate = msg.args[0].value;
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
  setTimeout(doStep, rate);
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
