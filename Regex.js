
module.exports=(()=>{

    return {
     isSpace:(ch) =>{
    return /\s/.test(ch);
},

 isComma:(ch) =>{
    return /,/.test(ch);
},

 isDigit:(ch)=> {
    return /\d/.test(ch);
},

 isLetter:(ch) =>{
    return /[a-z]/i.test(ch);
},

 isOperator:(ch)=> {
    return /\+|-|\*|\/|\^/.test(ch);
}
,
// addition 
 isAdd:(ch)=> {
    return /\+/.test(ch);
},

 isSubtract:(ch)=> {
    return /\-/.test(ch);
},

 isMult:(ch) =>{
    return /\*/.test(ch);
}
,
 isDiv:(ch)=> {
    return /\//.test(ch);
},

 isLeftParen:(ch) =>{
    return /\(|\{|\[/.test(ch);
},

 isRightParen:(ch) =>{
    return /\)|\}|\]/.test(ch);
},

// token_asign

 isTokAsign:(ch) =>{
    return /\=/.test(ch);
},

// pipe

 isTokPipe:(ch)=> {
    return /\|/.test(ch);
},

 isTokQuot:(ch) =>{ // for eg /^so$/ only matches "so" ; no "sno"
    return /\'/.test(ch);
},

 isTok_Nan:(ch)=> {
    return /^\@$/.test(ch);
},

 isTok_Mnum:(ch)=> {
    return /^\#$/.test(ch);
},

 isTok_Dollar:(ch)=> {
    return /^\$$/.test(ch);
},

 isTok_Mvar:(ch)=> {
    return /^\?$/.test(ch);
}
,
 isTok_Cc:(ch)=>{
    return /^\:$/.test(ch);
},

 isTok_Exp:(ch)=>{
    return /^\^$/.test(ch);
},

        
    }
})()


