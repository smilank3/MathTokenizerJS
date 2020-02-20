var Tokenize =require("./Tokenizer")




var tokens=Tokenize("sin(45-45+89x)");


console.log(tokens)


/* 
sin(45-45+89x)
INPUT :sin(45-45+89x)
INPUT :in(45-45+89x)
INPUT :n(45-45+89x)
INPUT :(45-45+89x)
INPUT :45-45+89x)
INPUT :5-45+89x)
INPUT :-45+89x)
INPUT :45+89x)
INPUT :5+89x)
INPUT :+89x)
INPUT :89x)
INPUT :9x)
INPUT :x)
INPUT :


OUTPUT:

{ sucess: true,
  tokens:
   [ Token { type: 'TOK_FUNC', value: 'sin', len: 3 },
     Token { type: 'TOK_LPAREN', value: '(', len: 1 },
     Token { type: 'TOK_INTEGER', value: '45', len: 2 },
     Token { type: 'TOK_MINUS', value: '-', len: 1 },
     Token { type: 'TOK_INTEGER', value: '45', len: 2 },
     Token { type: 'TOK_PLUS', value: '+', len: 1 },
     Token { type: 'TOK_INTEGER', value: '89', len: 2 },
     Token { type: 'TOK_MULT', value: '*', len: 1 },
     Token { type: 'TOK_IDENT', value: 'x', len: 1 },
     Token { type: 'TOK_RPAREN', value: ')', len: 1 } ] }
  */