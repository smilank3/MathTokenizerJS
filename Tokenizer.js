const Paren = require('./parenChecker')

const {
    isSpace,
    isComma,
    isDigit,
    isLetter,
    isAdd,
    isOperator,
    isSubtract,
    isDiv,
    isMult,
    isLeftParen,
    isRightParen,
    isTokAsign,
    isTokPipe,
    isTokQuot,
    isTok_Nan,
    isTok_Mnum,
    isTok_Dollar,
    isTok_Mvar,
    isTok_Cc,
    isTok_Exp,
} = require("./Regex");





//tokenizer

module.exports = (() => {

    // token object;
    function Token(type, value) {
        this.type = type;
        this.value = value;
        this.len = value.length;
    }


    // tokenizer





function Tokenize(str) {
   // if double space make it single.
    str = str.replace(/\s\s/g, "");

  

    var result = [];
    var charBuff = [];
    var numBuff = [];


    var char;
    var isLeftParens = false;
    var len = str.length;


    function tokenize2(str) {
        var input;
        var i = 0;

        while (input = str.slice(i)) {

           
            //  get first index to determine what it is

          



            char = input.charAt(0); // first index of whole string;

            if (isDigit(char)) {
                console.log(char)

                // if there is already digit 
                if (charBuff.length) {
                    console.log("letter buffer in digit")
                    // if letter buffer consist already after number 
                    //the push number into charBuff because sin3=sin3
                    charBuff.push(char);
                } else {
                    console.log("push char ")
                    numBuff.push(char); // if this is first number then put number  3sin=3*sin;
                }

                //numBuff.push(char)


            } else if (char == ".") {
                numBuff.push(char);
            } else if (isLetter(char)) {
                console.log(char)

                var x = i;
                var space = isSpace(str[++x]); // go to next char after letter to see if it is space;



                if (numBuff.length || numBuff.length /*&& !space*/ ) {
                    // if number exist before this char then resolve first if "3x"
                    //alreadu nubuff=[3] 
                    // then   the below function will push 3 into result
                    //result =3
                    //and push *
                    //result =3*

                    //or if "x4"

                    clearnumBuff(); //push the number
                    result.push(new Token("TOK_MULT", "*"));
                }
                console.log("char " + char)
                //else 
                //result=char....
                charBuff.push(char);

                if (space) {
                    console.log("space");
                    // ig number exit push first for eg  3x x ; 3 hast to push to result
                    clearnumBuff();
                    clearVariablesBuffer();

                    //push teh mult *
                    // if x 4 =>x*4
                    // buf for x ^ 3=> sohould be x^ not x*^;
                    // for 2 ^ 3= 2^3 ; defined in isDigit();

                    // so we should have condition here
                    // if after space there is operator then dot add *

                    if (str[++x] != "^" && str[x] != "*" && str[x] != "/" && str[x] != " " && str[x] != "+" && str[x] != "-") {
                        result.push(new Token("TOK_MULT", "*"));
                    }

                    ++i; // go to next char
                }

                //we did if there is letter and if there is space resolve or empty and put * ;



                //charBuff.push(char)



            } else if (isOperator(char)) {
                clearnumBuff();
                clearVariablesBuffer();
                var token;
                if (isAdd(char)) {
                    token = new Token("TOK_PLUS", char);


                } else if (isSubtract(char)) {

                    token = new Token("TOK_MINUS", char);
                } else if (isDiv(char)) {
                    token = new Token("TOK_DIV", char);
                } else if (isMult(char)) {
                    token = new Token("TOK_MULT", char);
                } else if (isTok_Exp(char)) {
                    token = new Token("TOK_EXP", char);
                } else {
                    token = new Token("NULL", char);
                }
                result.push(token);
            } else if (isLeftParen(char)) {
                if (charBuff.length) { /* sin(x)=>sin(x)*/
                    result.push(new Token("TOK_FUNC", charBuff.join("")));
                    charBuff = [];
                } else if (numBuff.length) { /* this for 4(x)=> 4*(x);*/
                    clearnumBuff();
                    result.push(new Token("TOK_MULT", "*"));
                }
                result.push(new Token("TOK_LPAREN", char));

                /*  IT DOES NOT MATTER BUT WE NEED THIS IN PARSER;
            //isLeftParen=true;
            // go next step; if  (x+y) => x+y)
            var check=i;
            i=0;  // why we need i=0; because every time you see "(" go one step but 
                    // often times i!=0; i could be i=4; at that time when (x+y) i skips element 
                    // but we always want first element "x" in this case so make i=0 when "( " and increment ++1;
            i++;
   var ch=input.slice(i);
   console.log("lparen index "+i)
          
i=0;  // in while loop, since we are always slicing from slice(0,...) as we already have "x+y)" i should be 0 to acess "x"
          tokenize2(ch);
          console.log("where is Right paren");
          console.log(input)
          return 0;
          */

            } else if (isRightParen(char)) {
                clearVariablesBuffer();
                clearnumBuff();
                result.push(new Token("TOK_RPAREN", char))

                // if Right parenthesis exists then there must be left parenthesis;

                /*if(isLeftParen){
                    result.push(new Token("TOK_RPAREN", char));
            }else{
                console.log("missing Left PAREN");
            }
        */

                console.log("result length: " + result.length) // result .length = if input = sin(45) then (sin=1) not by letter by letter; or sin(45)=> sin,(,45,)=> 4:length;
                // for derivative(x,y)= derivative,(,x,y,)=> 6:length;
                console.log("str length : " + str.length)

                // if until here it does process ; if result.length which is current length or index in whic we encounter ")"; 
                // and the whole input length is str.length;
                // if the current position is less than wholre string ; after ")" there must of something so we add "*"
                // eg would be sin(x)4 => sin(x)*4 
                // since we already dit sin4=sin*4 we dont have to worry about. and we are particularly focus on function type

                // for sin(x)
                // result.length= 4; as it ignores "(" and ")
                // and str.length or input's length = 6 ; includes anything 

                /*
                this suggest  (result.length <str.length ) does not work for sin(x) as its true and add "*" token at last making it = sin(x)*
                : so to solve this we could make length problem seriously
                : one way is replace  "(" and ")" in str;
                str.replace(/\(|\)/,'');
                and get length which makes length usuaful;
                */

                var temp = str.replace(/\(|\)/g, '');
                // temp make sin(x)=sinx;  => s,i,n,x =>4:length
                // for long name like -> derivative(x,y)=> d,e,r,i,v.....=14 something 
                // dir(x,y) is okay;


                //der(y,sin) has a fault
                console.log(temp)
                console.log(str)



                if (result.length < temp.length) {

                    // here we could go one step futher and chek if next char is parenthesis ( or ) or , or weird thing then dont put *;
                    console.log(i)

                    var x = i;
                    var y = i;
                  

                    if (str[++x] != ")" && str[++y] != "," && str[x] != "+" && str[x] != "-" && str[x] != undefined && str[x] != "^" &&
                        str[x] != "/" && str[x] != "=" && str[x] != "*" && str[x] != " " /* evne the space */ ) { // i will increase whether it true or not // x once increase stay  the same.
                        console.log("weird hack------------------------------------------")
                        result.push(new Token("TOK_MULT", "*"));
                        // it has decrease because of ++i;


                    }





                }

            } else if (isComma(char)) {
                clearnumBuff();
                clearVariablesBuffer();
                result.push(new Token("TOK_SEP", char));
            } else if (isTokAsign(char)) {

                clearnumBuff();
                clearVariablesBuffer()
                result.push(new Token("TOK_ASIGN", char));

            } else if (isTokPipe(char) || isTokQuot(char)) {

                clearVariablesBuffer();
                clearnumBuff();

                if (isTokPipe(char) && isTokQuot(str[++i])) { // |'

                    var char = char.concat("", str[i]);

                    result.push(new Token("TOK_NOTSYMBOL", char))
                } else if (isTokQuot(char)) {
                    // here above if statement doesnot even execute ; so i will be regular i;
                    result.push(new Token("TOK_QUOT", char));
                } else if (isTokPipe(char)) {

                    i--; // because when the first if statement is execute [++i] is also execute just to check;
                    result.push(new Token("TOK_PIPE", char));


                }

            } else if (isTok_Cc(char)) {
                clearVariablesBuffer();
                clearnumBuff();

                if (isTok_Cc(char) && isTok_Cc(str[++i])) {
                    var char = char.concat("", str[i]);
                    result.push(new Token("TOK_COLON", char));
                } else {
                    result.push(new Token("TOK_CC", char));
                    i--;
                }

            } else if (isTok_Mvar(char)) {
                clearnumBuff();
                clearVariablesBuffer();
                result.push(new Token("TOK_MVAR", char))
            } else if (isTok_Nan(char)) {
                clearVariablesBuffer();
                clearnumBuff();
                result.push(new Token("TOK_NAN", char))
            } else if (isTok_Mnum(char)) {
                clearVariablesBuffer();
                clearnumBuff();
                result.push(new Token("TOK_MNUM", char));
            } else if (isTok_Dollar(char)) {
                clearnumBuff();
                clearVariablesBuffer();
                result.push(new Token("TOK_DOLLAR", char))
            } else {
                console.log(char + " is not recognized");
                // but it will eventually move on because of i++; for eg \s;
            }




            i++;
        }

    }

    // call tokenize function

    tokenize2(str);


    // THIS ARE CALLED AFTER ALL PROCESS TO CLEARE THING UP at last
    if (numBuff.length) { // if ther is number in buffer make sure to push into result;
        // when input=sin3
        // charBuff=['s','i','n'];
        //and numBuff =[3];
        //and since we are calling this below funtion 
        // number is always push before letter
        //like this 
        /*
        [ Token { type: 'TOK_INTEGER', value: '3', len: 1 },
  Token { type: 'TOK_IDENT', value: 'sing', len: 4 } ]

  */

        //but what about input=3sin

        /*
        well at first isdigit() is called it wil push '3' into numberBufer=[3];
        and when isletter() is called there is if statement saying if there is something numBuff then. push int result=3 and also add '*' makoing result=3*
        and eventually result=3*sin  */
        console.log("numBuff exist at the end too")
        clearnumBuff();
    }
    if (charBuff.length) {
        console.log("letter buffer exists at the end too")
        console.log(charBuff)
        clearVariablesBuffer();
    }
    return result;

    function clearVariablesBuffer() {

        var l = charBuff.length;
        for (var i = 0; i < l; i++) {
            //result.push(new Token("TOK_VAR", charBuff[i]));
            /*  if(i< l-1) { //there are more Variables left
                result.push(new Token("Operato7r", "*"));
              }
              */
        }

        // if letter buffer exist then tok_ident otherwise there should be no ident
        if (l) {
            var ident = charBuff.join(''); //letter buffer is array eg:= charBuff=['s','i','n'];
            result.push(new Token("TOK_IDENT", ident))
        }

        charBuff = [];
    }

    function clearnumBuff() {
        if (numBuff.length) {
            result.push(new Token("TOK_INTEGER", numBuff.join("")));
            numBuff = [];
        }
    }

}











// return function ;
// 
return (input)=>{

    var tokens;
    try {

        // check if parenthesis are correct before tokinizing;
        Paren.check(input);
        // if no error then tokenize.
        tokens = Tokenize(input);

        return { sucess: true, tokens }

    } catch (er) {

        //if error; return the tokinzer status--what happened;
        return { sucess: false, message: er.message };
    }


}






})();









