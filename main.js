'use strick';

const calculate = (command, a, b) => {
  switch(command) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'divide':
      return a / b;
    case 'multiply':
      return a * b;
    case 'remainder':
      return a % b;
    default:
      throw Error('unknown command')
  }
}
console.log('add:', calculate('add', 10, 0));

const symbol1 = Symbol('id');
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);

const cat = 'Miaow';
const dog = 'Woof';
const bird = 'Peep peep';
const animals = { cat, dog, bird };
console.log(animals);

function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new Person('John', 30);
console.log(person1);
console.log('name' in person1);
console.clear();
for (const key in person1) {
  console.log(`${key}: ${person1[key]}`);
}

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign({}, target, source);
console.log(target);
console.log(source);
console.log(returnedTarget);