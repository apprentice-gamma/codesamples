
var array = ['one', 'two', 'three'];
var obj = {n:"Kitchen", s:"bedroom"};
console.log(array);
console.log(obj["n"]);

for (var prop in obj) {
  console.log (prop + ":"+obj[prop]);
}
