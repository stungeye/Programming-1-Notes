---
title: Pointers and Objects
parent: Pointers
nav_order: 4
---

<!-- prettier-ignore-start -->

# Pointer and Objects
{: .no_toc }

TBW

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Pointers to Objects

Pointers can point to any type of variable. This includes structs and objects.

Let's create a pointer to an object of a simple custom class:

```cpp
class Location {
  // Private Members:
  int x, y;
public:
  // Public Member Variable:
  std::string name;
  // Public Constructor:
  Location(int x, int y, std::string name) : x{x}, y{y}, name{n} {
  };
  // Public Member Function (Method):
  void print() {
    std::cout << "Location X: " << x << " Y: " << y << "\n";
  }
};

// Elsewhere in the code:
Location* locationPointer{new Location{50, 45, "Winnipeg"}};
// We can use the dereferencing operator to access public members and methods:
std::cout << (*locationPointer).name;
(*locationPointer).print();
```

## Member Access Through a Pointer

Because pointers to objects are so common, a special _member selection from pointer_ operator `->` was added to the language to simplify member access through a pointer.

This operator is a replacement for the dot `.` and removes the need for dereferencing. It's sometimes called the _arrow operator_ or the _stabby operator_.

```cpp
Location* locationPointer{new Location{50, 45, "Winnipeg"}};
std::cout << locationPointer->name; // Arrow operator access to member variable.
locationPointer->print(); // Arrow operator method call.
```

💡 Best Practice:
{: .label .label-green }

Always use the arrow operator to access object members through pointers.
{: .d-inline-block}

## Object Pointer Member Access Demo

Here's a full program that uses this `Location` class and demonstrates the two ways of accessing object members from a pointer:

<iframe height="800px" width="100%" src="https://replit.com/@stungeye/Calling-Functions-on-Object-from-Pointers?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

The contrived pointer use in this example was added to demonstrate the arrow operator.
{: .d-inline-block}

## When to Use Pointers to Objects

In modern C++ it's recommended that you create all your objects as regular stack-based local variables, but there are a few situations when you'll need to use pointers:

- You need the object to outlive the current scope.
- You need to store more objects that the stack size can support. (Default Windows stack is 1MB.)
- You need to make use of polymorphism. (See [next module](/Programming-1-Notes/docs/11-pointers/05-pointers-and-polymorphism.html)!)

Somewhat outdated reasons for pointers that you might see in legacy code:

- You want to an object to be optional (by way of `nullptr`). (In modern C++ we have `std::optional`.)
- You are writing a class that has objects as members and you want to delay the creation of those members until your class constructor is run. (In modern c++ we could use initializer lists to initialize the members at the correct time. [See this example code](https://gist.github.com/stungeye/e8d5ea1f428f513edd1e159fc80b445d).)

💡 Best Practice:
{: .label .label-green }

Prefer stack-based variables over pointers, if you can.
{: .d-inline-block}

## RAII - Resource Acquisition is Initialization

If you need a refresher, see [the RAII section of the classes module](/Programming-1-Notes/docs/08-user-defined-types/03-classes.html#raii---resource-acquisition-is-initialization).

We'll look at RAII through the lens of Smart Pointers soon, but before then let's see how we might use RAII with raw pointers.

Imagine a class with a has-a relationship to a member object that is expensive (time or memory-wise) to create. If the member is created externally and returned as a pointer then to conform to RAII we must acquire access to the member in the constructor and free the member's memory in the destructor:

```cpp
class Car {
    Engine* engine;

public:
    Car() {
        // Imagine that this factor returns a pointer to an Engine.
        // The engine's memory is the resource that we are acquiring
        // during initialization.
        engine = EngineFactor.create();
    }

    ~Car() {
        // Automatically release engine's memory back to the heap
        // when this object goes out of scope.
        delete engine;
    }
}
```

## Smart Pointers

Although we can implement RAII ourselves as seen above, in modern C++ it's recommended that we prefer the use of smart pointers over raw pointers.

A smart pointer is simply an object that wraps a pointer. When smart pointers go out of scope they will automatically release the pointer's memory. RAII!

## Move Semantics and Smart Pointers

https://www.learncpp.com/cpp-tutorial/intro-to-smart-pointers-move-semantics/
Shared Pointer vs Unique Pointer
