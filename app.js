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
let increment = 100;
const step = 1;
let last = Date.now();
setInterval(() => {
  const delta = Date.now() - last;
  last = Date.now();
  motor22.servoWrite(pulseWidth);
  motor23.servoWrite(pulseWidth);
  motor24.servoWrite(pulseWidth);
  motor25.servoWrite(pulseWidth);
  pulseWidth = Math.round(pulseWidth + increment);
  pulseWidth = Math.min(Math.max(pulseWidth, min), max);
  console.log(increment,pulseWidth)
  if (pulseWidth >= 2500) {
    increment = -delta * step;
  } else if (pulseWidth <= 500) {
    increment = delta * step;
  }
}, 10);
