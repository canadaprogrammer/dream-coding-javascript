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

// Q1. make a string out of array
const fruits = ['apple', 'banana', 'orange'];
const strings1 = fruits.join();
const strings2 = fruits.toString();
console.log('A1:', strings1, strings2);

// Q2. make an array out of a string
const fruits_string = 'apple, kiwi, banana, peach';
const fruits_array = fruits_string.split(', ');
console.log('A2:', fruits_array);

// Q3. make this array look like this: [5,4,3,2,1]
const array = [1,2,3,4,5];
const reversed = array.reverse(); // the original array is reversed too.
console.log('A3:', reversed);

// Q4. make new array without the first two elements
const array1 = [1,2,3,4,5];
// const new_array = array1.splice(2); // array1 will be [3,4,5], so it's not the right answer.
// console.log(new_array);
const new_array1 = array1.slice(2, 5);
console.log('A4:', new_array1, array1);

// Q5 ~ Q10
class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
console.log('A5:', students.find(student => student.score === 90));

// Q6. make an array of enrolled students
const enrolled_students = students.filter(student => student.enrolled)
console.log('A6:', enrolled_students);

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
const scores = students.map(student => student.score);
console.log('A7:', scores);

// Q8. check if there is a student with the score lower than 50
console.log('A8:', students.some(student => student.score < 50));

// Q9. compute students' average score
const total_score = students.reduce((prev, curr) => prev + curr.score, 0);
const average = total_score / students.length;
console.log('A9:', average);

// Q10. make a string containing all the scores
const string_score = students.map(s => s.score).join(', ');
console.log('A10:', string_score);

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
const sorted_score = students.map(s => s.score).sort().join(', '); // ASC
const sorted_score1 = students.map(s => s.score).sort((a,b) => a - b).join(', '); // ASC
const sorted_score2 = students.map(s => s.score).sort((a,b) => b - a).join(', '); // DESC
console.log('A B:', sorted_score);
console.log('A B:', sorted_score1);
console.log('A B:', sorted_score2);

let json = JSON.stringify(true);
console.log(json); // true
json = JSON.stringify(['apple', 'banana'])
console.log(json); // ]"apple","banana"]
const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  // symbol: Symbol('id'),
  jump: function() {
    console.log(`${this.name} can jump!`);
  },
};
json = JSON.stringify(rabbit);
console.log(json); // {"name":"tori","color":"white","size":null,"birthDate":"2021-11-02T19:28:30.670Z"}
                   // Symbol and function are not included on JSON
json = JSON.stringify(rabbit, ['name','color']); // {"name":"tori","color":"white"}
json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}`);
  return key === 'name' ? 'peter' : value;
})
console.log(json); // {"name":"peter","color":"white","size":null,"birthDate":"2021-11-02T19:28:30.670Z"}

const obj = JSON.parse(json);
console.log(obj); // {name: "peter", color:"white", size: null, Date: "2021-11-02T19:28:30.670Z"}
console.log(rabbit); // {name: "peter", color:"white", size: null, Date: "2021-11-02T19:28:30.670Z"}
rabbit.jump();  // tori can jump!
console.log(rabbit.birthDate.getDate()); // 2
console.log(obj.birthDate.getDate()); // Uncaught TypeError
const obj1 = JSON.parse(json, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj1.birthDate.getDate()); // 2