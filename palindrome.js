
var test1 = isPalindrome("tacocat") === true;
var test2 = isPalindrome("taco cat") === true;
var test3 = isPalindrome("tacoOOoOoOOoOcat") === true;
var test4 = isPalindrome("beep boop") === false;
var test5 = isPalindrome("taCoc a T") === true;
var test6 = isPalindrome("this is a PalnIDro236Mewty wrwqqwq...atry") === false;
var test7 = isPalindrome("Red root put up to order") === true;
var test8 = isPalindrome("ta.Co.@.c@a%T!") === true;



function isPalindrome(word) {
	//prepping the input, lowercase, remove spaces/punctuation, and turn into an array with split()
	var input = word.replace(/\W/g, "").toLowerCase().split("");
	while (input.length-1 > 0) {
		if (input.shift() !== input.pop()) return false; 
	} 
	return true; 
}

function runTests() {
	var tests = [test1, test2, test3, test4, test5, test6, test7, test8];
	for(i=0; i < tests.length; i++) {
		console.log("\n " + "Test: " + (i+1) + " is " + tests[i]);
	}
}

runTests();