module.exports={
    getaccno:function(){
        var x = new Date();
        return(Number(x))
    },
    getrefno:function(){
        var dt = new Date().getTime();
    var uuid = 'xxxxxyxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
  
    return uuid;
    },
    getvaluuid:function(){
        var dt = new Date().getTime();
    var uuid = 'xxxxyyxxxxxyxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
  
    return uuid;
    },
    getOTP:function(){
        var dt = new Date().getTime();
    var uuid = 'xxyxy'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
  
    return uuid;
    }
}