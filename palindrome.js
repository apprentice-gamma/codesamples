function isPalindrome(word) {
	var input = word.toLowerCase().replace(/ +/g, "").split("");

	while (input.length-1 > 0) {
		if (input.shift() !== input.pop()) return false; 
	} 
	return true; 
}

var test1 = isPalindrome("tacocat") === true;
var test2 = isPalindrome("taco cat") === true;
var test3 = isPalindrome("tacocat") === true;
var test4 = isPalindrome("beep boop") === false;
var test5 = isPalindrome("taCoc a T") === true;

function runTests() {
	var tests = [test1, test2, test3, test4, test5];
	for(i=0; i < tests.length; i++) {
		console.log("\n " + "Test: " + i + " is " + tests[i]);
	}
}

runTests();