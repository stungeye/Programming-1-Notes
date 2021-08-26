---
title: Pointer Basics
nav_order: 11
---

# Pointer Basics

TBW

## Objectives

Upon completion of this module, you should be able to:

## The Address-Of Operator

When we store data in a variable, that data gets stored in our computer's Random Access Memory (RAM).

We can access the memory address of any variable using the address-of operator `&`:

<iframe height="600px" width="100%" src="https://repl.it/@stungeye/Address-Of-Operator?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## The Indirection Operator

What can we do with the memory address of a variable? Not much, without the indirection operator `*`.

Using this operator, we can access the data stored at a particular memory address. This is sometimes called _dereferencing_.

<iframe height="500px" width="100%" src="https://repl.it/@stungeye/Indirection-Address?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Pointers

The address-of and indirection operators aren't too exciting on their own, but they are crucial for understand the concept of _pointers_.

A pointer is a type of variable used to store the memory address of another variable. In this way, a pointer "_points to_" another variables.

When people talk about C or C++ being confusing this opinion usually has something to do with pointers (and manual memory management).

🎵 Note:
{: .label .label-yellow}

The address-of operator `&` returns a pointer, not a raw number for the memory address.
{: .d-inline-block}

## Defining and Initializing Pointers

We declare pointers by placing an asterisk after the data type in the declaration.

```cpp
  // Create an integer variable:
  int wholeNumber{ 42 };
  // Create a pointer to the integer variable:
  int* numberPointer{ &wholeNumber };
  // Access the value 42 by way of the variable:
  std::cout << " wholeNumber: " << wholeNumber << "\n";
  // Access the value 42 by dereferencing the pointer:
  std::cout << " *numberPointer: " << *numberPointer << "\n";
  // Change the value of wholeNumber using the pointer:
  (*numberPointer)++; // wholeNumber is now 43
```

🎵 Note:
{: .label .label-yellow}

The pointer definition use of an asterisk is different from the indirection operator.
{: .d-inline-block}

## Redefining a Pointer

After a pointer has been defined and initialized we can also change what it points to.

<iframe height="700px" width="100%" src="https://repl.it/@stungeye/Defining-and-Initializing-Pointers?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Pointers and Arrays

Many collections in C++ are implemented using pointers. Look back over [our module on iterators](/Programming-1-Notes/docs/06-collections/05-iterators.html) and you'll see that you've already used pointers to traverse vectors.

C-style arrays are also implemented using pointers, and we can use what is call _pointer arithmetic_ to access elements within an array:

<iframe height="800px" width="100%" src="https://repl.it/@stungeye/C-Style-Arrays-and-Pointers?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

⚡ Warning:
{: .label .label-red}

Pointer arithmetic can be dangerous if you point beyond array boundaries.
{: .d-inline-block}

## Pointers and Functions

Pointers can be passed to and returned from functions.

In Unreal Engine C++ code, for example, the following is common:

- Passing around game objects using function parameters that are pointers.
- Built-in functions that return pointers to objects managed by the engine.
- Binding callback functions to events or timers using function pointers.

We'll look at function pointers next.

## Pointers and Function Arguments

## std::function and "lambdas as adaptors" Tour of C++ Page 180

## Null Pointer

## Pointers and Const

## Pointer vs References

## Pointers and Objects

## Stack vs Heap Memory Allocation?
