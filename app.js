const Gpio = require('pigpio').Gpio;
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
const step = 0.5;
let last = Date.now() - 1000;
doStep();

function doStep() {
  const delta = Date.now() - last;
  last = Date.now();
  if (deg >= max) {
    dir = -1;
    console.log(dir, deg)
  } else if (deg <= min) {
    dir = 1;
    console.log(dir, deg)
  }
  const variStep = delta * step * dir;
  deg = Math.round(deg + variStep);
  const pulseWidth = degToPw(deg);
  console.log(pulseWidth);
  motor17.servoWrite(pulseWidth);
  motor22.servoWrite(pulseWidth);
  motor24.servoWrite(pulseWidth);
  motor25.servoWrite(pulseWidth);
  setTimeout(doStep, 250);
}

function degToPw(deg) {
  const minP = 500;
  const minD = -90;
  const maxP = 2500;
  const maxD = 90;
  let pulseWidth = Math.round(deg / (maxD - minD) * (maxP - minP))
  pulseWidth = Math.min(Math.max(pulseWidth, minP), maxP);
  return pulseWidth;
}
