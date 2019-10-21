export class ModuleName {

  /**
   * You can supply default values for module options.
   */

  defaults = {
    param1: 'hello',
    param2: 0,
    param3: 100
  }

  /**
   * Short description of your module.
   *
   * The constructor function initializes your module with any data it needs
   * to do its job. The constructor function is called when you use the `new`
   * keyword to create a new instance of your module:
   *
   * `const module = new ModuleName(options)`
   *
   * @param object options Object containing module options
   * @constructor
   */

  constructor(options) {

    /**
     * Any module option values not supplied by the client should be filled
     * with the module's default values.
     */

    options = Object.assign(this.defaults, options)

    /**
     * You can assign values to class properties using the `this` keyword.
     * Class properties and methods (functions) can be accessed by any method
     * in your class using the `this.propertyName` or `this.methodName()` syntax.
     */

    this.param1 = options.param1
    this.param2 = options.param2
    this.param3 = options.param3

    /**
     * You can perform any other computations and logic to set up your module
     * in the constructor, not just assigning raw constructor parameters to
     * class properties.
     */

    this.param2Squared = options.param2 * options.param2

    // this.setSomethingUp()

  }

  /**
   * Short description of the method.
   * 
   * A class method is a function that can be called to do something useful
   * related to the module.
   *
   * You can call a method within your module using the `this.methodName()`
   * syntax. You can call a module's method from other scripts using a similar
   * dot `.` syntax:
   *
   * ```
   * const module = new ModuleName(options)`
   * module.methodName()
   * ```
   *
   * @return void
   */

  methodName() {
    console.log(this.param1)
  }

  /**
   * Methods can change the value of class properties. Each instance of a
   * class module has their own individual property values, rather than these
   * values being shared across all instances of a module.
   *
   * ```
   * const module1 = new ModuleName({ param2: 10 })
   * const module2 = new ModuleName({ param2: 10 })
   * module1.addSomething(10)
   * module1.param2 // => 20
   * module2.param2 // => 10
   * ```
   *
   * @param  number amount Amount to add
   * @return void
   */

  addSomething(amount) {
    this.param2 += amount
  }

  /**
   * Methods can return values to the calling code in the same way regular
   * functions can return values.
   *
   * @return string
   */

  getSomething() {
    return this.param1
  }

  /**
   * Methods can be marked `async` like regular functions. Async class methods
   * return a Promise that resolves to the method's return value.
   *
   * @return Promise
   */

  async fetchSomeData() {
    return 1
  }

}