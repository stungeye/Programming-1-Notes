---
title: Pointers and Functions
parent: Pointers
nav_order: 2
---

<!-- prettier-ignore-start -->

# Pointer and Functions
{: .no_toc }

In the lambdas module we saw the benefit of being able to pass code to another function. Similarly, you will sometimes want to pass a function to another function. 

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Pointers and Functions

Pointers can be passed to function as arguments.

In Unreal Engine C++ code, for example, the following is common:

- Passing around game objects using function parameters that are pointers.
- Built-in functions that return pointers to objects managed by the engine.
- Binding callback functions to events or timers using function pointers.

We'll look at function pointers next.

## Pointers and Function Arguments

At the end of the [Lambdas module](/Programming-1-Notes/docs/10-lambdas/00-lambdas.html#lambdas-as-function-arguments) we looked using the `std::function` type from the `<functional>` header to pass lambdas as arguments to other functions.

Any function that accepts a `std::function` can also accept a reference to another function. Take a moment to review [the example from the lambdas module](/Programming-1-Notes/docs/10-lambdas/00-lambdas.html#lambdas-as-function-arguments).

## Plain Old Function Pointers

The `std::function` type has been around since C++11, but before then we could accomplish the same thing using function pointers. The following are some example `std::function` definitions with the function pointer equivalents:

```cpp
// Standard function for a void function that takes no arguments.
std::function<void(void)> myFunction;
// Pointer to a void function that takes no arguments.
void (*myFunction)(void);

// Standard function that returns a bool and takes a single integer argument:
std::function<bool(int)> myFunction;
// Pointer to a function that returns a bool and take single integer argument:
bool (*myFunction)(int);

// Standard function that returns a double and take 3 args (string, int bool).
std::function<double(std::string, int, bool)> myFunction;
// Pointer to a function that returns a double and takes 3 args (string, int bool).
double (*myFunction)(std::string, int, bool);
```

## std::function vs Function Pointers

Here's an example of using `std::function`s compared with function pointers in the context of variables:

```cpp
#include <iostream>
#include <functional>

void hello() {
  std::cout << "Hello\n";
}

bool greaterThanFive(int num) {
  return num > 5;
}

int main() {
  std::function<void(void)> stdFunction1;
  void (*functionPointer1)(void);

  stdFunction1 = functionPointer1 = hello;
  stdFunction1();
  functionPointer1();
  
  std::function<bool(int)> stdFunction2;
  bool (*functionPointer2)(int);

  stdFunction2 = functionPointer2 = greaterThanFive;
  bool sevenGreaterThanFive = stdFunction2(7);
  bool nineGreaterThanFive = functionPointer2(9);
}
```

## Function Pointers as Function Arguments

Here's a rewritten version of the [the example from the lambdas module](/Programming-1-Notes/docs/10-lambdas/00-lambdas.html#lambdas-as-function-arguments) where a function is being passed to another function as an argument. In this rewrite we're using a function pointer rather than `std::function`.

```cpp
#include <iostream>
#include <vector>

void filterPrint(const std::vector<int>& vector, bool (*predicate)(int)) {
  for(auto element : vector) {
    if (predicate(element)) {
      std::cout << element << "\n";
    }
  }  
};

bool isEven(int num) {
  return num % 2 == 0;
}

int main() {
  std::vector<int> numbers{ 2, 34, 1, 679, 50, 12, 34, 31, 3, 107 };

  std::cout << "All the numbers greater than 40 in our vector:\n";
  filterPrint(numbers, [](int num)->bool{ return num > 40;});

  std::cout << "\nAll the even numbers in our vector:\n";
  filterPrint(numbers, [](int num)->bool{ return num % 2 == 0;});

  // Note that regular functions can be passed as well:
  std::cout << "\nAll the even numbers in our vector:\n";
  filterPrint(numbers, isEven);
}
```

## Creating Aliases for std::function and Function Pointers

As a human it can be hard to parse complex `std::function` or function pointer types. For that reason it's nice to use the `using` keyword to create aliases for these complex types.

```cpp
using myStandardFunction = std::function<bool(int, double)>;
using myFunctionPointer bool (*)(int, double);

myStandardFunction myFunction1;
myFunctionPointer myFunction2;
```

Here's the `filterPrint` function from the above example rewritten with an alias:

```cpp
using predicateFunction = bool(*)(int);

void filterPrint(const std::vector<int>& vector, predicateFunction predicate) {
  for(auto element : vector) {
    if (predicate(element)) {
      std::cout << element << "\n";
    }
  }
};
```
