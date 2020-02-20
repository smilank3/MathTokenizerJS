

module.exports=class Parenthesis{



	static check(input){

		var operator=[];

		// loop over input...

		for(var i=0;i<input.length;i++){
			var ch=input[i];

			// chek the char is opening or closing bracket

			switch(ch){

				case '{':
				case '[':
				case '(':
				      operator.push(ch);
				      break;
				case '}':
				case ']':
				case ')':
				   // if no operators in array

				   
				   if(operator.length){
				   	var char=operator.pop();
				   	

				   	// the current char and poped are not equal then throw error

				   	if(ch==='}' && char!=='{' ||
				   		ch===')' && char!=='('||
				   		ch===']' && char!=='['){


				   		throw new Error("Error: "+ch+" at "+i);

				   	
				   	}
				   }else {
				   	// operator array has no operator;
				   	 throw new Error("no more operator")
				   }

				   break;

				   default :
				   break;
			}
		}


		if(operator.length){
			// after processed if there is still operator in the array;
			// then closing paren must be missing;
			//eg  3+6(x+{y-k : in this case we have =[(,{,] ;

				throw new Error("Error: missing right paren")
				
		}


	    

	 


	}
}





