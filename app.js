const Gpio = require('pigpio').Gpio;
const OSC = require('osc-js');
const osc = new OSC()
osc.on('/rate', (message, rinfo) => {
  console.log(message.args)
  console.log(rinfo)
})
osc.on('/step', (message, rinfo) => {
  console.log(message.args)
  console.log(rinfo)
})
osc.on('*', message => {
  console.log(message.args)
})
osc.open({
  port: 3333
})
// var oscServer = new Server(3333, '0.0.0.0', () => {
//   console.log('OSC Server is listening');
// });
// oscServer.on('message', function (msg) {
//   console.log(`Message: ${msg}`);
//   oscServer.close();
// });
// const motor17 = new Gpio(17, {
//   mode: Gpio.OUTPUT
// });
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
