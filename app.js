const Gpio = require('pigpio').Gpio;
// const motor17 = new Gpio(17, {
//   mode: Gpio.OUTPUT
// });
const motor22 = new Gpio(22, {
  mode: Gpio.OUTPUT
});
const motor23 = new Gpio(23, {
  mode: Gpio.OUTPUT
});
const motor24 = new Gpio(24, {
  mode: Gpio.OUTPUT
});
const motor25 = new Gpio(25, {
  mode: Gpio.OUTPUT
});
let pulseWidth = 1000;
let min = 500;
let max = 2500;
let increment = 1.0;
let dir = 1;
const step = 8.0;
let last = Date.now();
setInterval(() => {
  const delta = Date.now() - last;
  last = Date.now();
  if (pulseWidth >= 2500) {
    dir = -1;
  } else if (pulseWidth <= 500) {
    dir = 1;
  }
  const variStep = delta * step * dir;
  pulseWidth = Math.round(pulseWidth + variStep);
  pulseWidth = Math.min(Math.max(pulseWidth, min), max);
  console.log(delta, step, variStep, increment, pulseWidth)
  motor22.servoWrite(pulseWidth);
  motor23.servoWrite(pulseWidth);
  motor24.servoWrite(pulseWidth);
  motor25.servoWrite(pulseWidth);
}, 10);
