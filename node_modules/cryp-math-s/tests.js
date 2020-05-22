const vigenere = require('./vigenere');

var message = "do i have a message? hele 123";
var key = "hello";

var textEncrypted = vigenere.encrypt(key,message); 
var textDecrypted = vigenere.decrypt(key,textEncrypted);

console.log(message);
console.log(textEncrypted);
console.log(textDecrypted);
