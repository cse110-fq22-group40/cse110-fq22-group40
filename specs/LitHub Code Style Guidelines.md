# Styling Guide

Created By: Billy Sudirdja
Date: November 27, 2022
For Front Page:: General
Participants: Bennett Zhang, Katherine Wong, Grace Jin, Ben Snowbarger, Alex Wu, Ernest Lin, Kevin Truong, Emmanuel Serrano, Billy Sudirdja, Ryan Truong, Sailor Eichhorn
Type: Design and Planning

Refer to `type-a.js` (client/assets/scripts/type-a) for an example (courtesy of Bennett with 2 t’s).

## General Rules

There will be a **graded quiz** regarding styling, so please take the time to read everything. Feel free to ask the QA team if you have any questions!

- **Formatting Shortcut for Visual Studio Code!!!**
    - On Windows: `Shift **⬆︎** + Alt **⎇** + F`
    - On Mac: `Shift **⬆︎** + Option **⌥** + F`
    - On Linux: `Ctrl **^** + Shift **⬆︎** + I`
- See your code formatted live at:
    - [https://prettier.io/playground/](https://prettier.io/playground/)
- Learn about modern-day JavaScript features:
    - [http://es6-features.org/](http://es6-features.org/)
- Built-in array and string functions **(Use these instead of reinventing the wheel!)**:
    - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
    - [https://www.w3schools.com/js/js_string_methods.asp](https://www.w3schools.com/js/js_string_methods.asp)
- Need to use semicolons!
    - JavaScript *doesn’t* complain when you omit semicolons, so keep your eyes peeled!
    - Commonly forgotten semicolons:
    
    ```jsx
    // Import statements
    import { foo } from "../bar.js";
    
    // Event listeners
    foo.addEventListener("click", () => {
    	// ...
    });
    
    // Any function call that takes up multiple lines
    setTimeout(() => {
    	// ...
    }, 1000);
    
    // Any object that takes up multiple lines
    const team40 = {
    	name: "LitHub",
    	amazing: true,
    	// ...
    };
    
    // Any array that takes up multiple lines
    const people = [
    	"Ben",
    	"Bennett",
    	"Billy",
    	"Kat",
    	// ...
    ];
    ```
    
- Use **double quotes, not single quotes.**
    
    ```jsx
    // JavaScript
    utils._log("I love you.");
    
    // CSS
    #element-id::before {
    	content: "Example text";
    }
    
    // HTML
    <img src="./assets/images/logo.png" alt="logo" id="home" draggable="false">
    ```
    
- Indent with **2 spaces, not 4 spaces.**
    
    You can change this setting in Visual Studio Code on the bottom of the screen.
    
    ![Untitled](Styling%20Guide%200a9be19afdee48efa10d92ea23980622/Untitled.png)
    
    Note: It’s *not* that 2 spaces is objectively better than 4 spaces. It’s simply that most of our files happen to be indented with 2 spaces, so any file that uses 4 spaces (or tab characters) *sticks out like a sore thumb*.
    
- Always use triple equals `===` instead of double equals `==`!
    
    In the same vein, use `!==` instead of `!=`.
    
    Otherwise, you run into weird quirks like this:
    
    ![Hint: this diagram will be on the quiz!](Styling%20Guide%200a9be19afdee48efa10d92ea23980622/Untitled%201.png)
    
    Hint: this diagram will be on the quiz!
    
- **Never ever** use `var`! Use `const` and `let` instead. Always prefer using `const` whenever you can. This will help you notice logical errors, since JavaScript is notorious for not complaining even when something is clearly wrong.
    
    **The majority of your variables should be `const`!** Surprisingly few variables actually need to change value. Use `const` for the following:
    
    ```jsx
    // HTMl elements
    const editor = document.getElementById("editor");
    
    // Objects
    const audioObject = {
    	notes: {
    		10: "Great job!"
    	},
    	path: "/path/to/file.mp3"
    }
    
    // IMPORTANT!
    // Even though audioObject is a constant, you can still
    // update its properties!
    // You just can't reassign the object to something else.
    
    audioObject.path = "/new-path/to/new-file.mp3"; // Valid!
    audioObject = {}; // This will throw an error!
    
    // Arrays
    const favoriteColors = ["red", "green", "blue"];
    
    favoriteColors[1] = "purple"; // Valid!
    favoriteColors = "purple"; // This will throw an error!
    
    // For-of loops!
    // This will print out:
    // soup
    // pizza
    // rice
    const favoriteFoods = ["soup", "pizza", "rice"];
    
    for (const food of favoriteFoods) {
    	console.log(food);
    }
    
    // Or
    favoriteFoods.forEach(food => {
    	console.log(food);
    });
    ```
    
    **Rule of thumb:** If you can use `const`, use `const`! Only use `let` if you absolutely need to change the value (not property) of a variable. This is more uncommon than you think! Never use `var` under any circumstance.
    
    There are pretty much only two situations where you would need to use `let` instead of `const`.
    
    ```jsx
    // Regular for loops
    for (let i = 0; i < 10; i++) {
    	console.log(i ** 2);
    }
    
    // Note, for tranversing arrays and objects, you can use a for-of loop instead.
    // For traversing arrays, you also have the option of using forEach().
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
    
    // Another situation in which you would need to use `let` is
    // if you need to declare a variable but initialize it in a different scope.
    const textBox = document.getElementById("#text-box");
    let value;
    
    function init() {
    	value = textBox.value;
    }
    
    function foo(text) {
    	alert(text);
    }
    
    window.addEventListener("load", init);
    foo(value);
    ```
    
- **Naming conventions**
    
    Hint: this will also be on the quiz!
    
    - Files and folders use `kebab-case`.
    - JavaScript class names use `PascalCase`.
        - Private variables within classes should be prepended with `#`.
        - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
    - Global primitive constants (numbers, strings, booleans) use `UPPER_SNAKE_CASE`.
    - Variables and non-primitive constants (objects, arrays) use `camelCase`.
    - HTML IDs and classes use `kebab-case`.
    
    ```jsx
    // folder-name/javascript-file.js
    
    const DEBUG_FLAG = true;
    const exampleElement = document.getElementById("example-element");
    
    class CitrusFruit {
    	#isSour;
    
    	constructor(isSour) {
    		this.#isSour = isSour;
    	}
    
    	get isSour() {
    		return this.#isSour;
    	}
    }
    
    const yellowLemon = new CitrusFruit(true);
    
    if (DEBUG_FLAG) {
    	console.log(yellowLemon.isSour);
    }
    ```
    
- When writing HTML, when should I use class and when should I use ID?
    
    **A Class name can be used by multiple HTML elements, while an ID name must only be used by one HTML element within the page.**
    
    If you know for sure that there will only be one element of its kind, use ID. Otherwise, use class.
    
    ```html
    <textarea id="note-editor"></textarea>
    
    <p class="note">Great work!</p>
    <p class="note">Try playing this part more quietly.</p>
    ```
    
    For performance reasons, prefer using `getElementById` instead of `querySelector`.
    
    ```jsx
    // This is faster :)
    const noteEditor = document.getElementById("note-editor");
    
    // This is slower :(
    const noteEditor = document.querySelector("#note-editor");
    ```
    
- Use template strings instead of string concatenation.
    
    ```jsx
    function printInfoGood(firstName, lastName, favoriteFood) {
    	console.log(
    		`My name is ${lastName}, ${firstName}, and I love to eat ${favoriteFood}!`
    	);
    }
    
    function printInfoBad(firstName, lastName, favoriteFood) {
    	console.log(
    		"My name is " + lastName + ", " + firstName + ", and I love to eat "
    		+ favoriteFood + "!"
    	);
    }
    
    printInfoGood("Bennett", "French onion soup");
    ```
    
- Use arrow functions!
    
    ```jsx
    // Good :)
    window.addEventListener("load", () => {
    	// ...
    });
    
    // Bad :(
    window.addEventListener("load", function onload() {
    	//...
    });
    
    const array = [1, 2, 3, 4];
    
    // Good :)
    const arrayDoubled = array.map(num => num * 2);
    
    // Bad :(
    const arrayDoubledBad = array.map(function double(num) {
    	return num * 2;
    });
    
    // Prints [2, 4, 6, 8]
    console.log(arrayDoubled);
    ```
    
- Always check for extra spaces to the right of an ending curly brace or semicolon.
- Use appropriate whitespacing between words and symbols.
    
    ```jsx
    // Good
    for (let i = 0; i < 10; i++) {
    	if (i % 2) {
    		utils._log(`${i} is an odd number!`);
    	} else {
    		utils._log(`${i} is an even number!`);
    	}
    }
    
    // Bad
    for(let i=0;i<10;i++){
    	if(i%2){
    		utils._log(`${i} is an odd number!`);
    	}else{
    		utils._log(`${i} is an even number!`);
    	}
    }
    
    // Good
    import { foo, bar, baz } from "../quz.js";
    
    // Bad
    import {foo,bar,baz} from "../quz.js";
    ```
    
    - Something like `document.querySelector(”button”);` is okay though.
    - Add new line characters generously to separate different chunks of code.
    
    ```jsx
    const grault = require("grault");
    const garply = require("garply");
    
    const foo = 1;
    const bar = 2;
    const baz = 3;
    
    qux.disable();
    qux.list(foo);
    qux.print(bar);
    
    grault.addEventListener("load", garply);
    ```
    
- We are only using Super Linter on JavaScript files, but try to keep HTML and CSS files clean and consistent as well.
- Lines should not be more than 80 characters.
    
    You can add a vertical ruler in your VS Code settings: [https://stackoverflow.com/questions/29968499/vertical-rulers-in-visual-studio-code](https://stackoverflow.com/questions/29968499/vertical-rulers-in-visual-studio-code)
    

```jsx
// Break up long lines like so
dictionary["This line is so long"].foo({ optional: true, name: "Cow", number: -1.23 }).bar(["banana", "apple", "orange", "lemon", "grape"]);

dictionary["This line is so long"]
	.foo({
		optional: true,
		name: "Cow",
		number: -1.23
	})
	.bar([
		"banana",
		"apple",
		"lemon",
		"orange",
		"grape"
	]);
```

Hint: The following are all fair game for the quiz.

- Default function values
    
    ```jsx
    // Good :)
    function add(a = 2, b = 3) {
    	return a + b;
    }
    
    // Returns 2 + 3 = 5
    add();
    
    // Returns 4 + 3 = 7
    add(4);
    
    // Bad :(
    function addBad(a, b) {
    	if (a === undefined)
    		a = 2;
    
    	if (b === undefined)
    		b = 3;
    
    	return a + b;
    }
    ```
    
- Swapping two variables
    
    ```jsx
    let a = 1;
    let b = 2;
    
    // Good
    [a, b] = [b, a];
    
    // Bad
    let temp = b;
    b = a;
    a = temp;
    ```
    
- Object property shorthand
    
    ```jsx
    const fruit = "apple";
    const animal = "cow";
    
    // Good :)
    const object = { fruit, animal };
    
    // Prints { fruit: "apple", animal: "cow" }
    console.log(object);
    
    // Bad :(
    const object2 = { fruit: fruit, animal: animal };
    
    // Prints { fruit: "apple", animal: "cow" }
    console.log(object2);
    ```
    
- Functions inside of objects
    
    ```jsx
    // Good :)
    const object = {
    	foo(a, b) {
    		// ...	
    	},
    	bar(c, d) {
    		// ...
    	}
    };
    
    // Bad :(
    const object2 = {
    	foo: function(a, b) {
    		// ...	
    	},
    
    	// Also bad, even though it uses an arrow function
    	bar: (c, d) => {
    		// ...
    	}
    };
    ```
    
- And many other stylistic shorthands (aka syntactic sugar): [http://es6-features.org/](http://es6-features.org/)

## Documentation (JSDoc)

For your function to be parsed by JsDoc, please format your function like so:

```jsx
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```

**CONSISTENCY ACROSS THE BOARD IS WHAT MATTERS MOST**

**And remember: every inconsistency you create in the styling of your code is an inconsistency that our small, hardworking QA team of @Katherine Wong, @Ben Snowbarger, and @Billy Sudirdja will have to fix!**

If all of the code is stylistically flawless †, @Bennett Zhang will buy everyone cookies ‡.

† As determined by @Bennett Zhang only.

‡ Terms and conditions may apply. Please consult your doctor if you have been experiencing dizziness, heavy breathing, or severe constipation. Cookies may contain trace amounts of mercury, arsenic, and/or lead for flavor enhancement purposes.

## Assignments

| Alex | audio-object.js (client) | type-a.js |
| --- | --- | --- |
| Ben S | index.js | type-f.js (local) |
| Ben Z | type-f-card.js | audio.js |
| Billy | type-f-create-screen.js | folders.js |
| Emmanuel | audio-object-card.js | notes.js |
| Ernest | audio-object-create-screen.js | utils.js |
| Grace | type-a-card.js | app.js |
| Kat | type-a-create-screen.js | imports.js |
| Kevin | type-f.js (client) | README.md |
| Ryan | file-success-screen.js | README.md |
| Sailor | audio-object.js (local) | README.md |

Name your branches: styling-name

Then do a pull request as usual.

If you are merging, check to see if Codacy and Super Linter pass.