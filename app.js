const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');
let servo1;
raspi.init(() => {
  servo1 = new pwm.SoftPWM('GPIO17');
  cycleServos();
});

function cycleServos() {
console.log(0);
  servo1.write(0);
  setTimeout(() => {
    console.log(1);
    servo1.write(1);
    setTimeout(cycleServos, 2000);
  }, 2000)
}
