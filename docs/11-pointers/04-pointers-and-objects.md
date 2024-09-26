---
title: Pointers and Objects
parent: Pointers
nav_order: 4
---

<!-- prettier-ignore-start -->

# Pointers and Objects
{: .no_toc }

Before C++ had references, pointers to objects were commonplace. There are still situations (such as polymorphism) where pointers to objects are needed in C++. The standard library also includes special "smart pointer" classes that help you avoid memory leaks in your code. 

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Pointers to Objects

Pointers can point to any type of variable. This includes structs and objects.

Let's create a pointer to an object of a simple custom class:

```cpp
#include <iostream>
#include <string>

class Location {
  // Private Members:
  int x, y;
public:
  // Public Member Variable:
  std::string name;
  // Public Constructor:
  Location(int x, int y, std::string name) : x{x}, y{y}, name{name} {
  };
  // Public Member Function (Method):
  void print() {
    std::cout << "Location X: " << x << " Y: " << y << "\n";
  }
};

int main() {
    Location* locationPointer{ new Location{ 50, 45, "Winnipeg" } };

    // We can use the dereferencing operator to access public members and methods:
    std::cout << (*locationPointer).name << "\n";
    (*locationPointer).print();
}
```

## Member Access Through a Pointer

Because pointers to objects are so common, a special _member selection from pointer_ operator `->` was added to the language to simplify member access through a pointer.

This operator is a replacement for the dot `.` and removes the need for dereferencing. It's sometimes called the _arrow operator_ or the _stabby operator_.

The arrow operator -> is useful because, when you're working with pointers to objects, dereferencing the pointer using `(*pointer).member` can be cumbersome. The arrow operator simplifies this by combining dereferencing and member access in one step.

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

```cpp
#include <iostream>

class Location {
  int x, y;

public:
  std::string name;
  Location(int x, int y, std::string name) : x{x}, y{y}, name{name} { 
  };

  void print() {
    std::cout << "Location X: " << x << " Y: " << y << "\n";
  }
};

int main() {
  for(int i = 0; i < 10; ++i) {
    int x{ rand() % 100 };
    int y{ rand() % 100 };
    Location* locationPointer{ new Location{ x, y, "Winnipeg" } };

    // Member and method access using deref operator:
    (*locationPointer).print(); 
    std::cout << (*locationPointer).name << " ";
    
    // Member and method access using arrow operator:
    locationPointer->print();  
    std::cout << locationPointer->name << "\n\n";
  
    delete locationPointer;    // Delete memory to avoid memory leak.
    locationPointer = nullptr; // Not required, but for best-practice.
  }
}
```

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

Stack-based objects are particularly efficient for small and short-lived objects, as they have automatic lifetime management and minimal overhead compared to heap-allocated objects.

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
      // Imagine that this factory returns a pointer to an Engine.
      // The returned memory is the resource that we are acquiring
      // during initialization.
      engine = EngineFactory.create();
  }

  ~Car() {
      // Automatically release engine's memory back to the heap
      // when this object goes out of scope.
      delete engine;
  }
}
```

## Smart Pointers

Although you can implement RAII with raw pointers as shown above, in modern C++ it is recommended to use smart pointers like `std::unique_ptr` instead. Raw pointers are more error-prone and can easily lead to memory leaks or undefined behavior.

There are three different kinds of smart pointers in the Standard Library (Unique, Shared, and Weak Pointers). We're only going to look at the most common of the three, Unique Pointers.

## Unique Pointers

A unique pointer is simply an object that wraps a pointer. When a unique pointer object goes out of scope it will automatically release its member pointer's memory. RAII!

Unique pointers are part of the `<memory>` header and have a type of `std::unique_ptr`. They can be constructed using the `make_unique<>()` helper function.

## Unique Pointers Usage

Here's a contrived example of a memory leak. You will need to assume the presence of an `Answer` class.

```cpp
void printTheAnswerToLifeTheUniverseAndEverything() {
  Answer *answerPtr{new Answer("Meaning of it all.")};
  std::cout << *answerPtr;
  // Oops! Memory Leak! We forgot to delete the answerPtr.
}

// Later in the code:
while (1) {
  // This function will crash once the heap is exhausted.
  printTheAnswerToLifeTheUniverseAndEverything();
}
```

Here's the same scenario using a `std::unique_ptr`:

```cpp
#include <memory>

void printTheAnswerToLifeTheUniverseAndEverything() {
  std::unique_ptr<Answer> answerPtr = std::make_unique<Answer>("Meaning of it all.");
  std::cout << *answerPtr;
} // answerPtr goes out of scope when function ends. Its heap memory will be auto-deleted.

// Later in the code:
while (1) {
  // This is fine. No more memory leak:
  printTheAnswerToLifeTheUniverseAndEverything();
}
```

## Moving Unique Pointers

Unique pointers get their name because the do not allow assignment. There can only be one _unique_ variable that has ownership over a unique pointer.

```cpp
std::unique_ptr<Answer> sneakyPtr; // Starts as nullptr.
std::unique_ptr<Answer> answerPtr = std::make_unique<Answer>("Meaning of it all.");

sneakyPtr = answerPtr; // Compile Error! Assignment is not allowed!
```

We can, however, move the ownership from one variable to another:

```cpp
std::unique_ptr<Answer> newOwnerPtr; // Starts as nullptr.
std::unique_ptr<Answer> answerPtr = std::make_unique<Answer>("Meaning of it all.");

newOwnerPtr = std::move(answerPtr);
// newOwnerPtr now pointers to the Answer object.
// answerPtr is now a nullptr.
```

Here `std::move` is used to transfer ownership of a `unique_ptr` from one variable to another. Since `unique_ptr` does not allow copying, we use `std::move` to explicitly indicate that ownership of the resource is being transferred.

## Further Reading

- [std::unique_ptr @ learncpp.com](https://www.learncpp.com/cpp-tutorial/stdunique_ptr/)
- [std::shared_ptr @ learncpp.com](https://www.learncpp.com/cpp-tutorial/stdshared_ptr/)

There's a lot more complexity behind `std::move` and what are call _move semantics_ in C++. If you want to travel down that rabbit hole, I recommend these three videos:

- [l-values and r-values in C++ @ The Cherno on YouTube](https://www.youtube.com/watch?v=fbYknr-HPYE)
- [Move Semantics in C++ @ The Cherno on YouTube](https://www.youtube.com/watch?v=ehMg6zvXuMY)
- [std::move and the Move Assignment Operator in C++](https://www.youtube.com/watch?v=OWNeCTd7yQE)
