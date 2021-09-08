---
title: Functions
parent: Introduction to C++
nav_order: 8
---

<!--prettier-ignore-start-->
# Functions
{: .no_toc }

A function is a named, independent section of code that performs a specific task and optionally returns a computed value. Variable scope refers to the part of a program where a particular variable is declared and can be used.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Functions

Functions are the verbs of computer programming. They do things.

They increase:

- **Modularity**, by allowing us to break down large programs into smaller parts.
- **Reusability**, by allowing us to reuse code without having to retype or copy/paste it.
- **Readability**, by allowing us to give descriptive names to specific parts of our program.

## Function Definition and Execution

Functions are defined in C++ with a return type, a name, and an optional list of input parameters.

```
type functionName(type parameter1, type parameter2) {
  // function body
}
```

A function with a return type of `void` does not return a value.

```cpp
void sayGoodnight() {
  std::cout << "So Long\nFarewell\n";
}

// To execute this function:
sayGoodnight();
```

## Function Parameters and Arguments

Functions can be defined to take one or more arguments by way of a parameter list.

Default values for the parameters can also be specified.

```cpp
void sayGoodnightRepeatedly(std::string name, int numberOfTimes = 1) {
  for (int i{0}; i < numberOfTimes; i++) {
    std::cout << "Goodnight " << name << "\n";
  }
}

sayGoodnightRepeatedly("Wally", 12);
sayGoodnightRepeatedly("Wally"); // Second argument defaults to 1.
```

## Return Values

Functions can optionally return a value to the caller.

```cpp
std::string pizzaMessage(int piecesLeft, int hungryPeople) {
  if (piecesLeft < people) {
    return "Sorry we don't have enough pizza.";
  } else {
    return "Let's share! Any leftovers go to the dog.";
  }
}

std::cout << pizzaMessage(13, 7) << "\n";
```

## Whitespace

Because C++ ignores whitespace you'll sometimes see function calls spread over multiple lines.

This is done for readability purposes and helps avoid extra-long lines of code.

```cpp
functionName(argumentOne,
             argumentTwo,
             argumentThree,
             argumentFour);
```

## Forward Declaration

Functions need to be declared before they can be used.

Try to compile/run this program:

<iframe height="700px" width="100%" src="https://repl.it/@stungeye/Forward-Declaration?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Instead of moving the `fetchInteger` function above the `main` function, we can _forward declare_ `fetchInteger`. Uncomment the forward declaration to fix the above code.ss

🎵 Note:
{: .label .label-yellow}

Parameter names are optional when forward declaring a function.
{: .d-inline-block}

In the above program the forward declaration could have been:

```cpp
int fetchInteger(std::string);
```

## Functions and Header Files

It's common to forward declare functions defined in separate `.cpp` source files using `.h` header files.

First the function is forward declared in a header with [include guards](s/docs/05-introduction-to-cpp/02-the-build-process.html#preprocessor-directive---include-guards):

```cpp
#ifndef USERINPUT_H
#define USERINPUT_H
int fetchInteger(std::string prompt);
#endif
```

The function can now be implemented in a `.cpp` file separate from where `main()` is defined. Both `.cpp` files must then `#include` the associated `.h` header file.

Navigate through the example files using the left pane "Files" explore:

<iframe height="600px" width="100%" src="https://repl.it/@stungeye/Function-and-Headers?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## What to Return from Main

The `main()` function is the only function with a non-`void` type where we don't have to explicitly `return`:

```cpp
int main() {
  int goatCount = 12;
}
```

The `main()` function is your program's entry point. The value returned by `main()` is called a _status code_ or _exit code_, and it's sent to the Operating System when the program exits.

Non-zero status codes are used to indicate program failure.

If no `return` is present it's equivalent to returning `0`, meaning success.

The `<cstdlib>` header defines two status codes you can use when returning from `main()`:

- `EXIT_SUCCESS`
- `EXIT_FAILURE`

## Variable Scope

Like other `{}` blocks, C++ functions each have their own scope.

```cpp
std::string gemFactory(int numberOfGems) {
  // The gems variable is a local variable.
  std::string gems = std::string(numberOfGems, '💎'); // gems variable is scoped to function.
  return gems;
}

int main() {
  std::cout << gemFactory(5) << "\n";
  std::cout << gems; // Error: "gems" variable is out of scope.
}
```

## Pass by Value

C++ functions are _pass-by-value_ by default, meaning copies are made of the arguments passed to a function.

```cpp
int increment(int number) {
  number++;
  return number;
}

void main() {
  int a = 5;
  int b = increment(a); // The value of "a" is copied to the "number" parameter.

  std::cout << a << "\n"; // Remained 5
  std::cout << b << "\n"; // 6
}
```

🎵 Note:
{: .label .label-yellow}

There is a performance "copy cost" for non-primitive types like arrays or objects.
{: .d-inline-block}

## Pass By Const Reference

To avoid the performance cost associated with pass-by-value we use [const references](/Programming-1-Notes/docs/05-introduction-to-cpp/03-data-types-variables-constants.html#reference-variables) for our function parameters. Passing a reference to a variable means no copy needs to be performed, the `const` prevents the function from changing the referenced variable.

For example, let's use a reference parameter to avoid the cost of copying a large object into a function.

```cpp
void logMonster(const Monster& m) {
  // Implementation details are unimportant.
}
```

☝️ _Code assumes the `Monster` class is defined elsewhere._

## Pass by Reference

Changes made to non-`const` reference parameters affect the variable passed into the function.

```cpp
int mutator(int& number) {
  number++; // Changes the value of the variable referenced by "number".
  return number;
}

void main() {
  int a = 5;
  int b = mutator(a); // "a" and "b" become 6.

  std::cout << a << "\n"; // 6
  std::cout << b << "\n"; // 6
}
```

💡 Best Practice:
{: .label .label-green }

[Prefer `return` statements](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rf-out) to using references to return data from functions.
{: .d-inline-block}

## In-Out Parameters

Keeping the above best practice in mind, the performance hit of copying large variables into and then out of a function can be avoided using **in-out-parameters**.

Non-`const` reference parameters allow expensive to copy variables to be modified by a function:

```cpp
void update(Monster& monster) {
  // Updates the object referenced by "monster".
  // Implementation unimportant.
}
```

## Multiple Out Parameters

Resist the urge to use reference parameters as a way of returning multiple values from a function.

```cpp
void calculateMovement(int time, int& xPosition, int& yPosition) {
  // Implementation unimportant.
}
```

⏳ Wait For It:
{: .label .label-blue}

It's better to return a composite data type like a `struct`, `tuple`, `pair`, etc.
{: .d-inline-block}

## Function Overloading

We can create different versions of the same named function that:

- Have different data types for the arguments.
- Have different numbers of arguments.

Imagine a debugging function called `debugFormat()` defined in a few different ways:

```cpp
void debugFormat() {
  std::cout << "DEBUG\n";
}

void debugFormat(int number) {
  std::cout << "DEBUG (int): " << number << "\n";
}

void debugFormat(double number) {
  std::cout << "DEBUG (double): " << number << "\n";
}

void debugFormat(std::string label, double number) {
  std::cout <<  label << " (double): " << number << "\n";
}

debugFormat(); // Outputs: DEBUG
debugFormat(42); // Outputs: DEBUG (int): 42
debugFormat(3.14); // Outputs: DEBUG (double): 3.14
debugFormat("WARNING", 3.14); // Outputs: WARNING (double): 3.14
```

## Returning Different Types

There may also be instances when you overload a function with a different number/type of parameters and also change the return type.

```cpp
int add(int num1, int num2) {
  return num1 + num2;
}

double add(double num1, double num2) {
  return num1 + num2;
}
```

🎵 Note:
{: .label .label-yellow}

Overloaded functions with different return types need not have identical function bodies.
{: .d-inline-block}

⚡ Warning:
{: .label .label-red}

We cannot overload a function based only on a change in return type.
{: .d-inline-block}
