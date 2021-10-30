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
console.log('add:', calculate('test', 10, 0));
