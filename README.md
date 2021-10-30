# Basic JavaScript

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

## Variable declare

- `let` (added in ES6)

  - block scope
  - global scope (Global variable is on memory from starting program to the ending, so it's better to use in necessary class or function)

- Don't ever use `var` to declare a variable
  - var hoisting (move declaration from bottom to top)
  - has no block scope

## Constant

- favor immutable data type always for a few reasons:
  - security
  - thread safety
  - reduce human mistakes

## Variable types

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

- function (first-class function; function can be allocated to variable)

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

## references

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/javascript)
