---
title: Pointer Basics
parent: Pointers
nav_order: 1
---

<!-- prettier-ignore-start -->

# Pointer Basics 
{: .no_toc }

Program variables are each stored at a difference address within our computer's memory. *Pointers* can be used to access the contents of variables stored at specific memory addresses.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## The Address-Of Operator

When we store data in a variable, that data gets stored in our computer's Random Access Memory (RAM).

We can access the memory address of any variable using the address-of operator `&`:

<iframe height="600px" width="100%" src="https://repl.it/@stungeye/Address-Of-Operator?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## The Indirection Operator

What can we do with the memory address of a variable? Not much without the indirection operator `*`.

Using this operator, we can access the data stored at a particular memory address. This is sometimes called _dereferencing_.

<iframe height="500px" width="100%" src="https://repl.it/@stungeye/Indirection-Address?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## What are Pointers?

The address-of and indirection operators aren't too exciting on their own, but they are crucial for understand the concept of _pointers_.

A pointer is a type of variable used to store the memory address of another variable. In this way, a pointer "_points to_" another variable.

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

⚡ Warning:
{: .label .label-red}

The pointer definition use of an asterisk is different from the indirection operator.
{: .d-inline-block}

## Redefining a Pointer

After a pointer has been defined and initialized we can also change what it points to.

<iframe height="700px" width="100%" src="https://repl.it/@stungeye/Defining-and-Initializing-Pointers?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Example: C-Array Pointer Navigation

Many collections in C++ are implemented using pointers. Look back over [our module on iterators](/Programming-1-Notes/docs/06-collections/05-iterators.html) and you'll see how similar pointers are to iterators.

C-style arrays are also implemented using pointers and we can use what is call _pointer arithmetic_ to access elements within an array.

<iframe height="800px" width="100%" src="https://repl.it/@stungeye/C-Style-Arrays-and-Pointers?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

⚡ Warning:
{: .label .label-red}

Pointer arithmetic can be dangerous if you point beyond array boundaries.
{: .d-inline-block}

## Pointers and Const

The concept of `const` can be applied to pointers in a few different ways:

- Regular pointers cannot point to `const` variables:

```cpp
  const int answer{42};
  int* answerPointer{&answer}; // COMPILE ERROR: Regular pointers can't point to const variables.
```

- Pointers can be made to point to `const` variables, but the pointer can be reassigned:

```cpp
  const int answer1{42};
  const int answer2{999};
  const int* answerPointer{&answer1}; // Okay! Note: const comes first.
  answerPointer = &answer2;           // Weird, but also fine!
  (*answerPointer) = 12;              // COMPILE ERROR: Cannot change a const value.
```

- Pointers can also be made `const`, meaning they cannot be changed after initialization:

```cpp
  int answer1{42};
  int answer2{999};
  int* const answerPointer{&answer1}; // Note: const comes after type.
  answerPointer = &answer2;           // COMPILE ERROR: Const pointers cannot be reassigned.

```

## Uninitialized Pointers

Unassigned pointers, sometimes called _wild pointers_ contain what is known as a _garbage address_.

```cpp
  double e{2.71828};
  double* validPointer{&e}; // Points to the memory address of the 'e' variable.
  double* garbagePointer; // Uninitialized. Contains a garbage address.
```

💡 Best Practice:
{: .label .label-green }

Dereferencing a wild pointer is undefined behaviour and should be avoided.
{: .d-inline-block}

## Null Pointers

There is a special literal value `nullptr` we can assign to pointers to indicate that they are uninitialized.

```cpp
  int* nullPointer1{nullptr}; // Manually made null using the nullptr literal.
  int* nullPointer2{};        // An empty initializer will also create null pointers.
```

Previously assigned pointers can also be made null.

```cpp
  double e{2.71828};
  double* validPointer{&e}; // Points to the memory address of the 'e' variable.
  validPointer = nullptr;   // Previously valid pointers can be made null.
```

💡 Best Practice:
{: .label .label-green }

Uninitialized pointers should always be explicitly made into _null pointers_.
{: .d-inline-block}

## Guarding Against Dereferencing a Null Pointer

Dereferencing a null pointer is undefined behaviour.

```cpp
    int* pointer{}; // Creates a null pointer
    std::cout << *pointer; // UNDEFINED BEHAVIOUR!
```

As such, we should _always_ guard pointer access with a boolean test.

```cpp
    // METHOD #1:
    if (pointer != nullptr) {
      // pointer isn't null, so we can access it:
      std::cout << *pointer;
    }
    // METHOD #2:
    if (pointer) { // Non-null pointers are "truthy" while nullptr is "falsey".
      // pointer isn't null, so we can access it:
      std::cout << *pointer;
    }
```

⚡ Warning:
{: .label .label-red}

Pointers that evaluates as true aren't guaranteed to point to a valid memory location.
{: .d-inline-block}

## NULL and 0 for Null Pointers

In legacy code you will often see the number `0` or the preprocessor macro `NULL` used in place of `nullptr`. [Subtle bugs](https://www.learncpp.com/cpp-tutorial/pass-by-address-part-2/) can be triggered when using `0` or `NULL`.

💡 Best Practice:
{: .label .label-green }

Always use `nullptr` when using C++ 11 or greater, even when updating legacy code.
{: .d-inline-block}

## Pointers vs References

At this point you might be wondering why C++ includes both pointers and references when they appear to offer nearly identical functionality.

The short answer: C++ inherited pointers from C and references were added later.

References should be preferred over pointers because:

- Reference syntax is cleaner than pointer syntax. (No need for the indirection and address-of operators.)
- References are safer than pointers as they must always refer to a valid variable. (Unlike with pointers, there is no such thing as an uninitialized reference or a null reference.)

🎵 Note:
{: .label .label-yellow}

In legacy code (or in Unreal Engine C++) pointers are everywhere and cannot be avoided.
{: .d-inline-block}

## Further Reading

The [learncpp.com](https://www.learncpp.com/) website goes into great detail on all thing pointer related, specifically their sections:

- [9.6 Introduction to Pointers](https://www.learncpp.com/cpp-tutorial/introduction-to-pointers/)
- [9.7 Null Pointers](https://www.learncpp.com/cpp-tutorial/null-pointers/)
- [9.8 Pointers and const](https://www.learncpp.com/cpp-tutorial/pointers-and-const/)
