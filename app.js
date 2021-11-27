const Gpio = require('pigpio').Gpio;
const motor17 = new Gpio(17, {
  mode: Gpio.OUTPUT
});
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
let increment = 100;
const step = 0.25;
let last = Date.now();
setInterval(() => {
  const delta = Date.now() - last;
  let last = Date.now();
  motor17.servoWrite(pulseWidth);
  motor22.servoWrite(pulseWidth);
  motor23.servoWrite(pulseWidth);
  motor24.servoWrite(pulseWidth);
  motor25.servoWrite(pulseWidth);
  pulseWidth += increment;
  if (pulseWidth >= 2000) {
    increment = -delta * step;
  } else if (pulseWidth <= 1000) {
    increment = delta * step;
  }
}, 10);
