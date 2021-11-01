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
const print = function () {
  // anonymous function
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
  args.forEach((arg) => console.log(arg));
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
const printYes = function () {
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
const simpleMultiply = (a, b) => {
  // do something more
  return a * b;
};
```

### IIFE: Immediately Invoked Function Expression

- `( //function expression )();`

```js
(function hello() {
  console.log('IIFE');
})();
```

## Class (introduced in ES6, syntactical sugar over prototype-based inheritance)

- template
- declare once
- no data in

### class declarations

```js
class Person {
  // constructor
  constructor(name, age) {
    // fields
    this.name = name;
    this.age = age;
  }
  // getter
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value < 0 ? 0 : value;
  }
  // setter
  // methods
  speak() {
    console.log(`${this.name}: hello!`);
  }
}
const john = new Person('John', 20);
console.log(john.name); // John
console.log(john.age); // 20
console.log(john.speak()); // John: hello!
```

### Field

```js
class Experiment {
  publicField = 2;
  #privateField = 0; // `#` + fieldname
}
const experiment = new Experiment();
console.log(experiment.publicField); // 2
console.log(experiment.privateField); // undefined
```

### Static properties and methods

- Neither static methods nor static properties can be called on instances of the class. Instead, they're called on the class itself.
- Static methods are often utility functions, such as functions to crate or clone objects, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

```js
class Article {
  static publisher = 'Dream Coding';
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }
  static printPublisher() {
    console.log(Article.publisher);
  }
}
const article1 = new Article(1);
const article2 = new Article(2);
console.log(article1.publisher); // undefined
console.log(Article.publisher); // Dream Coding
Article.printPublisher(); // Dream Coding
```

### Inheritance

- a way for one class to extend another class

```js
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    console.log(`drawing ${this.color} color`);
  }
  getArea() {
    return this.width * this.height;
  }
}
class Rectangle extends Shape {}
class Triangle extends Shape {
  draw() {
    super.draw();
    console.log('triangle');
  }
  getArea() {
    return (this.width * this.height) / 2;
  }
}
const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw(); // drawing blue color
console.log(rectangle.getArea()); // 400
const triangle = new Triangle(20, 20, 'red');
triangle.draw(); // drawing red color
// triangle
console.log(triangle.getArea()); // 200
```

### instanceof operator: class checking

```js
console.log(rectangle instanceof Rectangle); // true
console.log(triangle instanceof Rectangle); // false
console.log(triangle instanceof Triangle); // true
console.log(triangle instanceof Shape); // true
console.log(triangle instanceof Object); // true
```

## object

- one of the JavaScript's data types
- a collection of related data and/or functionality
- Nearly all objects in JavaScript are instances of Object.
- object = { key, value };

### Literals and properties

```js
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' syntax

function print(person) {
  console.log(person.name);
  console.log(person.age);
}

const john = { name: 'John', age: 20 };
print(john); // John
// 20

john.hasJob = true; // dynamic typing, It's not recommended.
console.log(john.hasJob); // true
delete john.hasJob;
console.log(john.hasJob); // undefined
```

### Computed properties

- key should be always string
- If a value of key needs to be received dynamically, it's useful.

```js
console.log(john.name);
console.log(john['name']); // computed properties
john['hasJob'] = true;

function printValue(obj, key) {
  console.log(obj.key); // undefined
  console.log(obj[key]); // returned entered key
}
printValue(john, 'name'); // John
printValue(john, 'age'); // 20
```

### Property value shorthand (in ES6)

- If you want to define an object who's keys have the same name as the variables passed-in as properties, you can use the shorthand and simply pass the key name.

```js
const cat = 'Miaow';
const dog = 'Woof';
const bird = 'Peep peep';
const animals = { cat, dog, bird };
console.log(animals); // {cat: 'Miaow', dog: 'Woof', bird: 'Peep peep'}
```

### Constructor function

```js
function Person(name, age) {
  // this = {},
  this.name = name;
  this.age = age;
  // return this;
}
const person1 = new Person('John', 30);
console.log(person1); // Person {name: 'John', age: 30}
```

### in operator: property existence check (key in obj)

```js
console.log('name' in person1); // true
console.log('hasJob' in person1); // false
console.log(person1.hasJob); // undefined
```

### for..in vs for..of

- for (key in obj): It iterates over all enumerable properties of an object that are keyed by strings (ignoring ones keyed by Symbols), including inherited enumerable properties

```js
for (const key in person1) {
  console.log(`${key}: ${person1[key]}`); // name: John
  // age: 30
}
```

- for (value of iterable): It creates a loop iterating over iterable objects, including: built-in String, Array, array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined iterables.

```js
const iterable = [10, 20, 30];
for (let value of iterable) {
  value += 1;
  console.log(value); // 11
  // 21
  // 31
}
const iterable_string = 'boo';
for (const value of iterable_string) {
  console.log(value); // "b"
  // "o"
  // "o"
}
```

### Object.assign()

- This method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target); // { a: 1, b: 4, c: 5 }, Target object itself is changed.
console.log(source); // { b: 4, c: 5 }
console.log(returnedTarget); // { a: 1, b: 4, c: 5 }
const source2 = { a: 11, b: 12 };
const returnedTarget1 = Object.assign({}, source2);
console.log(returnedTarget1); // { a: 11, b: 14, c: 15 }, cloning an object
```

## references

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/javascript)

```

```
