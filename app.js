// You can make an ES6 class module available for use in your script using
// the `import` statement as shown below.

import { ModuleName } from './ModuleName.js'

// You can create a new instance of a class module using the `new` keyword
// as shown below. Parameters used to create a new instance of a module are
// passed to the class module's constructor (see ModuleName.js).

const moduleName = new ModuleName({
  param1: 'hello',
  param2: 10
})

// Class methods can be called using the dot `.` syntax as shown below.

moduleName.addSomething(10)

// Class methods can return values when called the same way other functions can.

const returnValue = moduleName.getSomething()

console.log(returnValue)

// Class methods can be marked `async` like regular functions. Async class
// methods return a Promise.

moduleName.fetchSomeData().then(value => {
  console.log(value)
})