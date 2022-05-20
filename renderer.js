// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.




// initialization

const { SerialPort } = require("serialport");
const fs = require('fs');

// let btnC = document.getElementById('buttonC');
// let sendWC = document.getElementById('sendWordCount');
// let sendBC = document.getElementById('sendByteCount');
// let sendWC2 = document.getElementById('sendWordCount2');
// let sendBC2 = document.getElementById('sendByteCount2');

let buttonCOM = document.getElementById('buttonCOM');
let inputSerial = document.getElementById('serial');
let readButtons = document.querySelectorAll('.buttonRead');
let btnRefresh = document.querySelectorAll('.buttonRefresh');
let sendValues = document.getElementById('sendValues');
let sendValues2 = document.getElementById('sendValues2');
let sendValues3 = document.getElementById('sendValues3');
let sendRef = document.getElementById('inputReference');
let sendRef2 = document.getElementById('inputReference2');
let sendRef3 = document.getElementById('inputReference3');
let buttonSendValue = document.querySelectorAll('.buttonSendValue');
let fPVOM = document.getElementById('freqPVOM');
let fZVOM = document.getElementById('freqZVOM');
let fEngine = document.getElementById('freqEngine');
let fKP = document.getElementById('freqKP');
let sensorValues = document.querySelectorAll('.sensorValues');
let press = document.querySelectorAll('.press');
let dataValue2 = document.querySelectorAll('.descrData');
let varReadOnly = document.querySelectorAll('.varReadOnly');
let responseToWriting = document.querySelectorAll('.response');
let shimValues = document.querySelectorAll('.shimValues');
let shimFreqResponse = document.querySelectorAll('.shimFreqResponse');
let checkBox = document.querySelectorAll('.checkBox');
let sensorValues1Result = document.querySelectorAll('.sensorValues1Result');
let sensorValuesResult6 = document.querySelectorAll('.sensorValuesResult6');
let buttonReadTxt = document.getElementById('buttonReadTxt');
let txtIncome = document.querySelectorAll('.txtIncome');
let shimNumber = document.getElementById('shimNumber');
let shimNumber2 = document.getElementById('shimNumber2');
let checkReadBtn = document.getElementById('checkReadBtn');
let checkReadFieldInsyde = document.querySelectorAll('.checkReadFieldInsyde');
let flash = document.getElementById('flash');
let COMcheck = document.getElementById('COMcheck');

let buttonWriteFromTxt = document.getElementById('buttonWriteFromTxt');
let graphics = document.querySelectorAll('.graphics');



let defaultBufReadA = new Uint8Array([0x01, 0x03, 0x00, 0x00, 0x00, 0x01]);     // arrayLike object
let defaultBufWriteA = new Uint8Array([0x01, 0x10, 0x00, 0x00, 0x00, 0x01, 0x02]);
let defaultBufReadACPU2 = new Uint8Array([0x02, 0x03, 0x00, 0x00, 0x00, 0x01]);
let defaultBufWriteACPU2 = new Uint8Array([0x02, 0x10, 0x00, 0x00, 0x00, 0x01, 0x02]);
let defaultBufWritePageA = new Uint8Array([0x02, 0x10, 0x00, 0x00, 0x00, 0x01, 0x02, 0x00, 0x00]);
let defaultBufReadPageA = new Uint8Array([0x02, 0x03, 0x00, 0x00, 0x00, 0x01]);
let defaultBufFlashA = new Uint8Array([0x02, 0x06, 0x00, 0x00, 0x00, 0x00]);
let defaultBufRead = Array.from(defaultBufReadA);                 // array
let defaultBufWrite = Array.from(defaultBufWriteA);
let defaultBufReadCPU2 = Array.from(defaultBufReadACPU2);
let defaultBufWriteCPU2 = Array.from(defaultBufWriteACPU2);
let defaultBufWritePage = Array.from(defaultBufWritePageA);
let defaultBufReadPage = Array.from(defaultBufReadPageA);
let defaultBufFlash = Array.from(defaultBufFlashA);

let txtResult = [];
let txt = [];
let j = 0;
let jj = 60;
let jjj = 100;
let l;
let j300 = 300;
let port;



function blockInput() {
    for ( let i = 0; i < sensorValues.length; i++ ) {
        sensorValues[i].setAttribute('readonly', 'readonly');
    }
    for ( let i = 0; i < shimValues.length; i++ ) {
        shimValues[i].setAttribute('readonly', 'readonly');
    }
    for ( let i = 0; i < txtIncome.length; i++ ) {
        txtIncome[i].setAttribute('readonly', 'readonly');
    }
    for ( let i = 0; i < checkReadFieldInsyde.length; i++ ) {
        checkReadFieldInsyde[i].setAttribute('readonly', 'readonly');
    }
}

blockInput();


console.log(SerialPort.list());
// var port = new SerialPort({
//     path: 'COM7',
//     baudRate: 57600,
//     dataBits: 8,
//     parity: 'none'
// });

buttonCOM.addEventListener('click', () => {
    COMcheck.checked = false;
    let path = 'COM' + inputSerial.value;

    port = new SerialPort({
        path: path,
        baudRate: 57600,
        dataBits: 8,
        parity: 'none'
    });

    port.on('open', () => { 
        console.log('Opened ', + port.baudRate + port.path);
        COMcheck.checked = true;
     });
    return port;
});






function firstRead1(buf, port) {

    let j = 0;

    for ( let i = 1; i < 8; i++) {
        setTimeout(function() {
            let address = parseInt(i, 10);
            buf[3] = address;
            crc16MODBUS(buf);
            console.log(buf); 
            port.write(buf, 'hex');
            clearBuf(buf);
        }, i * 150);
    }

    return j;

}

function firstRead2(buf) {

    let j = 7;

    for ( let i = 8; i < 18; i++) {
        setTimeout(function() {
            let address = parseInt(i, 10);
            buf[3] = address;
            crc16MODBUS(buf);
            console.log(buf); 
            port.write(buf, 'hex');
            clearBuf(buf);
        }, (i-7) * 150);
    }

    return j;
}

function firstRead3(buf) {
    
    let j = 17;

    for ( let i = 18; i < 49; i++) {
        setTimeout(function() {
            let address = parseInt(i, 10);
            buf[3] = address;
            crc16MODBUS(buf);
            console.log(buf); 
            port.write(buf, 'hex');
            clearBuf(buf);
        }, (i-17) * 150);
    }

    return j;
}

function firstRead4(buf) {
    let j = 60;

    for ( let i = 1; i < 49; i++) {
        setTimeout(function() {
            let address = parseInt(i, 10);
            buf[3] = address;
            crc16MODBUS(buf);
            console.log(buf); 
            port.write(buf, 'hex');
            clearBuf(buf);
        }, i * 150);
    }

    return j;
}

function shimLawRead(buf, number) {
    j = 200;
    jjj = 200;

    if ( number < 1 || number > 8 ) {
        shimNumber2.value = 'Введите корректный номер';
        shimNumber2.style.color = 'red';
        return;
    }

    checkBoxesSwitch(10000);

    for ( let i = (64 * number); i < ((64 * number) + 64); i++) {
        setTimeout(function() {

            switch(i.toString(16).length) {

                case 2:
                    buf[2] = 0;
                    buf[3] = i.toString(16).slice(0, 2);
                    break;
                case 3:
                    buf[2] = i.toString(16).slice(0, 1);
                    buf[3] = i.toString(16).slice(1, 3);
                    break;
            }
            buf[2] = parseInt(buf[2], 16);
            buf[3] = parseInt(buf[3], 16);
            crc16MODBUS(buf);
            port.write(buf, 'hex');
            console.log(buf);
            clearBuf(buf);
        }, (i - 64 * number) * 150);
    }

    return j, jjj;
}

function sendToFlash (buf, value) {
    buf[5] = value;
    crc16MODBUS(buf);
    port.write(buf, 'hex');
    console.log(buf);
    clearBuf(buf);
}


function writingRegister(buf, ref, value) {

    buf[3] = parseInt(ref, 10);
    // wc = parseInt(wc, 10);
    // bc = parseInt(bc, 10);
    // buf.push(wc, bc);
    let i = 0;
    let counter = value.length;
    // console.log(counter);
    
    switch(counter) {
        case 1:
            value = '000' + value;
            counter = 4;
            console.log(value);
            break;
        case 2:
            value = '00' + value;
            counter = 4;
            console.log(value);
            break;
        case 3:
            value = '0' + value;
            counter = 4;
            console.log(value);
            break;
    }

    while ( counter > 0 ) {
        let byte;
        if ( (buf[0] == 1) && (buf[3] == 1 || buf[3] == 6 || buf[3] == 7)) {
            byte = value.slice(i, i+8);
            byte = parseInt(byte, 2);
            counter = counter - 8;
            i = i + 8;
        } else if ( (buf[0] == 1) && ( buf[3] == 2 || buf[3] == 3 || buf[3] == 4 || buf[3] == 5) && value == '0000') {
            responseToWriting[0].value = 'Не допустимо';
            responseToWriting[0].style.color = 'red';
            setTimeout( function() {
                responseToWriting[0].value = '';
                responseToWriting[0].style.color = 'black';
            }, 3000);
            return;
        } else {
            byte = value.slice(i, i+2);
            byte = parseInt(byte, 10);
            counter = counter - 2;
            i = i + 2;
        }
        buf.push(byte);
        console.log(byte);
    }
    crc16MODBUS(buf);
    port.write(buf, 'hex');
    console.log(buf);
    clearBufWriter(buf);

}



// clearing buffer
function clearBufWriter(buf) {
    while ( buf.length > 7 ) {
        buf.pop();
    }
}


function clearBuf(buf) {
    for (let j = 0; j < 2; j++) {
        buf.pop();
    }
}



// function for crc16
function crc16MODBUS(string){
    var CrcTable = [
        0X0000, 0XC0C1, 0XC181, 0X0140, 0XC301, 0X03C0, 0X0280, 0XC241,
        0XC601, 0X06C0, 0X0780, 0XC741, 0X0500, 0XC5C1, 0XC481, 0X0440,
        0XCC01, 0X0CC0, 0X0D80, 0XCD41, 0X0F00, 0XCFC1, 0XCE81, 0X0E40,
        0X0A00, 0XCAC1, 0XCB81, 0X0B40, 0XC901, 0X09C0, 0X0880, 0XC841,
        0XD801, 0X18C0, 0X1980, 0XD941, 0X1B00, 0XDBC1, 0XDA81, 0X1A40,
        0X1E00, 0XDEC1, 0XDF81, 0X1F40, 0XDD01, 0X1DC0, 0X1C80, 0XDC41,
        0X1400, 0XD4C1, 0XD581, 0X1540, 0XD701, 0X17C0, 0X1680, 0XD641,
        0XD201, 0X12C0, 0X1380, 0XD341, 0X1100, 0XD1C1, 0XD081, 0X1040,
        0XF001, 0X30C0, 0X3180, 0XF141, 0X3300, 0XF3C1, 0XF281, 0X3240,
        0X3600, 0XF6C1, 0XF781, 0X3740, 0XF501, 0X35C0, 0X3480, 0XF441,
        0X3C00, 0XFCC1, 0XFD81, 0X3D40, 0XFF01, 0X3FC0, 0X3E80, 0XFE41,
        0XFA01, 0X3AC0, 0X3B80, 0XFB41, 0X3900, 0XF9C1, 0XF881, 0X3840,
        0X2800, 0XE8C1, 0XE981, 0X2940, 0XEB01, 0X2BC0, 0X2A80, 0XEA41,
        0XEE01, 0X2EC0, 0X2F80, 0XEF41, 0X2D00, 0XEDC1, 0XEC81, 0X2C40,
        0XE401, 0X24C0, 0X2580, 0XE541, 0X2700, 0XE7C1, 0XE681, 0X2640,
        0X2200, 0XE2C1, 0XE381, 0X2340, 0XE101, 0X21C0, 0X2080, 0XE041,
        0XA001, 0X60C0, 0X6180, 0XA141, 0X6300, 0XA3C1, 0XA281, 0X6240,
        0X6600, 0XA6C1, 0XA781, 0X6740, 0XA501, 0X65C0, 0X6480, 0XA441,
        0X6C00, 0XACC1, 0XAD81, 0X6D40, 0XAF01, 0X6FC0, 0X6E80, 0XAE41,
        0XAA01, 0X6AC0, 0X6B80, 0XAB41, 0X6900, 0XA9C1, 0XA881, 0X6840,
        0X7800, 0XB8C1, 0XB981, 0X7940, 0XBB01, 0X7BC0, 0X7A80, 0XBA41,
        0XBE01, 0X7EC0, 0X7F80, 0XBF41, 0X7D00, 0XBDC1, 0XBC81, 0X7C40,
        0XB401, 0X74C0, 0X7580, 0XB541, 0X7700, 0XB7C1, 0XB681, 0X7640,
        0X7200, 0XB2C1, 0XB381, 0X7340, 0XB101, 0X71C0, 0X7080, 0XB041,
        0X5000, 0X90C1, 0X9181, 0X5140, 0X9301, 0X53C0, 0X5280, 0X9241,
        0X9601, 0X56C0, 0X5780, 0X9741, 0X5500, 0X95C1, 0X9481, 0X5440,
        0X9C01, 0X5CC0, 0X5D80, 0X9D41, 0X5F00, 0X9FC1, 0X9E81, 0X5E40,
        0X5A00, 0X9AC1, 0X9B81, 0X5B40, 0X9901, 0X59C0, 0X5880, 0X9841,
        0X8801, 0X48C0, 0X4980, 0X8941, 0X4B00, 0X8BC1, 0X8A81, 0X4A40,
        0X4E00, 0X8EC1, 0X8F81, 0X4F40, 0X8D01, 0X4DC0, 0X4C80, 0X8C41,
        0X4400, 0X84C1, 0X8581, 0X4540, 0X8701, 0X47C0, 0X4680, 0X8641,
        0X8201, 0X42C0, 0X4380, 0X8341, 0X4100, 0X81C1, 0X8081, 0X4040
    ];

    var crc = 0xFFFF;

    for(var i = 0, l = string.length; i < l; i++){
        crc = ((crc >> 8) ^ CrcTable[(crc ^ string[i]) & 0xFF]);
    };

    // checking if chechSum starts with 0
    let check = crc.toString(16);
    console.log(check);
    if (check.length == 2){
        check = 00 + check;
    }
    if (check.length == 3){
        check = 0 + check;
    }

    console.log(check);
    let crcLo = check.slice(0, 2);
    let crcHi = check.slice(2, 4);
    // console.log(crcLo);
    // console.log(crcHi);
    crcHi = parseInt(crcHi, 16);
    crcLo = parseInt(crcLo, 16);
    // console.log(crcLo);
    // console.log(crcHi);
    crcLo.toString(10);
    crcHi.toString(10);
    // console.log(crcLo);
    // console.log(crcHi);
    string.push(crcHi);
    string.push(crcLo);

    return string;
}


function refresh() {


    if ( sensorValues[0].value[0] == 0 ) {
        sensorValues1Result[0].innerHTML = '1. ППВМ: нет';
    } else if ( sensorValues[0].value[0] == 1 ) {
        sensorValues1Result[0].innerHTML = '1. ППВМ: есть';
    } else {
        sensorValues1Result[0].innerHTML = '1. ППВМ: No info';
    }

    if ( sensorValues[0].value[1] == 0 ) {
        sensorValues1Result[1].innerHTML = 'БДЗМ: нет';
    } else if ( sensorValues[0].value[1] == 1 ) {
        sensorValues1Result[1].innerHTML = 'БДЗМ: есть';
    } else {
        sensorValues1Result[1].innerHTML = 'БДЗМ: No info';
    }

    if ( sensorValues[0].value[2] == 0 ) {
        sensorValues1Result[2].innerHTML = 'ПВОМ: нет';
    } else if ( sensorValues[0].value[2] == 1 ) {
        sensorValues1Result[2].innerHTML = 'ПВОМ: есть';
    } else {
        sensorValues1Result[2].innerHTML = 'ПВОМ: No info';
    }

    if ( sensorValues[0].value[3] == 0 ) {
        sensorValues1Result[3].innerHTML = 'ЗВОМ: нет';
    } else if ( sensorValues[0].value[3] == 1 ) {
        sensorValues1Result[3].innerHTML = 'ЗВОМ: есть';
    } else {
        sensorValues1Result[3].innerHTML = 'ЗВОМ:No info';
    }

    if ( sensorValues[0].value[4] == 0 ) {
        sensorValues1Result[4].innerHTML = 'РКП: нет';
    } else if ( sensorValues[0].value[4] == 1 ) {
        sensorValues1Result[4].innerHTML = 'РКП: есть';
    } else {
        sensorValues1Result[4].innerHTML = 'РКП: No info';
    }

    if ( sensorValues[0].value[5] == 0 ) {
        sensorValues1Result[5].innerHTML = 'КП: нет';
    } else if ( sensorValues[0].value[5] == 1 ) {
        sensorValues1Result[5].innerHTML = 'КП: есть';
    } else {
        sensorValues1Result[5].innerHTML = 'КП: No info';
    }

    if ( sensorValues[0].value[6] == 1 ) {
        sensorValues1Result[6].innerHTML = 'Тип КП: 4-х ступенчатая';
    } else if ( sensorValues[0].value[6] == 0 ) {
        sensorValues1Result[6].innerHTML = 'Тип КП: 6-ти ступенчатая';
    } else {
        sensorValues1Result[6].innerHTML = 'Тип КП: No info';
    }

    if ( sensorValues[0].value[7] == 1 && sensorValues[0].value[8] == 1) {
        sensorValues1Result[7].innerHTML = 'Параметр жидкости (вход 1): нет датчика';
    } else if ( sensorValues[0].value[7] == 0 && sensorValues[0].value[8] == 1 ) {
        sensorValues1Result[7].innerHTML = 'Параметр жидкости (вход 1): замыкание на минус';
    } else if ( sensorValues[0].value[7] == 1 && sensorValues[0].value[8] == 0 ) {
        sensorValues1Result[7].innerHTML = 'Параметр жидкости (вход 1): размыкание минуса';
    } else {
        sensorValues1Result[7].innerHTML = 'Параметр жидкости (вход 1): No info';
    }

    if ( sensorValues[0].value[9] == 1 && sensorValues[0].value[10] == 1) {
        sensorValues1Result[8].innerHTML = 'Параметр жидкости (вход 2): нет датчика';
    } else if ( sensorValues[0].value[9] == 0 && sensorValues[0].value[10] == 1 ) {
        sensorValues1Result[8].innerHTML = 'Параметр жидкости (вход 2): замыкание на минус';
    } else if ( sensorValues[0].value[9] == 1 && sensorValues[0].value[10] == 0 ) {
        sensorValues1Result[8].innerHTML = 'Параметр жидкости (вход 2): размыкание минуса';
    } else {
        sensorValues1Result[8].innerHTML = 'Параметр жидкости (вход 2): No info';
    }

    if ( sensorValues[0].value[11] == 1 && sensorValues[0].value[12] == 1) {
        sensorValues1Result[9].innerHTML = 'Параметр жидкости (вход 3): нет датчика';
    } else if ( sensorValues[0].value[11] == 0 && sensorValues[0].value[12] == 1 ) {
        sensorValues1Result[9].innerHTML = 'Параметр жидкости (вход 3): замыкание на минус';
    } else if ( sensorValues[0].value[11] == 1 && sensorValues[0].value[12] == 0 ) {
        sensorValues1Result[9].innerHTML = 'Параметр жидкости (вход 3): размыкание минуса';
    } else {
        sensorValues1Result[9].innerHTML = 'Параметр жидкости (вход 3): No info';
    }

    if ( sensorValues[0].value[13] == 1 && sensorValues[0].value[14] == 1 ) {
        sensorValues1Result[10].innerHTML = 'Параметр жидкости (вход 4): нет датчика';
    } else if ( sensorValues[0].value[13] == 0 && sensorValues[0].value[14] == 1 ) {
        sensorValues1Result[10].innerHTML = 'Параметр жидкости (вход 4): замыкание на минус';
    } else if ( sensorValues[0].value[13] == 1 && sensorValues[0].value[14] == 0 ) {
        sensorValues1Result[10].innerHTML = 'Параметр жидкости (вход 4): размыкание минуса';
    } else {
        sensorValues1Result[10].innerHTML = 'Параметр жидкости (вход 4): No info';
    }



    let freqPVOM = sensorValues[1].value;
    if ( freqPVOM == '255255' ) {
        fPVOM.innerHTML = 'Нет датчика';
    } else if ( freqPVOM == '0000' ) {
        fPVOM.innerHTML = 'Не допустимо';
    } else {
        fPVOM.innerHTML = freqPVOM;
    }



    let freqZVOM = sensorValues[2].value;
    if ( freqZVOM == '255255' ) {
        fZVOM.innerHTML = 'Нет датчика';
    } else if ( freqZVOM == '0000' ) {
        fZVOM.innerHTML = 'Не допустимо';
    } else {
        fZVOM.innerHTML = freqZVOM;
    }



    let freqEngine = sensorValues[3].value;
    if ( freqEngine == '255255' ) {
        fEngine.innerHTML = 'Нет датчика';
    } else if ( freqEngine == '0000' ) {
        fEngine.innerHTML = 'Не допустимо';
    } else {
        fEngine.innerHTML = freqEngine;
    }



    let freqKP = sensorValues[4].value;
    if ( freqKP == '2552' ) {
        fKP.innerHTML = 'Нет датчика';
    } else if ( freqKP == '0000' ) {
        fKP.innerHTML = 'Не допустимо';
    } else {
        fKP.innerHTML = freqKP;
    }



    if ( sensorValues[5].value[0] == 0 ) {
        sensorValuesResult6[0].innerHTML = 'Датчик угла поворота 13: нет';
    } else if ( sensorValues[5].value[0] == 1 ) {
        sensorValuesResult6[0].innerHTML = 'Датчик угла поворота 13: есть';
    } else {
        sensorValuesResult6[0].innerHTML = 'Датчик угла поворота 13: No info';
    }

    if ( sensorValues[5].value[1] == 0 ) {
        sensorValuesResult6[1].innerHTML = 'Датчик угла поворота 25: нет';
    } else if ( sensorValues[5].value[1] == 1 ) {
        sensorValuesResult6[1].innerHTML = 'Датчик угла поворота 25: есть';
    } else {
        sensorValuesResult6[1].innerHTML = 'Датчик угла поворота 25: No info';
    }

    if ( sensorValues[5].value[2] == 0 ) {
        sensorValuesResult6[2].innerHTML = 'Датчик правой педали тормоза: нет';
    } else if ( sensorValues[5].value[2] == 1 ) {
        sensorValuesResult6[2].innerHTML = 'Датчик правой педали тормоза: есть';
    } else {
        sensorValuesResult6[2].innerHTML = 'Датчик правой педали тормоза: No info';
    }

    if ( sensorValues[5].value[3] == 0 ) {
        sensorValuesResult6[3].innerHTML = 'Датчик левой педали тормоза: нет';
    } else if ( sensorValues[5].value[3] == 1 ) {
        sensorValuesResult6[3].innerHTML = 'Датчик левой педали тормоза: есть';
    } else {
        sensorValuesResult6[3].innerHTML = 'Датчик ловой педали тормоза: No info';
    }

    if ( sensorValues[5].value[4] == 0 ) {
        sensorValuesResult6[4].innerHTML = 'Датчик сцепления: нет';
    } else if ( sensorValues[5].value[4] == 1 ) {
        sensorValuesResult6[4].innerHTML = 'Датчик сцепления: есть';
    } else {
        sensorValuesResult6[4].innerHTML = 'Датчик сцепления: No info';
    }

    if ( sensorValues[5].value[5] == 0 ) {
        sensorValuesResult6[5].innerHTML = 'Датчик нейтрали: нет';
    } else if ( sensorValues[5].value[5] == 1 ) {
        sensorValuesResult6[5].innerHTML = 'Датчик нейтрали: есть';
    } else {
        sensorValuesResult6[5].innerHTML = 'Датчик нейтрали: No info';
    }

    if ( sensorValues[5].value[6] == 0 ) {
        sensorValuesResult6[6].innerHTML = 'Кнопка подтормаживания: нет';
    } else if ( sensorValues[5].value[6] == 1 ) {
        sensorValuesResult6[6].innerHTML = 'Кнопка подтормаживания: есть';
    } else {
        sensorValuesResult6[6].innerHTML = 'Кнопка подтормаживания: No info';
    }

    if ( sensorValues[5].value[7] == 0 ) {
        sensorValuesResult6[7].innerHTML = 'Датчик транспортного диапазона: нет';
    } else if ( sensorValues[5].value[7] == 1 ) {
        sensorValuesResult6[7].innerHTML = 'Датчик транспортного диапазона: есть';
    } else {
        sensorValuesResult6[7].innerHTML = 'Датчик транспортного диапазона: No info';
    }



    if ( sensorValues[6].value[0] == 0 ) {
        press[0].innerHTML = 'Датчик давления 1: нет';
    } else if ( sensorValues[6].value[0] == 1 ) {
        press[0].innerHTML = 'Датчик давления 1: есть';
    } else {
        press[0].innerHTML = 'Датчик давления 1: No info';
    }

    if ( sensorValues[6].value[1] == 0 ) {
        press[1].innerHTML = 'Датчик давления 2: нет';
    } else if ( sensorValues[6].value[1] == 1 ) {
        press[1].innerHTML = 'Датчик давления 2: есть';
    } else {
        press[1].innerHTML = 'Датчик давления 2: No info';
    }

    if ( sensorValues[6].value[2] == 0 ) {
        press[2].innerHTML = 'Датчик давления 3: нет';
    } else if ( sensorValues[6].value[2] == 1 ) {
        press[2].innerHTML = 'Датчик давления 3: есть';
    } else {
        press[2].innerHTML = 'Датчик давления 3: No info';
    }

    if ( sensorValues[6].value[3] == 0 ) {
        press[3].innerHTML = 'Датчик давления 4: нет';
    } else if ( sensorValues[6].value[3] == 1 ) {
        press[3].innerHTML = 'Датчик давления 4: есть';
    } else {
        press[3].innerHTML = 'Датчик давления 4: No info';
    }

    if ( sensorValues[6].value[4] == 0 ) {
        press[4].innerHTML = 'Датчик давления 5: нет';
    } else if ( sensorValues[6].value[4] == 1 ) {
        press[4].innerHTML = 'Датчик давления 5: есть';
    } else {
        press[4].innerHTML = 'Датчик давления 5: No info';
    }

    if ( sensorValues[6].value[5] == 0 ) {
        press[5].innerHTML = 'Датчик давления 6: нет';
    } else if ( sensorValues[6].value[5] == 1 ) {
        press[5].innerHTML = 'Датчик давления 6: есть';
    } else {
        press[5].innerHTML = 'Датчик давления 6: No info';
    }

    if ( sensorValues[6].value[6] == 0 ) {
        press[6].innerHTML = 'Датчик давления 7: нет';
    } else if ( sensorValues[6].value[6] == 1 ) {
        press[6].innerHTML = 'Датчик давления 7: есть';
    } else {
        press[6].innerHTML = 'Датчик давления 7: No info';
    }

    if ( sensorValues[6].value[7] == 0 ) {
        press[7].innerHTML = 'Датчик давления 8: нет';
    } else if ( sensorValues[6].value[0] == 1 ) {
        press[7].innerHTML = 'Датчик давления 8: есть';
    } else {
        press[7].innerHTML = 'Датчик давления 8: No info';
    }

    if ( sensorValues[6].value[8] == 0 ) {
        press[8].innerHTML = 'Датчик давления 9: нет';
    } else if ( sensorValues[6].value[0] == 1 ) {
        press[8].innerHTML = 'Датчик давления 9: есть';
    } else {
        press[8].innerHTML = 'Датчик давления 9: No info';
    }

    if ( sensorValues[6].value[9] == 0 ) {
        press[9].innerHTML = 'Датчик давления 10: нет';
    } else if ( sensorValues[6].value[9] == 1 ) {
        press[9].innerHTML = 'Датчик давления 10: есть';
    } else {
        press[9].innerHTML = 'Датчик давления 10: No info';
    }

}


function refreshData() {

    for (let i = 0; i < 10; i++) {

        if ( sensorValues[i+7].value != '' ) {
            dataValue2[i].innerHTML = sensorValues[i+7].value;
        } else {
            dataValue2[i].innerHTML = 'No info';
        }

    }

}

function refreshReadOnly() {

    for (let i = 0; i < 30; i++) {

        if ( sensorValues[i+17].value != '' ) {
            varReadOnly[i].innerHTML = sensorValues[i+17].value;
        } else {
            varReadOnly[i].innerHTML = 'No info';
        }

    }

}

function refreshShim() {

    for (let i = 0; i < 48; i++) {

        if ( shimValues[i].value != '' ) {
            shimFreqResponse[i].innerHTML = shimValues[i].value;
        } else {
            shimFreqResponse[i].innerHTML = 'No info';
        }

    }

}


function readTxt() {

    let data = fs.readFileSync('zakon.txt', 'utf-8', function() {});
    console.log(data);

    let charCount = 0;
    let endFounder = 0;
    let i = 0;

    for ( charCount = 0; charCount <= data.length; charCount++) {
        if ( data[charCount + 1] != '\n' ) {
            endFounder = endFounder + 1;
        } else {
            txtResult.push(data.slice((charCount - endFounder), charCount));
            endFounder = 0;
            charCount = charCount + 1;
            if ( txtResult[i] > 60 || txtResult[i] < 0 ){
                txtIncome[i].value = 'Не допустимо';
                txtIncome[i].style.color = 'black';
            } else {
                txtIncome[i].value = txtResult[i];
                txtIncome[i].style.color = 'red';
            }
            i = i + 1;
        }
    }


    console.log(txtResult);
    
    for ( let u = 0; u < 64; u++) {
        txtResult.pop();
    }

}

function writeFromTxt(buf, number) {

    j = 100;
    jjj = 100;

    if ( number < 1 || number > 8 ) {
        shimNumber.value = 'Введите корректный номер';
        shimNumber.style.color = 'red';
        return;
    }

    checkBoxesSwitch(13000);

    for ( let i = (64 * number); i < ((64 * number) + 64); i++) {
        setTimeout(function() {

            switch(i.toString(16).length) {

                case 2:
                    buf[2] = 0;
                    buf[3] = i.toString(16).slice(0, 2);
                    break;
                case 3:
                    buf[2] = '0' + i.toString(16).slice(0, 1);
                    buf[3] = i.toString(16).slice(1, 3);
                    break;
            }

            if ( txtIncome[i-64*number].value != 'Не допустимо') {
                buf[8] = txtIncome[i-64*number].value;
            } else {
                buf[8] = 0;
            }
            buf[2] = parseInt(buf[2], 16);
            buf[3] = parseInt(buf[3], 16);
            crc16MODBUS(buf);
            port.write(buf, 'hex');
            txtIncome[i-64*number].style.color = 'green';
            console.log(buf);
            clearBuf(buf);
            console.log(buf);
        }, (i - 64 * number) * 200);
    }

    return j, jjj;
    
}



// catching data and printing result
let answerSTR
function decoder(string, data, j) {

    let i = 0;
    let counter = string.length;
    let answer = [];

    if ( (data[0] == '1') && (j < 18)){
        while ( counter > 0 ) {
        answer.push(string.slice(i, i+2));
        i = i + 2;
        counter = counter - 2;
        }
    } else {
        answer.push(string);
    }
    

    for ( let z = 0; z < answer.length; z++ ) {
        answer[z] = parseInt(answer[z], 16);
        if ( answer[z] < 10 ) {
            answer[z] = '0' + answer[z];
        }
    }

    console.log(answer);
    console.log(answer.join(''));
    answerSTR = answer.join('');

    if ( answerSTR == 255255 ) {
        answerSTR = 'Нет датчика';
    }

    return answerSTR;

}


function decoderToBinary(string, l) {

    let i = 0;
    let counter = string.length;
    let answer = [];
    while ( counter > 0 ) {
        answer.push(string.slice(i, i+2));
        i = i + 2;
        counter = counter - 2;
    }

    for ( let z = 0; z < answer.length; z++) {
        answer[z] = parseInt(answer[z], 16);
        answer[z] = answer[z].toString(2);
    }

    console.log(answer);
    console.log(answer.join(''));
    answerSTR = answer.join('').slice(0, l);

    return answerSTR;

}

function checkBoxesSwitch(time) {

    checkBox[0].checked = false;
    checkBox[1].checked = false;
    checkBox[2].checked = false;
    checkBox[3].checked = false;
    checkBox[4].checked = false;
    checkBox[5].checked = false;
    setTimeout( function() {
        checkBox[0].checked = true;
        checkBox[1].checked = true;
        checkBox[2].checked = true;
        checkBox[3].checked = true;
        checkBox[4].checked = true;
        checkBox[5].checked = true;
    }, time);

}





for (let c = 0; c < checkBox.length; c++) {
    checkBox[c].addEventListener('click', (e) => {
        e.preventDefault();
    });
}


// button for sending requests
readButtons[0].addEventListener('click', () => {
    j = 0;
    firstRead1(defaultBufRead, port);
    checkBoxesSwitch(1600);
    return j;
});

readButtons[1].addEventListener('click', () => {
    j = 7;
    firstRead2(defaultBufRead);
    checkBoxesSwitch(1800);
    return j;
});

readButtons[2].addEventListener('click', () => {
    j = 17;
    firstRead3(defaultBufRead);
    checkBoxesSwitch(5000);
    return j;
});

readButtons[3].addEventListener('click', () => {
    j = 60;
    jj = 60;
    firstRead4(defaultBufReadCPU2);
    checkBoxesSwitch(7500);
    return j, jj;
})




btnRefresh[0].addEventListener('click', () => {
    refresh();
});

btnRefresh[1].addEventListener('click', () => {
    refreshData();
});

btnRefresh[2].addEventListener('click', () => {
    refreshReadOnly();
});

btnRefresh[3].addEventListener('click', () => {
    refreshShim();
});



buttonSendValue[0].addEventListener('click', () => {

    if ( sendRef.value > 0 && sendRef.value < 8 ) {
        j = 49;
        writingRegister(defaultBufWrite, sendRef.value, sendValues.value);
    } else {
        sendRef.value = 'Error';
        sendRef.style.color = 'red';
    }
    
    return j;

});

buttonSendValue[1].addEventListener('click', () => {

    if ( sendRef2.value > 7 && sendRef2.value < 18) {
        j = 50;
        writingRegister(defaultBufWrite, sendRef2.value, sendValues2.value);
    } else {
        sendRef2.value = 'Error';
        sendRef2.style.color = 'red';
    }

    return j;
    
});

buttonSendValue[2].addEventListener('click', () => {

    if ( sendRef3.value > 0 && sendRef3.value < 49 ) {
        j = 51;
        writingRegister(defaultBufWriteCPU2, sendRef3.value, sendValues3.value);
    } else {
        sendRef3.value = 'Error';
        sendRef3.style.color = 'red';
    }

});





sendRef.addEventListener('click', () => {
    sendRef.value = '';
    sendRef.style.color = 'black';
});

sendRef2.addEventListener('click', () => {
    sendRef2.value = '';
    sendRef2.style.color = 'black';
});

sendRef3.addEventListener('click', () => {
    sendRef3.value = '';
    sendRef3.style.color = 'black';
});




buttonReadTxt.addEventListener('click', () => {
    readTxt();
});



shimNumber.addEventListener('click', () => {
    shimNumber.value = '';
    shimNumber.style.color = 'black';
})


buttonWriteFromTxt.addEventListener('click', () => {

    let j = 200;
    let jjj = 200;
    writeFromTxt(defaultBufWritePage, shimNumber.value);

    console.log(txt);
    return j, jjj;

})

checkReadBtn.addEventListener('click', () => {

    j = 300;
    j300 = 300;
    shimLawRead(defaultBufReadPage, shimNumber2.value);

    return j, j300;

});

flash.addEventListener('click', () => {

    j = 400;
    sendToFlash(defaultBufFlash, shimNumber.value);
    return j;

})









port.on('data', function (data) {
    console.log(j);

    switch(j) {
        case 0:
            console.log(data.toString('hex'));
            l = 16;
            decoderToBinary(data.toString('hex').slice(6, 10), l);
            sensorValues[j].value = answerSTR;
            j = j + 1;
            break;
        case 5:
            console.log(data.toString('hex'));
            l = 8;
            decoderToBinary(data.toString('hex').slice(6, 10), l);
            sensorValues[j].value = answerSTR;
            j = j + 1;
            break;
        case 6:
            console.log(data.toString('hex'));
            l = 10;
            decoderToBinary(data.toString('hex').slice(6, 10), l);
            sensorValues[j].value = answerSTR;
            j = j + 1;
            break;
        case 49:
            console.log(data.toString('hex'));
            responseToWriting[0].value = data.toString('hex');
            break;
        case 50:
            console.log(data.toString('hex'));
            responseToWriting[1].value = data.toString('hex');
            break;
        case 51:
            console.log(data.toString('hex'));
            responseToWriting[2].value = data.toString('hex');
            break;
        case 52:
            console.log(data.toString('hex'));
            decoder(data.toString('hex').slice(6, 10), data, j);
            fs.appendFile('zakon.txt', answerSTR + '\n', function() {
                console.log(answerSTR);
            });
            txt.push(answerSTR);
            break;
        case jj:
            console.log(data.toString('hex'));
            decoder(data.toString('hex').slice(6, 10), data, j);
            shimValues[j-60].value = answerSTR;
            j = j + 1;
            jj = jj +1;
            break;
        case jjj:
            console.log(data.toString('hex'));
            // decoder(data.toString('hex').slice(6, 10), data, j);
            // txtIncome[j-100].value = answerSTR;
            j = j + 1; 
            jjj = jjj + 1;
            break;
        case j300:
            console.log(data.toString('hex'));
            decoder(data.toString('hex').slice(6, 10), data, j);
            checkReadFieldInsyde[j-300].value = answerSTR;
            j = j + 1;
            j300 = j300 + 1;
            break;
        case 400:
            console.log(data.toString('hex'));
            break;
        default:
            console.log(data.toString('hex'));
            decoder(data.toString('hex').slice(6, 10), data, j);
            sensorValues[j].value = answerSTR;
            j = j + 1;
            break;
    }
    
});


