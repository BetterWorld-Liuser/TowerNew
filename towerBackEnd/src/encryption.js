let crypto = require('crypto')

const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');
const key = Buffer.from('qpwoeirutyalskdf', 'utf8');

function aesEncrypt(data) {
    const cipher = crypto.createCipheriv('aes-128-cbc', key,iv);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
 
function aesDecrypt(encrypted) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key,iv);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}



 

module.exports={
    aesEncrypt,
    aesDecrypt
}
