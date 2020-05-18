module.exports = {
    Username: function (name) {
     //user validation
     return /^[A-Za-z\s]+$/.test(name) 
   },
   Email:function(mail){
       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
   },
   AADHAR:function(aad){
       if(/^\d{12}$/.test(aad)){
           return true
       }else if(/^\d{16}$/.test(aad)){
        return true
       }else{
           return false;
       }
   },
   Password:function(pass){
       return(/^[A-Za-z]\w{7,14}$/.test(pass))

   },
   PAN: function(pan){
       return(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(pan))
   },
   DATE: function(date){
       return(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date))
   },
   Phone: function(phon){
       return(/^\d{10}$/.test(phon))
   },
   AccNo:function(accno){
       return (/^([0-9]{9,18})$/.test(accno))
   }
 };