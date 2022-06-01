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

<iframe height="800px" width="100%" src="https://replit.com/@stungeye/stdfunction-vs-Function-Pointers?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Function Pointers as Function Arguments

Here's a rewritten version of the [the example from the lambdas module](/Programming-1-Notes/docs/10-lambdas/00-lambdas.html#lambdas-as-function-arguments) where a function is being passed to another function as an argument. In this rewrite we're using a function pointer rather than `std::function`.

<iframe height="800px" width="100%" src="https://replit.com/@stungeye/Functions-as-Arguments-with-Function-Pointers?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Creating Aliases std::function and Function Pointers

As a human it can be hard to parse complex `std::function` or function pointer types. For that reason it's nice to use the `using` keyword to create aliases for these complex types.

```cpp
    using myStandardFunction = std::function<bool(int, double)>;
    using myFunctionPointer bool (*)(int, double);

    myStandardFunction myFunction1;
    myFunctionPointer myFunction2;
```

Here's the `filterPrint` function from the above embedded example rewritten with an alias:

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
