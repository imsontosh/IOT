var serialport = require('serialport');
var portName = 'COM4';
var blynkLib = require('blynk-library');

var AUTH = 'b7fc776fabad4aa1ada2cb204c10f11c';

// Setup Blynk
var blynk = new blynkLib.Blynk(AUTH);

var sp = new serialport.SerialPort(portName, {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: serialport.parsers.readline('\r\n')
});

sp.on('data', function(input) {
  // console.log(input.split(':')[0]);
  // console.log(input.split(':')[1]);
  var tempreture = parseInt(input.split(':')[0]);
  var humidity = parseInt(input.split(':')[1]);

  blynk.virtualWrite(3, parseFloat(input.split(':')[0]).toFixed(1));
  blynk.virtualWrite(4, parseFloat(input.split(':')[1]).toFixed(1));
  if (humidity > 75) {
    console.log('humidity ready');
    blynk.notify(String('humidity is too high'));
  }
  if (tempreture > 35) {
    console.log('tempreture issue');
    blynk.notify(String('tempreture is too high'));
  }
});
