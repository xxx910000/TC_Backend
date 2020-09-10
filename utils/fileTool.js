var fs = require('fs');
var path = require('path');
function remove(filename){
    try{
        var fileRealpath = path.resolve(`./public/upload/${filename}`);
        fs.unlinkSync(fileRealpath);
    }catch (e){
        console.log(e);
    }
}

module.exports = remove;