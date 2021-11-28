const Gpio = require('pigpio').Gpio;
// const motor17 = new Gpio(17, {
//   mode: Gpio.OUTPUT
// });
const motor22 = new Gpio(22, {
  mode: Gpio.OUTPUT
});
const motor17 = new Gpio(17, {
  mode: Gpio.OUTPUT
});
const motor24 = new Gpio(24, {
  mode: Gpio.OUTPUT
});
const motor25 = new Gpio(25, {
  mode: Gpio.OUTPUT
});
let pulseWidth = 1000;
let min = 850;
let max = 2150;
let increment = 1.0;
let dir = 1;
const step = 4.0;
let last = Date.now()-1000;
doStep();

function doStep() {
  const delta = Date.now() - last;
  last = Date.now();
  if (pulseWidth >= max) {
    dir = -1;
    console.log(dir, pulseWidth)
  } else if (pulseWidth <= min) {
    dir = 1;
    console.log(dir, pulseWidth)
  }
  const variStep = delta * step * dir;
  pulseWidth = Math.round(pulseWidth + variStep);
  pulseWidth = Math.min(Math.max(pulseWidth, min), max);
  //motor22.servoWrite(pulseWidth);
   motor17.servoWrite(pulseWidth);
  // motor24.servoWrite(pulseWidth);
   //motor25.servoWrite(pulseWidth);
  setTimeout(doStep, 250);
}
