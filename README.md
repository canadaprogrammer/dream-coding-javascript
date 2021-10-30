# JavaScript Fundamentals

## console

## dev tool

- debugging on Source tab by using break point

## page loading process

### When JavaScript is **in the head tag**, if the JavaScript file is oversized or the Internet is slow, a user needs to wait a long to see the page.

1. parsing HTML
2. blocked parsing HTML
   1. fetching js
   2. executing js
3. parsing HTML

### When JavaScript files are **at the bottom of the body**, a user can see the page before loading JavaScript files. However, if the page's contents are working by JavaScript, the user needs to wait for the work.

1. parsing HTML
2. fetching js
3. executing js

### When using JavaScript files with **`async`**, the loading time will be shorter than at the bottom of the body. However, when JavaScript controls DOM by querySelector, the element may not be defined yet. Also, the js files will be executed in the order of fetching finished. If the js files need to be performed by the written order, some issues will happen.

1. parsing HTML
2. fetching js during parsing HTML
3. when the fetching is finished, the parsing is blocked, and then js is executed.
4. After the executing, the parsing will be continued.

### When using **`defer`** on script tag, fetching js files will happen while parsing HTML. When the page is ready, js files will be executed in written order.

1. parsing HTML
   1. fetching js
2. executing js when page is ready

## Write `'use strict';` at the top of JavaScript file

- It's added at ECMAScript 5.
- JavaScript is very flexible, so it's dangerous.
- It also increases the execution speed.

## Variable, rw(read/write)

- `let` (added in ES6)

  - block scope
  - global scope (Global variable is on memory from starting program to the ending, so it's better to use in necessary class or function)

- Don't ever use `var` to declare a variable
  - var hoisting (move declaration from bottom to top)
  - has no block scope

## Constant, r(read only)
- only you `let` if variable needs to change
- favor immutable data type always for a few reasons:
  - security
  - thread safety
  - reduce human mistakes

## Data type
- Immutable data types: primitive types, frozen objects (i.e. `object.freeze()`)
- Mutable data types: all objects by default are mutable in JS

## Variable types
- different methods to store variable
  - Primitive: Value is saved on a memory
  - Object: Reference which points the location is saved on a memory

- primitive, single item: number, string, boolean, null, undefined, symbol
  - number - special numeric values: infinity, -infinity, NaN
  ```js
  const infinity = 1 / 0;
  const negativeInfinity = -1 / 0;
  const nAn = 'not a number' / 2;
  ```
  - bigInt: over (-2^53 ~ 2^53)
    - number with `n`
    - `const bigInt = 1234567890123456789012345678901234567890n;`
  - string
    - template literal (string)
      - `` `hi ${name}!` ``
  - boolean
    - **false: 0, null, undefined, NaN, ''**
    - true: any other value
  - null
    - `let nothing = null;`
  - undefined
    - `let x;` or `let x = undefined;`
  - symbol, create unique identifiers for objects
  ```js
  const symbol1 = Symbol('id');
  const symbol2 = Symbol('id');
  console.log(symbol1 === symbol2); // false
  const gSymbol1 = Symbol.for('id');
  const gSymbol2 = Symbol.for('id');
  console.log(gSymbol1 === gSymbol2); // true
  console.log(`value: ${symbol1}, type: ${typeof symbol1}`); // Uncaught TypeError: Cannot convert a Symbol value to a string
  console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`); // value: id, type: symbol
  ```
- object (box container)

  ```js
  const person = { name: 'John Doe', age: 20 };
  person.age = 30;
  ```

- function 
  - First-class function
    - functions are treated like any other variable
    - can be assigned as a value to variable
    - can be passed as an argument to other functions
    - can be returned by another function

## Dynamic typing: dynamically typed language

```js
let text = 'hello';
console.log(text.charAt(0)); // h
text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`); // value: '75', type: string
text = '8' / '2';
console.log(`value: ${text}, type: ${typeof text}`); // value: 4, type: number
console.log(text.charAt(0)); // Uncaught TypeError: text.charAt is not a function
```

## Operator

### Logical operators
- `||` (or), finds the first truthy value
- `&&` (and), finds the first falsy value
  - When using `||` or `&&`, the simplest is first on the condition.
  - Function or expression needs to be the last.
  - `&&` often used to compress long if-statement
    - nullableObject && nullableObject.something
  ```js
  const value1 = true;
  const value2 = 4 < 2;
  console.log(`or: ${value1 || value2 || check()}`);
  // Don't write like console.log(`or: ${check() || value1 || value2}`);
  function check() {
    for (let i = 0; i < 10; i++) {
      console.log('checked');
    }
    return true;
  }
  ```
- Equality
  - `==` (loose equality), with type conversion
  - `===` (strict equality), no type conversion
  - object equality by reference
  ```js
  const obj1 = { value: 'object' };
  const obj2 = { value: 'object' };
  const obj3 = obj1;
  console.log(obj1 == obj2); // false
  console.log(obj1 === obj2); // false
  console.log(obj1 === obj3); // true
  ```

## Function
- fundamental building block in the program
- subprogram can be used multiple times
- performs a task or calculates a value
- one function === one thing
- naming: doSomething, command, verb
- function is object in JS

### Function declaration
- can be called earlier than it is defined (hoisted)
```js
print(); // print
function print() {
  console.log('print');
}
print(); // print
```

### Function expression
- is created when the execution reaches it.
```js
print(); // Uncaught ReferenceError: Cannot access 'print' before initialized
const print = function() { // anonymous function
  console.log('print');
};
print(); // print
const printAgain = print;
printAgain();
```

### Parameters
- primitive parameters: passed by value
- object parameters: passed by reference
```js
function changeName(obj) {
  obj.name = 'Bob';
}
const john = { name: 'John' };
changeName(john);
console.log(john); // {name:"Bob"}
```

### Default parameters (added in ES6)
```js
function showMessage(message, from = 'unknown') {
  console.log(`${message} by ${from}`);
}
showMessage('Hi!'); // Hi! by unknown
```

### Rest parameters (added in ES6)
```js
function printAll(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
  for (const arg of args) {
    console.log(arg);
  }
  args.forEach(arg => console.log(arg));
}
printAll('Code', 'your', 'dream'); 
// Code
// your
// dream 
```

### Scope
```js
let globalMessage = 'global'; // global variable
function printMessage() {
  let message = 'hello'; // local variable
  console.log(message); // hello
  console.log(globalMessage); // global
}
printMessage();
console.log(message); // Uncaught ReferenceError: message is not defined
console.log(globalMessage); // global
```

### Early return, early exit
```js
// bad
function upgradeUser(user) {
  if (user.point > 10) {
    // long upgrade logic...
  }
}
// good
function upgradeUser(user) {
  if (user.point <= 10) {
    return;
  }
  // long upgrade logic...
}
```

### Callback function using function expression
```js
function randomQuiz(answer, printYes, printNo) {
  if (answer === 'test') {
    printYes();
  } else {
    printNo();
  }
}
// anonymous function
const printYes = function() {
  console.log('yes');
};
// named function
  // better debugging in debugger's stack traces
  // recursions
const printNo = function print() {
  console.log('no');
  print(); // recursion
};
randomQuiz('test', printYes, printNo); // yes
randomQuiz('yes', printYes, printNo); // no
```

### Arrow function
- always anonymous
```js
const simpleMultiply = (a,b) => {
  // do something more
  return a * b;
}
```

### IIFE: Immediately Invoked Function Expression
- `( //function expression )();`
```js
(function hello() {
  console.log('IIFE');
})();
```

## references

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/javascript)
