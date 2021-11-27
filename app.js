// const raspi = require('raspi');
// const pwm = require('raspi-soft-pwm');
// let servo1,servo2,servo3,servo4;
// raspi.init(() => {
//   servo1 = new pwm.SoftPWM('GPIO17');
//   servo2 = new pwm.SoftPWM('GPIO22');
//   servo3 = new pwm.SoftPWM('GPIO23');
//   servo4 = new pwm.SoftPWM('GPIO24');
//   cycleServos();
//   console.log(servo1)
// });
//
// function cycleServos() {
// console.log(0);
// servo1.write(0);
// servo2.write(0);
// servo3.write(0);
// servo4.write(0);
//   setTimeout(() => {
//     console.log(1);
//     servo1.write(1);
//     servo2.write(1);
//     servo3.write(1);
//     servo4.write(1);
//     setTimeout(cycleServos, 2000);
//   }, 2000)
// }
var piblaster = require('pi-servo-blaster.js');

function angleToPercent(angle) {
  return Math.floor((angle/180) * 100);
}

var curAngle = 0;
var direction = 1;
setInterval(() => {
  piblaster.setServoPwm("GPIO17", angleToPercent(curAngle) + "%");
  console.log("Setting angle at: ", curAngle, angleToPercent(curAngle));
  curAngle += direction;
  // Change direction when it exceeds the max angle.
  if (curAngle >= 180) {
    direction = -1;
  } else if (curAngle <= 0) {
    direction = 1;
  }
}, 10);
