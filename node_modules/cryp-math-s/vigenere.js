var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "\'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "];

function makeKeyStream(key,message){

    var keyStream = "";
    var numbersCharsEnd = message.length%key.length;
    var numberRepetionKey = ~~(message.length/key.length);

    var counter = 0;
    while(counter < numberRepetionKey){
        keyStream = keyStream.concat(key);
        counter += 1;
    }
    
    keyStream = keyStream.concat(key.slice(0,numbersCharsEnd));

    return keyStream;
}

function encryption(key, message){
    var message = message.toUpperCase();
    var keyStream = makeKeyStream(key, message).toUpperCase();
    var messageEncrypted = "";

    for (i = 0; i < message.length; i++) {

        messageEncryptedIndex = alphabet.indexOf(message[i]) + alphabet.indexOf(keyStream[i]);

        if (messageEncryptedIndex >= 52){
            messageEncryptedIndex = messageEncryptedIndex - 52;
        }

        messageEncrypted = messageEncrypted.concat(alphabet[messageEncryptedIndex]);

    }
    return messageEncrypted;
}

function decryption(key, message){
    var message = message.toUpperCase();
    var keyStream = makeKeyStream(key, message).toUpperCase();
    var messageDecrypted = "";
    
    for (i = 0; i < message.length; i++){
        messageDecryptedIndex = alphabet.indexOf(message[i]) - alphabet.indexOf(keyStream[i]);

        if (messageDecryptedIndex < 0){
            messageDecryptedIndex = messageDecryptedIndex + 52;
        }
        messageDecrypted = messageDecrypted.concat(alphabet[messageDecryptedIndex]);
    }
    return messageDecrypted;
}

module.exports.encrypt = encryption;
module.exports.decrypt = decryption;

