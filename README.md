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

## references

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/javascript)
