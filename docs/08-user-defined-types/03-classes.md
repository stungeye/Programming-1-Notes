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

The only difference between a `struct` and a `class` is the default for member visibility:

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
  int year;
  int month;
  int day;
};
```

⚡ Warning:
{: .label .label-red}

Don't forget the semicolon after the close curly brace.
{: .d-inline-block}

## Initializing Class Members

Because the member variables are private we cannot (yet) use an initializer list to create an object of type `Date`:

```cpp
Date birthday{1977, 9, 27}; // Error! No matching constructor.
```

We can, however, give the members default values:

```cpp
class Date {
  int year{1};
  int month{1};
  int day{1};
};

// Later in the program:
Date birthday{}; // Ok: Internally day, month, year all set to 1.
```

🎵 Note:
{: .label .label-yellow}

Classes without constructors are provided zero-argument default constructors.
{: .d-inline-block}

## Constructors

In order to initialize private member variables when constructing an object we need one (or more) special functions called _constructors_.

Constructors are named after the class and have no return type:

```cpp
class Date {
  int year{1};
  int month{1};
  int day{1};

public:
  Date(int y, int m, int d)
  {
    year = y;
    month = m;
    day = d;
  }
```

🎵 Note:
{: .label .label-yellow}

Class members are private by default. We use `public:` to allow access to the constructor.
{: .d-inline-block}

## Member Initializers

A more modern way to define the constructor would be to use member initializers to initialize our three member variables.

```cpp
class Date {
  int year;
  int month;
  int day;

public:
  Date(int y, int m, int d)
      : year{y}, month{m}, day{d} // member initializers.
  {
    // Constructor body empty as member initializers did all the work.
  }
};

// Later in the program:
Date birthday{1977, 9, 27}; // Works now!
```

## Default Constructors

With our new constructor in place our class will no longer have an implicit default constructor:

```cpp
Date birthday{}; // Error! No matching constructor.
```

This can be fixed by requesting a default constructor:

```cpp
class Date {
  int year;
  int month;
  int day;

public:
  Date(int y, int m, int d)
      : year{y}, month{m}, day{d}
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
  int year;
  int month;
  int day;

public:
  Date(int y, int m, int d) // Three argument constructor.
      : year{y}, month{m}, day{d}
  { }

  Date(int y) // Year only, one argument constructor.
      : year{y}
  { }

  Date() = default;
};

// Later in the program:
Date specificDate{}
Date JanFirstInTheFuture{3000}; // Internally: year = 3000, month = 1, day = 1
```

## Defining Member Functions

We can add other functions to the class that use the private member variables.

Here's the `Date` class again, but simplified to have only one constructor. A `public` debugging function has been added:

```cpp
class Date {
  int year;
  int month;
  int day;

public:
  Date(int y, int m, int d)
      : year{y}, month{m}, day{d}
  { }

  void debugPrint() {
    std::cout << "Y:" << year << " M:" << month << " D:" << day << "\n";
  }
};

// Later in the program:
 Date birthday{1977, 9, 27};
 birthday.debugPrint(); // Outputs: Y:1977 M:9 D:27
```

## Fetching and Modifying Class Members

If you need to break [encapsulation](https://www.learncpp.com/cpp-tutorial/access-functions-and-encapsulation/) and provide getters and setters for private members variables, it's common to prefix the member names with a lowercase `m` or `m_`:

```cpp
class Date {
  int mYear;
  int mMonth;
  int mDay;

public:
  Date(int y, int m, int d)
    : mYear{y}, mMonth{m}, mDay{d}
  {  }

  int year() { // Trivial Getter
    return mYear;
  }

  void year(int y) { // Trivial Setter
    mYear = y;
  }

  void debugPrint() {
    std::cout << "Y:" << year << " M:" << month << " D:" << day << "\n";
  }
};

// Later in the code:
 Date birthday{1, 9, 1977};
 std::cout << birthday.year() << "\n"; // Outputs: 1
 birthday.year(1977);
 birthday.debugPrint(); // Outputs: Y:1977 M:9 D:27
```

💡 Best Practice:
{: .label .label-green }

The C++ Code Guidelines [warn against "trivial getters and setters"](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c131-avoid-trivial-getters-and-setters).
{: .d-inline-block}

## Public vs Private vs Protected Access

We've seen how the `public:` access specifier can make member functions accessible from outside the class. There are actually three access specifiers we can use:

- `public:` - Members are accessible from outside the class.
- `private:` - Members cannot be accessed from outside the class. (Default)
- `protected:` - Members cannot be accessed from the outside, but can be accessed in inherited classes.

## Destructors

Class destructors are called when an object is destroyed. This usually happens when a variable goes out of scope. Destructors are named after the class with a tilde `~` prefix. They take no arguments and have no return type.

Here's a class with a constructor and destructor that announce their own execution:

<iframe height="600px" width="100%" src="https://replit.com/@stungeye/Constructors-and-Destructors?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## RAII - Resource Acquisition is Initialization

Constructors and destructors allow for the popular resource management technique [RAII](https://en.cppreference.com/w/cpp/language/raii), where the life-cycles of resources (like memory, network sockets, open files, etc) are bound to the lifetime of specific objects.

Said another way, with RAII resources are obtained within class constructors and released in class destructors. This way, resource cleanup is automatically handed when objects go out of scope.

A better name for this technique is Scope-Bound Resource Management (SBRM), but RAII is the term everyone seems to use.

![RAII Cartoon Source: https://medium.com/swlh/what-is-raii-e016d00269f9](RAII.jpeg)

## Static Members Variables and Functions

Members and functions can be made to belong to the class (rather to an instance of the class) using the `static` keyword.

## Header Class Definition and CPP Class Implementations

## Basic Inheritance

## This Pointer
