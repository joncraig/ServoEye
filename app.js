const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');
let servo1;
raspi.init(() => {
  servo1 = new pwm.SoftPWM('GPIO11');
  cycleServos();
});

function cycleServos() {
  servo1.write(0);
  setTimeout(() => {
    servo1.write(1);
    setTimeout(cycleServos, 2000);
  }, 2000)
}
