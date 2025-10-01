---
title: Pointers and the Heap
parent: Pointers
nav_order: 3
---

<!-- prettier-ignore-start -->

# Pointers and the Heap
{: .no_toc }

During the execution of a C++ program, there are two main pools of memory (RAM) that can be used for variable storage, the stack and the heap. The heap can be used by the programmer to allocate a dynamic amount of memory on the fly.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Stack vs Heap Memory Allocation

The stack (sometimes referred to as the _call stack_) is where function parameters and local variables are stored. Variables and parameters stored on the stack have a set lifetime equal to the scope of the variable. So, for example, the memory used by the local variables of a function is reclaimed after the function has finished executing.

The heap (sometimes referred to as the _free store_) is the pool of RAM dedicated to dynamic memory allocation. In other words, anytime a programmer explicitly requests RAM it will be provided by the heap. This request is triggered by the use of a `new` expression, which will be covered below.

## Stack Allocation

Here's an example of a function with two parameters and a local variable. The memory required for the `num` and `times` parameters as well as the local variable `i` will be allocated on the stack, and automatically reclaimed after the function has executed. This is in contrast to heap memory, which requires the programmer to manually manage and free memory.

```cpp
void repeatDouble(double num, int times) {
    for (int i{ 0 }; i < times; ++i) {
        std::cout << num << "\n";
    }
}
```

## Stack Overflows

Compared to the amount of RAM you have, the stack isn't very large. Stack size is OS/toolchain dependent. On Windows machines with MSVC, the default stack size is only 1 MB. It is therefore possible to exhaust (aka overflow) the stack. 

Here's a program designed to purposefully generate a stack overflow. Can you figure out why the stack gets exhausted?

```cpp
void myCupRunnethOver() {
    int answer{ 42 };
    myCupRunnethOver(); // Recursive call to self.
}

myCupRunnethOver(); // This will eventually trigger a stack overflow!
```

## Dynamic Memory Allocation with New

Another way to allocate memory is by using a `new` expression along with a pointer. A `new` expression is used to request a certain amount of *heap* memory which the pointer can then point to.

Unlike the stack, the heap is not limited to a fixed size and can grow as needed, constrained only by the available system memory.

```cpp
int number{ 42 }; // Stack-allocated
int *numberPtr{ new int }; // Requesting enough memory to store an int from the heap.
*numberPtr = 23; // Storing the number 23 to the heap-allocated memory.

std::cout << number << "\n"; // Printing out the stack-allocated variable.
std::cout << *numberPtr << "\n"; // Printing out the heap-allocated variable.
```

Variable that are heap-allocated can also be assigned values immediately:

```cpp
int *numberPtr{ new int{ 23 } };
std::cout << *numberPtr; // Prints out 23.

int *anotherPtr{ new int{} }; // zero-initialized
std::cout << *anotherPtr; // Prints out 0.
```

⚡ Warning:
{: .label .label-red}

Using `new` in modern C++ for plain-old-data like this is not recommended, but it's still important to understand.
{: .d-inline-block}

⏳ Wait For It:
{: .label .label-blue}

We'll look at an alternative to `new` in the next section.
{: .d-inline-block}

## Memory Leaks

Unlike with the stack, heap-allocated memory does not get automatically reclaimed when the associated variable goes out of scope. This can lead to what is called a memory leak.

```cpp
void printTheAnswerToLifeTheUniverseAndEverything() {
    int *answerPtr{ new int{ 42 } };
    std::cout << *answerPtr;
}
```

Each time the function is called, `sizeof(int)` bytes of memory is allocated on the heap but never freed because delete isn't used. The program will crash when the heap is exhausted.

```cpp
while (true) {
    // This function will crash once the heap is exhausted.
    printTheAnswerToLifeTheUniverseAndEverything();
}
```

🎵 Note:
{: .label .label-yellow}

This example is silly and contrived, but hopefully you get the _point_.
{: .d-inline-block}

## Returning Heap-Allocated Memory to the Operating System

To avoid memory leaks every use of `new` must eventually be paired with a `delete`.

Unlike what the name might imply, the `delete` keyword doesn't actually delete anything! It simply returns heap-allocated memory back to the operating system.

Here's our silly memory leak from above fixed with a `delete`:

```cpp
void printTheAnswerToLifeTheUniverseAndEverything() {
    int *answerPtr{ new int{ 42 } };
    std::cout << *answerPtr;
    delete answerPtr; // return an int's worth of memory to the heap.
}
```

⏳ Wait For It:
{: .label .label-blue}

In modern C++, smart pointers such as std::unique_ptr and std::shared_ptr handle dynamic memory for you. We'll explore them in the next section!
{: .d-inline-block}

## Dangling Pointers

Back in our [Pointer Basics module](/Programming-1-Notes/docs/11-pointers/01-pointer-basics.html) we learned that it's undefined in C++ what will happen if we try to access the memory of an uninitialized pointer. The same is true for deleted pointers. Attempting to access the memory of a deleted pointer is called use-after-free access or UAF for short. UAF can result in a crash, incorrect results, or unpredictable program behaviour.

```cpp
int *answerPtr{ new int{ 42 } };
delete answerPtr; // Release the pointed to memory back to the allocator/free-store.
std::cout << *answerPtr; // Undefined! Program could crash.
delete answerPtr; // Also Undefined! Double deletes can crash our programs.
```

⚡ Warning:
{: .label .label-red}

UAFs are one of the largest causes of high-severity security bugs in software.
{: .d-inline-block}

## Marking Dangling Pointers as Null

We can mark pointers as unused with the `nullptr` literal. 

```cpp
int *answerPtr{ new int{ 42 } };
delete answerPtr;
answerPtr = nullptr; // Best to mark as null, unless immediately going out of scope.
```

We can now guard against accessing deleted pointers:

```cpp
if (answerPtr) { // Any memory address will evaluate as true, nullptr evals as false.
    std::cout << *answerPtr;
    delete answerPtr;
    answerPtr = nullptr; // Mark as null!
}
```

While marking pointers as nullptr is a good practice, it’s still a manual process and prone to errors. Smart pointers, which we'll discuss later, automate this task and help avoid these mistakes.

💡 Best Practice:
{: .label .label-green }

Always guard pointer access and assign `nullptr` to deleted pointers.
{: .d-inline-block}

## Lifetimes & Dangling Pointers/References

Pointrts (and references!) are only valid while the variable they refers to is alive. When the variable's lifetime ends, any pointer/reference to it dangles. Using a dangling pointer/reference is undefined behaviour.

```cpp
int* badPtr() {
    int local{ 42 };   // Automatic storage. Destroyed when function returns.
    return &local;     // DANGER: Pointer dangles immediately!
}

const int& badRef() {
    int local{ 7 };    // Destroyed at return.
    return local;      // DANGER: Reference dangles immediately!
}
```

## Stack vs Heap: Quick Comparison

Here is a highly simplified comparison of stack vs heap memory use.

**Stack (automatic storage)**  
**Pros:** Very fast. Cleaned up automatically at scope exit. Cache-friendly.  
**Cons:** Limited size. Lifetime tied to scope. Can’t hold large runtime-sized arrays.

**Heap (dynamic storage)**  
**Pros:** Flexible lifetimes. Sizes decided at runtime. Good for shared/polymorphic objects.  
**Cons:** Slower allocations. Ownership bugs (leaks/dangling). Potential for poor locality leading to cache misses.

**Note:** Cache here refers to the very fast memory that sits between the CPU and RAM that holds recently used data. Caches transfer data in fixed-size chunks called cache lines (often 64 bytes), so reading one value typically brings along its neighbours too! Stack-allocated locals are laid out contiguously (neighbours tend to share a line), while heap allocations are often scattered, so pointer-chasing is more likely to miss the cache.

## Further Reading

- [Memory Safety and Use-After-Free Bugs in Chrome](https://security.googleblog.com/2022/05/retrofitting-temporal-memory-safety-on-c.html) @ Google Security Blog
