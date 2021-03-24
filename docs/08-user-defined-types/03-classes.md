---
title: Classes
parent: User Defined Types
nav_order: 1
---

<!-- prettier-ignore-start -->

# Classes
{: .no_toc }

Objects in C++ are data structures with state and member functions. We can think of a `class` as a blueprint to define the structure and behaviour of an instantiated object.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Difference From Structs

Let's start by reiterating what was said at the end of the `struct` section:

The only different between a `struct` and a `class` are the member visibility defaults:

- `struct` members are public by default.
- `class` members are private by default.

💡 Best Practice:
{: .label .label-green }

Use `struct` for data-only structures and `class` for objects with data and behaviours.
{: .d-inline-block}

## Defining a Class

Let's start to define a class to represent a calendar date:

```cpp
class Date {
  int day;
  int month;
  int year;
};
```

⚡ Warning:
{: .label .label-red}

Don't forget the semicolon after the close curly brace.
{: .d-inline-block}

## Initializing Class Members

Because the member variables are private we cannot (yet) use an initializer list to create an object of type `Date`:

```cpp
Date birthday{27, 9, 1979}; // Error! No matching constructor.
```

We can, however, give the members default values:

```cpp
class Date {
  int day{1};
  int month{1};
  int year{1};
};

// Later in the program:
Date birthday{}; // Ok: Internally day, month, year all set to 1.
```

## Constructors

In order to initialize private member variables when constructing an object we need one (or more) special functions called _constructors_.

Constructors are named after the class and have no return type:

```cpp
class Date {
  int day{1};
  int month{1};
  int year{1};

public:
  Date(int d, int m, int y)
  {
    day = d;
    month = m;
    year = y;
  }
```

🎵 Note:
{: .label .label-yellow}

Classes without constructors are provided zero-argument default constructors.
{: .d-inline-block}

## Member Initializers

A more modern way to define the constructor would be to make sense of member initializers to initialize our three member variables.

```cpp
class Date {
  int day;
  int month;
  int year;

public:
  Date(int d, int m, int y)
      : day{d}, month{m}, year{y} // member initializers.
  {
    // Constructor body empty as member initializers did all the work.
  }
};

// Later in the program:
Date birthday{27, 9, 1979}; // Works now!
```

## Default Constructors

With our new constructor in place our class will no longer have an implicit default constructor:

```cpp
Date birthday{}; // Error! No matching constructor.
```

This can be fixed by requesting a default constructor:

```cpp
class Date {
  int day;
  int month;
  int year;

public:
  Date(int d, int m, int y)
      : day{d}, month{m}, year{y}
  { }

  Date() = default;
};

// Later in the program:
Date birthday{}; // Works again!
```

## Overloaded Constructors

[Just like other functions](/Programming-1-Notes/docs/05-introduction-to-cpp/08-function-basics.html#function-overloading), contructors can be overloaded:

```cpp
class Date {
  int day;
  int month;
  int year;

public:
  Date(int d, int m, int y)
      : day{d}, month{m}, year{y}
  { }

  Date(int y)
      : year{y}
  { }

  Date() = default;
};

// Later in the program:
Date JanFirstInTheFuture{3000}; // Internally: day = 1, month = 1, year = 3000
```

## Defining Member Functions

Beyond constructors we can add other functions to the class that make use of the private member variables.

Here's the `Date` class again, but simplified to have only one constructor. A debugging function has been added:

```cpp
class Date {
  int day;
  int month;
  int year;

public:
  Date(int d, int m, int y)
      : day{d}, month{m}, year{y}
  { }

  void debugPrint() {
    std::cout << "D:" << day << " M:" << month << " Y:" << year << "\n";
  }
};

// Later in the program:
 Date birthday{27, 9, 1977};
 birthday.debugPrint(); // Outputs: D:27 M:9 Y:1977
```

## Fetching and Modifying Class Members

If you need to break [encapsulation]() and provide getters and setters for private members variables, it's common to prefix the member names with a lowercase `m` or `m_`:

```cpp
class Date {
  int mDay{1};
  int mMonth{1};
  int mYear{1};

public:
  Date(int d, int m, int y)
    : mDay{d}, mMonth{m}, mYear{y}
  {  }

  int year() {
    return mYear;
  }

  void year(int y) {
    mYear = y;
  }

  void debugPrint() {
    std::cout << "D:" << mDay << " M:" << mMonth << " Y:" << mYear << "\n";
  }
};

// Later in the code
 Date birthday{27, 9, 1};
 std::cout << birthday.year() << "\n"; // Outputs: 1
 birthday.year(1977);
 birthday.debugPrint(); // Outputs: D:27 M:9 Y:1979
```

💡 Best Practice:
{: .label .label-green }

The C++ Code Guidelines [warn against "trivial getters and setters"](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c131-avoid-trivial-getters-and-setters).
{: .d-inline-block}

## Public vs Private Access

## Defining and Using Member Types

## Constructors

Delegating Constructors

## Destructors

## This Pointer?

## Header Class Definition and CPP Class Implementations

## Static Members Variables and Functions

## Basic Exceptions TryCatch for Object Errors

## Later

```

```

```

```
