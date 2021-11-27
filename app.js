const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');
let servo1,servo2,servo3,servo4;
raspi.init(() => {
  servo1 = new pwm.SoftPWM(11);
  servo2 = new pwm.SoftPWM('GPIO22');
  servo3 = new pwm.SoftPWM('GPIO23');
  servo4 = new pwm.SoftPWM('GPIO24');
  cycleServos();
});

function cycleServos() {
console.log(0);
servo1.write(0);
servo2.write(0);
servo3.write(0);
servo4.write(0);
  setTimeout(() => {
    console.log(1);
    servo1.write(1);
    servo2.write(1);
    servo3.write(1);
    servo4.write(1);
    setTimeout(cycleServos, 2000);
  }, 2000)
}
