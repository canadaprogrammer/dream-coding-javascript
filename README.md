# JavaScript Fundamentals

##### Table of Contents

[On Browser](#_browser)

[Grammer and Types](#_grammer)

[Function](#_function)

[Class](#_class)

[Object](#_object)

[Array](#_array)

[Set](#_set)

[JSON](#_json)

[Asynchronous](#_async)

[Event Listener](#_eventListener)

[Timeout and Interval](#_timeout_and_interval)

<a name="_browser"/>

# On Browser

## debugging

- console
- dev tool
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

<a name="_grammer"/>

# Grammer and Types

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

<a name="_operator"/>

# Operator

## Logical operators

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

## Optional Chaining (in ES11)

- This operator (`?.`) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

```js
const person1 = {
  name: 'John',
  job: {
    title: 'web developer',
    manager: {
      name: 'Bob',
    },
  },
};
const person2 = {
  name: 'Paul',
};
function printManager(person) {
  console.log(person.job.manaer.name);
}
printManager(person1); // Bob
printManager(person2); // Uncaught TypeError: Cannot read property 'manager' of undefined

function printManagerName(person) {
  console.log(
    // person.job
    //   ? person.job.manager
    //     ? person.job.manager.name
    //     : undefined
    //   : undefined

    // person.job && person.job.manager && person.job.manager.name\

    person.job?.manager?.name
  );
}
printManagerName(person1);
printManagerName(person2);
```

## Nullish Coalescing Operator (in ES11)

- This operator (`??`) is a logical operator that returns its right-hand side expression when its left-hand side expression is `null` or `undefined`, and otherwise returns its left-hand side expression.
- This can be contrasted with the `||` (OR), which returns the right-hand side operand if the left operand is any falsy value, not only `null` or `undefined`.
- falsy value: `null`, `undefined`, `0`, `-0`, `''`, `""`, `false`, `NaN`

```js
const foo = 0 || 42;
const bar = 0 ?? 42;
const baz = '' || 'Guest';
const tar = '' ?? 'Guest';
const aaa = false || 'Inactive';
const bbb = false ?? 'Inactive';
console.log(foo, bar); // 42, 0
console.log(baz, tar); // 'Guest', ''
console.log(aaa, bbb); // 'Inactive', false
```

<a name="_function"/>

# Function

- fundamental building block in the program
- subprogram can be used multiple times
- performs a task or calculates a value
- one function === one thing
- naming: doSomething, command, verb
- function is object in JS

## Function declaration

- can be called earlier than it is defined (hoisted)

  ```js
  print(); // print
  function print() {
    console.log('print');
  }
  print(); // print
  ```

## Function expression

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

## Parameters

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

## Default parameters (added in ES6)

- Default function parameters allow named parameters to be initialized with default values if `no value` or `undefined` is passed.
- `null` will be used the value.

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

## Scope

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

## Early return, early exit

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

## Callback function using function expression

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

## Arrow function

- always anonymous

  ```js
  const simpleMultiply = (a, b) => {
    // do something more
    return a * b;
  };
  ```

## IIFE: Immediately Invoked Function Expression

- `( //function expression )();`

  ```js
  (function hello() {
    console.log('IIFE');
  })();
  ```

<a name="_class"/>

# Class (introduced in ES6, syntactical sugar over prototype-based inheritance)

- template
- declare once
- no data in

## class declarations

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

```js
class Counter {
  constructor(runEveryFiveTimes) {
    this.counter = 0;
    this.callback = runEveryFiveTimes;
  }

  increase() {
    this.counter++;
    console.log(this.counter);
    if (this.counter % 5 === 0) {
      // if (this.callback) {
      //   this.callback(this.counter);
      // }
      this.callback && this.callback(this.counter);
    }
  }
}

function alertNum(num) {
  alert(`alert! ${num}`);
}
const coolCounter = new Counter(alertNum);
coolCounter.increase(); // 1
coolCounter.increase(); // 2
coolCounter.increase(); // 3
coolCounter.increase(); // 4
coolCounter.increase(); // 5
// alert! 5
```

## Field

```js
class Experiment {
  publicField = 2;
  #privateField = 0; // `#` + fieldname
}
const experiment = new Experiment();
console.log(experiment.publicField); // 2
console.log(experiment.privateField); // undefined
```

## Static properties and methods

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

## Inheritance

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

## instanceof operator: class checking

```js
console.log(rectangle instanceof Rectangle); // true
console.log(triangle instanceof Rectangle); // false
console.log(triangle instanceof Triangle); // true
console.log(triangle instanceof Shape); // true
console.log(triangle instanceof Object); // true
```

<a name="_object"/>

# object

- one of the JavaScript's data types
- a collection of related data and/or functionality
- Nearly all objects in JavaScript are instances of Object.
- object = { key, value };

## Literals and properties

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

## Computed properties

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

## Property value shorthand (in ES6)

- If you want to define an object who's keys have the same name as the variables passed-in as properties, you can use the shorthand and simply pass the key name.

  ```js
  const cat = 'Miaow';
  const dog = 'Woof';
  const bird = 'Peep peep';
  const animals = { cat, dog, bird };
  console.log(animals); // {cat: 'Miaow', dog: 'Woof', bird: 'Peep peep'}
  ```

## Constructor function

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

## in operator: property existence check (key in obj)

```js
console.log('name' in person1); // true
console.log('hasJob' in person1); // false
console.log(person1.hasJob); // undefined
```

## for..in vs for..of

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

## Object.assign()

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
  console.log(returnedTarget1); // { a: 11, b: 12 }, cloning an object
  ```

## Spread Syntax (in ES6)

- It's only for iterable objects
- Objects themselves are not iterable.
- However, object become iterable when used in an Array, or with iterating functions such as `map()`, `reduce()`, and `assign()`.
- Cloning and merging of objects is now possible using a shorter syntax than `Object.assign()`.

```js
const obj1 = { foo: 'aaa', x: 40 };
const obj2 = { foo: 'bbb', y: 30 };

const cloneObj = { ...obj1 }; // {foo: 'aaa', x: 40};
const mergedObj = { ...obj1, ...obj2 }; // {foo: 'bbb', x: 40, y: 30}, the value will be overwritten by the latest value of the same key
const mergedObj = { ...obj1, ...obj2, x: 30 }; // {foo: 'bbb', x: 30, y: 30}, the value will be overwritten by the latest value of the same key

const array = [obj1, obj2];
const arrayCopy = [...array]; // [{foo:'aaa', x:40}, {foo:'bbb', y:30}]
const arrayCopy2 = [...array, { bar: 'ccc', z: 20 }]; // [{foo:'aaa', x:40}, {foo:'bbb', y:30}, {bar:'ccc', z:20}]
obj1.x = 50;
console.log(array, arrayCopy); // [{foo:'aaa', x:50}, {foo:'bbb', y:30}] [{foo:'aaa', x:50}, {foo:'bbb', y:30}], Object has reference, so the value will be changed to the copy too.
```

## Destructuring assignment (in ES6)

```js
const student = {
  name: 'John',
  level: 1,
};

// const name = student.name;
// const level = student.level;

const { name, level } = student;
console.log(name, level);
const { name: studentName, level: studentLevel } = student;
console.log(studentName, studentLevel);
```

<a name="_array"/>

# Array

## Declaration

```js
const arr1 = new Array();
const arr2 = [1, 2];
```

## Index position

```js
const fruits = ['apple', 'banana'];
consol.log(fruits); // (2) ["apple", "banana"]
consol.log(fruits.length); // 2
consol.log(fruits[0]); // "apple"
consol.log(fruits[1]); // "banana"
consol.log(fruits[2]); // undefined
consol.log(fruits[fruits.length - 1]); // "banana"
```

## Looping over an array

```js
// for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// for..of
for (let fruit of fruits) {
  console.log(fruit);
}
// forEach
fruits.forEach((fruit) => console.log(fruit));
```

## Addition, deletion, copy

- **Note!! shift and unshift are slower than pop and push.**
- **push**: add an item to the end
  - `fruits.push('mango', 'kiwi');`
- **pop**: remove an item to the end
  - `fruits.pop();`
- **unshift**: add an item to the beginning
  - `fruits.unshift('strawberry');`
- **shift**: remove an item from the beginning
  - `fruits.shift(); // "apple", "banana", "mango"`
- **splice**: remove an item by index position
  - ```js
    fruits.splice(1, 1); // splice(startIndex, deleteCount?, item1, item2, itemN);
    console.log(fruits); // "apple", "mango"
    fruits.push('grape'); // "apple", "mango", "grape"
    fruits.splice(1, 1, 'lemon', 'peach');
    console.log(fruits); // "apple", "lemon", "peach", "grape"
    ```
- **concat**: combine two arrays
  - ```js
    const fruits2 = ['pear', 'strawberry'];
    const newFruits = fruits.concat(fruits);
    console.log(newFruits); // "apple", "lemon", "peach", "grape", "pear", "strawberry"
    ```
- Search
- **indexOf**: find the index
  - ```js
    fruits.push('lemon');
    fruits.indexOf('lemon'); // 1
    fruits.indexOf('banana'); // -1
    ```
- **includes**: check if including the value
  - ```js
    fruits.includes('peach'); // true
    fruits.includes('banana'); // false
    ```
- **lastIndexOf**: find the last index
  - `fruits.lastIndexOf('lemon'); // 6`

## Destructuring assignment (in ES6)

```js
const animals = ['dog', 'cat'];

// const first = animal[0];
// const second = animal[1];

const [first, second] = animals;
```

## Spread Syntax (in ES6)

```js
const array = [1, 2, 3];
const arrayCopy = [...array]; // [1,2,3]
const array1 = [4, 5, 6];
const arrayConcat = [...array, ...array1]; // [1,2,3,4,5,6]
const newArray = [...array, 4,5 ...array1, 8, 9]; // [1,2,3,4,5,4,5,6,8,9]
```

<a name="_set"/>
# Set

- `Set` object lets you store **unique values** of any type, whether primitive values or object references.

```js
// Remove Duplicates
const array_animal = ['dog', 'cat', 'rabbit', 'horse', 'dog', 'rabbit'];
console.log(new Set(array_animal)); // Set {'dog','cat','rabbit','hours'}
const unique = [...new Set(array_animal)];
console.log(unique); // ['dog','cat','rabbit','horse']
```

<a name="_json"/>

# JSON (JavaScript Object Notation)

- simplest data interchange format
- lightweight text-based structure
- easy to read
- key-value pairs
- used for serialization and transmission of data between the network connections
- **independent programming language and platform**

## Object to JSON

- `JSON.stringify(Object, replacer?)`

  ```js
  let json = JSON.stringify(true);
  console.log(json); // true
  json = JSON.stringify(['apple', 'banana']);
  console.log(json); // ]"apple","banana"]
  const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    // symbol: Symbol('id'),
    jump: function () {
      console.log(`${this.name} can jump!`);
    },
  };
  json = JSON.stringify(rabbit);
  console.log(json); // {"name":"tori","color":"white","size":null,"birthDate":"2021-11-02T19:28:30.670Z"}
  // Symbol and function are not included on JSON
  json = JSON.stringify(rabbit, ['name', 'color']); // {"name":"tori","color":"white"}
  json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`); // Uncaught TypeError: Cannot convert a Symbol value to a string
    return key === 'name' ? 'peter' : value;
  });
  console.log(json); // {"name":"peter","color":"white","size":null,"birthDate":"2021-11-02T19:28:30.670Z"}
  ```

## JSON to Object

- `JSON.parse(json, reviver?)`

  ```js
  const obj = JSON.parse(json);
  console.log(obj); // {name: "tori", color:"white", size: null, Date: "2021-11-02T19:28:30.670Z"}
  rabbit.jump(); // tori can jump!
  obj.jump(); // Uncaught TypeError: obj.jump is not a function, because jump function is not included on obj
  console.log(rabbit.birthDate.getDate()); // 2
  console.log(obj.birthDate.getDate()); // Uncaught TypeError: obj.birthDate.getDate is not a function, because obj.birthDate is string
  const obj1 = JSON.parse(json, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'birthDate' ? new Date(value) : value;
  });
  console.log(obj1.birthDate.getDate()); // 2
  ```

<a name="_async"/>

# Asynchronous

- JavaScript is synchronous.
- Execute the code block in order after hoisting.

```js
console.log('1');
setTimeout(() => console.log('2'), 1000); // Asynchronous function
console.log('3');
// 1
// 3
// 2
```

## Synchronous callback

```js
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello'));
```

## Asynchronous callback

```js
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);
```

```js
// JavaScript Working
// hoisting - the declarations will be the first.
function printImmediately(print) {
  print();
}
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
console.log('1');
setTimeout(() => console.log('2'), 1000); // Asynchronous function
console.log('3');
printImmediately(() => console.log('hello'));
printWithDelay(() => console.log('async callback'), 2000); // Asynchronous function
// the results
// 1
// 3
// hello
// 2
// async callback
```

## Callback Hell Example

```js
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'john' && password === 'doe') ||
        (id === 'bob' && password === 'uncle')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'john') {
        onSuccess({ name: 'john', role: 'admin' });
      } else {
        onError(new Error('no authentication'));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt('Enter your id');
const password = prompt('Enter your password');
userStorage.loginUser(
  id,
  password,
  (user) =>
    userStorage.getRoles(
      user,
      (obj) => alert(`Hello ${obj.name}, you have a(n) ${obj.role} role.`),
      (err) => console.log(err)
    ),
  (err) => console.log(err)
);
```

## Promise

- Promise is a JavaScript object for asynchronous operation.
- State: pending -> fulfilled or rejected
- Producer vs Consumer
- When new Promise is created, the executor is executed automatically.

### Producer

```js
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log('doing something...');
  setTimeout(() => {
    // resolve('hello');
    reject(new Error('no network!'));
  }, 1000);
});
```

### Consumer

```js
promise
  .then((value) => {
    console.log(value); // 'hello'
  })
  .catch((error) => {
    console.log(error); // Error: no network!
  })
  .finally(() => {
    console.log('finally'); // finally
  });
```

### Promise chaining

```js
fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));
```

### Error Handling

```js
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Hen'), 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    // setTimeout(() => resolve(`${hen} => egg`), 1000);
    setTimeout(() => reject(`error ${hen} => egg`), 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => fried`), 1000);
  });

// getHen()
// .then(hen => getEgg(hen))
// .then(egg => cook(egg))
// .then(fried => console.log(fried));

getHen()
  .then(getEgg)
  .catch((error) => {
    return 'bread';
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);
// bread => fried
```

### Callback to promise

```js
class UserStorage1 {
  loginUser(id, password) {
    // removed onSuccess, onError
    return new Promise((resolve, reject) => {
      // set return with Promise
      setTimeout(() => {
        if (
          (id === 'john' && password === 'doe') ||
          (id === 'bob' && password === 'uncle')
        ) {
          resolve(id); // change onSuccess to resolve
        } else {
          reject(new Error('not found')); // change onError to reject
        }
      }, 2000);
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === 'john') {
          resolve({ name: 'john', role: 'admin' });
        } else {
          reject(new Error('no authentication'));
        }
      }, 1000);
    });
  }
}

const userStorage = new UserStorage1();
const id = prompt('Enter your id');
const password = prompt('Enter your password');
userStorage
  .loginUser(id, password)
  .then(userStorage.getRoles)
  .then((obj) => alert(`Hello ${obj.name}, you have a(n) ${obj.role} role.`))
  .catch(console.log);
```

## async and await

- clear style of using promise

### async

```js
// function fetchUser() {
//   return new Promise((resolve, reject) => {
//     // do network request in 10 secs...
//     resolve('response');
//   })
// }
async function fetchUser() {
  return 'response';
}
const user = fetchUser();
user.then(console.log); // response
console.log(user); // Promise {}
```

### await

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getApple() {
  await delay(2000);
  // throw 'error';
  return 'apple';
}
async function getBanana() {
  await delay(1000);
  return 'banana';
}
// function pickFruits() {
//   return getApple().then((apple) => {
//     return getBanana().then((banana) => `${apple} + ${banana}`);
//   });
// }
async function pickFruits() {
  // 3 seconds
  // try {
  //   const apple = await getApple(); // 2 second
  //   const banana = await getBanana(); // after apple, 1 second
  //   return `${apple} + ${banana}`;
  // } catch (err) {
  //   return err;
  // }
  // 2 second
  try {
    // Promise is executed immediately.
    // getApple() and getBanana are parallel, so getBanana doesn't need to wait getApple
    const applePromise = getApple(); // executed
    const bananaPromise = getBanana(); // executed
    const apple = await applePromise; // 2 second
    const banana = await bananaPromise; // without waiting apple, 1 second
    return `${apple} + ${banana}`;
  } catch (err) {
    return err;
  }
}
pickFruits().then(console.log);
```

### Promise to async & await

```js
// userStorage
//   .loginUser(id,password)
//   .then(userStorage.getRoles)
//   .then(obj => alert(`Hello ${obj.name}, you have a(n) ${obj.role} role.`))
//   .catch(console.log);
async function userAlert() {
  try {
    const login = await userStorage.loginUser(id, password);
    const user = await userStorage.getRoles(login);
    return alert(`Hello ${user.name}, you have a(n) ${user.role} role.`);
  } catch (err) {
    return console.log(err);
  }
}
userAlert();
```

## useful Promise APIs

- `Promise.all`, execute all Promise

  ```js
  function pickAllFruits() {
    return Promise.all([getApple(), getBanana()]).then((fruits) =>
      fruits.join(' + ')
    );
  }
  pickAllFruits().then(console.log);
  ```

- `Promise.race`, return the first finished.

  ```js
  function pickFirstOne() {
    return Promise.race([getApple(), getBanana()]);
  }
  pickFirstOne().then(console.log);
  ```

<a name="_eventListener" />

# Event Listener

- ```js
  const title = document.querySelector('.title');
  const handleTitleClick = () => {
    title.innerText = 'Title is clicked';
  };

  title.addEventListener('click', handleTitleClick);
  // title.onclick = handleTitleClick; // the same results

  window.addEventListener('copy', () => {
    alert('Copied!');
  });
  window.addEventListener('offline', () => {
    alert('SOS no WiFi');
  });
  window.addEventListener('online', () => {
    alert('WiFi connected');
  });
  ```

<a name="_timeout_and_interval" />

# Timeouts and Intervals

- `setTimeout(fn, milliseconds)`: execute a specified block of code once after a specified time has elapsed.
  - Any parameters that you want to pass to the function being run inside the `setTimeout()` must be passed to it as additional parameters at the end of the list.
  ```js
  function sayHi(who) {
    alert(`Hello ${who}`);
  }
  let myGreeting = setTimeout(sayHi, 2000, 'Mr. Universe');
  ```
- `setInterval(fn, milliseconds)`: execute a specified block of code repeatedly with a fixed time delay between each call

- The specified time (or the delay) is not the guaranteed time to execution, but rather the minimum time to execution. It will execute as soon as the stack is empty.

## Cancel it

- `clearTimeout()`, `clearInterval()`
- `clearTimeout()` and `clearInterval()` both use the same list of entries to clear from. Interestingly enough, this means you can use either method to clear a `setTimeout()` or `setInterval()`.
- For consistency, you should use `clearTimeout()` to clear `setTimeout()` entries and `clearInterval()` to clear `setInterval()` entries.

## Recursive timeouts

- You can call `setTimeout()` recursively to run the same code repeatedly, instead of using `setInterval()`.

```js
let i = 1;
setTimeout(function run() {
  console.log(i);
  i++;
  setTimeout(run, 100);
}, 100);
let j = 1;
setInterval(function run() {
  console.log(j);
  j++;
}, 100);
```

- The difference between recursive `setTimeout()` and `setInterval()` is a subtle one.
  - Recursive `setTimeout()` guarantees the given delay between the code execution completion and the next call.
  - The interval of `setInterval()` includes the time taken to execute the code you want to run in.
- **When your code has the potential to take longer to run than the time interval you've assigned, it's better to use recursive `setTimeout()` - this will keep the time interval constant between executions regardless of how long the code takes to execute, and you won't get errors.**

## references

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/javascript)
