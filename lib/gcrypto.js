"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCrypto = void 0;
var CryptoJS = require("crypto-js");
function ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}
function hexa_to_ascii(hexx) {
    var hex = hexx.toString(); //force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
function toUint32(x) {
    return (x % Math.pow(2, 32));
}
function toInt32(x) {
    var uint32 = toUint32(x);
    if (uint32 >= Math.pow(2, 31)) {
        return uint32 - Math.pow(2, 32);
    }
    else {
        return uint32;
    }
}
function chipherString(text) {
    // To decrypt the text is reuiqred first to reconstruct the chiperText 
    // as array of int32 bit values starting from the exadecimal value 
    // (8 char) of the input text
    var words = [];
    for (var index = 0; index < text.length / 8; index++) {
        var sub = text.substring(0 + (index * 8), 8 + (index * 8));
        var yourNumber = parseInt(sub, 16);
        words.push(toInt32(yourNumber));
    }
    return { ciphertext: { words: words, sigBytes: 4 * words.length } };
}
var GCrypto = /** @class */ (function () {
    function GCrypto() {
    }
    GCrypto.crypt = function (text, key) {
        if (text === undefined)
            return '';
        var iv_str = "8DCB7300E8BCA8E5";
        var iv = CryptoJS.enc.Hex.parse(ascii_to_hexa(iv_str));
        var crypted = CryptoJS.AES.encrypt(text, CryptoJS.RIPEMD160(key), {
            iv: iv
        });
        return crypted.ciphertext.toString().toUpperCase();
    };
    GCrypto.decrypt = function (text, key) {
        if (text === undefined)
            return '';
        var iv_str = "8DCB7300E8BCA8E5";
        var iv = CryptoJS.enc.Hex.parse(ascii_to_hexa(iv_str));
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Hex.parse(text)
        });
        var decrypted = CryptoJS.AES.decrypt(cipherParams, CryptoJS.RIPEMD160(key), {
            iv: iv
        });
        ;
        return decrypted.toString(CryptoJS.enc.Latin1);
    };
    GCrypto.hashUpperCase = function (key) {
        return CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex).toUpperCase();
    };
    GCrypto.hash = function (key) {
        return CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
    };
    GCrypto.cryptDBAccess = function (text, key) {
        var iv_str = "8DCB7300E8BCA8E5";
        var iv = CryptoJS.enc.Hex.parse(ascii_to_hexa(iv_str));
        var crypted = CryptoJS.AES.encrypt(text, CryptoJS.SHA256(key), {
            iv: iv
        });
        return crypted.ciphertext.toString().toUpperCase();
    };
    GCrypto.prototype.encode = function (strList, dateStr) {
        var secret = 'f775aaf9cfab2cd30fd0d0ad28c5c460';
        var hash = CryptoJS.HmacSHA256(dateStr, secret);
        var iv_str = "8DCB7300E8BCA8E5";
        var iv = CryptoJS.enc.Hex.parse(ascii_to_hexa(iv_str));
        var encrypted = [];
        strList.forEach(function (str) {
            var crypted = CryptoJS.AES.encrypt(str, (hash), {
                iv: iv
            });
            encrypted.push(crypted.ciphertext.toString());
        });
        return encrypted;
    };
    GCrypto.prototype.decode = function (strList, dateStr) {
        var secret = 'f775aaf9cfab2cd30fd0d0ad28c5c460';
        var hash = CryptoJS.HmacSHA256(dateStr, secret);
        var iv_str = "8DCB7300E8BCA8E5";
        var iv = CryptoJS.enc.Hex.parse(ascii_to_hexa(iv_str));
        var encrypted = [];
        strList.forEach(function (str) {
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Hex.parse(str)
            });
            var decrypted = CryptoJS.AES.decrypt(cipherParams, (hash), {
                iv: iv
            });
            encrypted.push(decrypted.toString(CryptoJS.enc.Latin1));
        });
        return encrypted;
    };
    GCrypto.prototype.promise_cryptText = function (strList, duration) {
        var _this = this;
        if (duration === void 0) { duration = ''; }
        var charIndex = 16;
        if (duration == 'Month') {
            charIndex = 7;
        }
        return new Promise(function (resolve, reject) {
            var dateStr = "14 12 1972";
            var encrypted = _this.encode(strList, dateStr);
            resolve(encrypted);
        });
    };
    GCrypto.prototype.promise_deCryptText = function (strList, duration) {
        var _this = this;
        if (duration === void 0) { duration = ''; }
        var charIndex = 16;
        if (duration == 'Month') {
            charIndex = 7;
        }
        return new Promise(function (resolve, reject) {
            var dateStr = "14 12 1972";
            var encrypted = _this.decode(strList, dateStr);
            resolve(encrypted);
        });
    };
    return GCrypto;
}());
exports.GCrypto = GCrypto;
