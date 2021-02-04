---
title: Functions & Scope
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

## Forward Declaration

Functions need to be declared before they can be used.

Try to compile/run this program:

<iframe height="1100px" width="100%" src="https://repl.it/@stungeye/Forward-Declaration?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

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

First the function is forward declared in an header with with [include guards](s/docs/05-introduction-to-cpp/02-the-build-process.html#preprocessor-directive---include-guards):

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

The `<cstdlib>` header defines two status code you can use when returning from `main()`:

- `EXIT_SUCCESS`
- `EXIT_FAILURE`

## Variable Scope

Variables are scoped to the functions or the blocks in which they are defined.

```cpp
std::string gemFactory(int numberOfGems) {
  // The gems variable is a local variable.
  std::string gems = std::string(numberOfGems, '💎');
  return gems;
}

std::cout << gemFactory(5) << "\n";
std::cout << gems; // Error. Variable is out of scope.

int requestedGems;
std::cout << "How many gems do you want? "
std::cin >> requestedGems;
if (requestedGems > 0) {
  std::string yourGems = gemFactory(requestedGems); // yourGems is only scoped to this block.
}

std::cout << yourGems << "\n"; // Error. The yourGems variable is out of scope.
```
