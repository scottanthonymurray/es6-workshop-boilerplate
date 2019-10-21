# JavaScript Community Workshop Module Boilerplate

ES6 class module boilerplate for the JavaScript Community Workshop at Statewide IT.

This `README` includes some tips you might keep in mind as you work on your module.

## Keep it focused

Your module should only try to solve one specific, clearly-defined problem for developers. This makes it easier for developers to understand how and when to use your module. It also makes your module's code easier to read, reason about, and maintain.

One way to assess if your module is doing too much is by measuring its [**cohesion**](https://en.wikipedia.org/wiki/Cohesion_(computer_science)). In plain language, your module has _high cohesion_ if each of its public methods uses each of the module's class properties.

> Private methods - methods not callable by a developer but used by a class internally to break up public method code - don't count toward cohesion.

For example, if your module has two properties, `prop1` and `prop2`, and two methods it provides developers, `doSomething()` and `doSomethingElse()`, your module is considered 100% cohesive if both methods each use both properties:

```js
export class ModuleName {

  // High cohesion because all the public methods use all the class properties.
  
  constructor(prop1, prop2) {
    this.prop1 = prop1
    this.prop2 = prop2
  }

  doSomething() {
    return this.prop1 + this.prop2
  }

  doSomethingElse() {
    return this.prop1 - this.prop2
  }

}
```

On the other hand, a module is considered to have _low cohesion_ if each public method only uses a subset of the module's class properties.

```js
export class ModuleName {

  // Lower cohesion because each public method only works with half the
  // available class properties.
  
  constructor(prop1, prop2, prop3, prop4) {
    this.prop1 = prop1
    this.prop2 = prop2
    this.prop3 = prop3
    this.prop4 = prop4
  }

  doSomething() {
    return this.prop1 + this.prop2
  }

  doSomethingElse() {
    return this.prop1 - this.prop2
  }

  doAnotherThing() {
    return this.prop3 + this.prop4
  }

  doStillAnotherThing() {
    return this.prop3 - this.prop4
  }

}
```

In these situations, consider splitting your code into separate smaller modules.

```js
export class ModuleOneName {
  
  constructor(prop1, prop2) {
    this.prop1 = prop1
    this.prop2 = prop2
  }

  doSomething() {
    return this.prop1 + this.prop2
  }

  doSomethingElse() {
    return this.prop1 - this.prop2
  }

}
```

```js
export class ModuleTwoName {
  
  constructor(prop3, prop4) {
    this.prop3 = prop3
    this.prop4 = prop4
  }

  doAnotherThing() {
    return this.prop3 + this.prop4
  }

  doStillAnotherThing() {
    return this.prop3 - this.prop4
  }

}
```

Of course, cohesion is a sliding scale and you'll have to use your best judgment when determining how to best structure your code for your given use case. In general, you should aim for module classes with high cohesion.

## Use as few dependencies as possible

Your module should be self-contained and rely on as few other JavaScript modules as possible. The more things your module depends on outside of itself, the less portable it becomes for developers.

For example, if your module is just making a couple of basic Ajax calls, use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or plain [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instead of an external HTTP library. Likewise, if your module does basic DOM manipulation, use JavaScript's native functions instead of a library like jQuery.

Dependencies by themselves aren't bad, but you should carefully consider if an external module is really necessary for the functionality you need.

## Make as many things configurable as possible

Instead of using a lot of hard-coded values and behaviors in your module, allow developers to configure your module's specific behavior using constructor options. (Allowing developers to [pass a DOM element reference to your module](#Pass-references-to-DOM-elements-via-the-constructor) instead of hard-coding an element selector in your class is one example.) Doing so lets you keep the code of your module generic and lean.

Remember that JavaScript allows you to pass functions to other functions or store them in variables. When possible, let developers using your module supply their own function that determines how specifically some generic behavior provided by your module is carried out.

For example, if you were writing an autosuggest module, you might allow developers to supply a `matchFn` that determines how specifically the autocomplete element should match typed user input with the data being searched for suggestions.

```js
export class AutocompleteModule {
  constructor(options) {

    // Call a developer-supplied function for populating the autosuggest
    // component with data.

    this.data = options.dataFn()
    
    // Store a developer-supplied function for matching text typed by the user
    // into the autosuggest box with data.

    this.matchFn = options.matchFn
  }

  search(userInput) {
    const matches = this.data.filter(d => this.matchFn(userInput, d))

    // Do something with the matches.
  }
}
```

## Provide sensible defaults via `Object.assign()`

The module boilerplate shows you how you can provide default values for module options using the [`Object.assign()`](https://github.iu.edu/scanmurr/js-workshop-boilerplate/blob/master/ModuleName.js#L33) method.

When possible, provide default values so that developers using your module only have to specify values unique to their app. Providing defaults is especially important if your module has a lot of options, since having to specify every option each time your module is loaded is cumbersome for developers.

## Pass references to DOM elements via the constructor

Avoid grabbing hard-coded DOM elements from within your module. Instead, allow developers to grab an appropriate DOM element using whatever approach makes the most sense for their app and allow them to pass that element reference to your module via the constructor:

```js
const someEl = document.getElementById('some-id')

const moduleName = new ModuleName({
  el: someEl
})
```

Passing a DOM element reference to a JavaScript module is a kind of [dependency injection](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/) that makes your code more generic and flexible.

## Split up long public methods into smaller private methods

Long methods are [difficult to read, reason about, and maintain](https://refactoring.guru/smells/long-method).

Where possible, [split up long methods by moving parts of the code into smaller **private methods**](https://refactoring.guru/extract-method) that handle some piece of the original method's overall functionality. Private methods aren't callable by developers and are only used internally by your class module.

## Include error handling

If there are parts of your module's code that could fail, such as fetching data from a web service, [`throw` an error with a clear message](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) rather than letting the script fail silently or crash.

By `throw`ing an error (or using [`reject` in the case of a `Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)), you allow a developer using your module to catch, understand, and recover gracefully from errors.

> Be sure to note in your module's documentation which methods can potentially fail and why.

## Additional resources

- [JavaScript Classes (Mozilla Developer Network)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Code Smells (Refactoring Guru)](https://refactoring.guru/refactoring/smells)
- [Bundling JavaScript Code with Rollup.js](https://github.com/levimcg/js-workshop-rollup)
- [Introduction to Grunt, Gulp, and webpack](https://github.com/illusivesunrae/node-project-boilerplate/wiki)