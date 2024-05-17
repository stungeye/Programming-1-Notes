---
title: Enumerations
parent: User Defined Types
nav_order: 1
---

<!-- prettier-ignore-start -->

# Enumerations 
{: .no_toc }

The most basic user-defined type is an *enumeration*. Enumerations allow us to create variables whose values are restricted to a set of options called *enumerators*.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Why Enumerations

Enumerations help us remove [magic numbers](<https://en.wikipedia.org/wiki/Magic_number_(programming)>) from our code.

They also help us avoid using old school `#define` constants, which don't follow scope and type rules.

In general they lead to more readable and more intention revealing code.

## Defining and Using Enums

Let's define an enumeration for the days of the week:

```cpp
enum class Day { mon, tue, wed, thu, fri, sat, sun };
```

We can now create a variable of type `Day` and assign it one of seven possible _enumerators_:

```
Day today = Day::sat;
```

💡 Best Practice:
{: .label .label-green }

Don't use ALL_CAPS when naming your `enum` options.
{: .d-inline-block }

## Printing Out Enums

Internally the enumerators are stored as auto-incrementing `int`s. These integers are meant for internal use only. We cannot `std::cout` an enum variable unless we use an explicit cast:

```cpp
enum class Direction { north, south, east, west };

Direction doorPosition = Direction::north;

std::cout << doorPosition; // Error!
std::cout << static_cast<int>(doorPosition);    // Outputs: 0
std::cout << static_cast<int>(Direction::west); // Outputs: 3
```

## C-Style Enums

Sometimes called "plain" enums, you might encounter these older style enums defined like this:

```cpp
  enum directions{ NORTH, SOUTH, EAST, WEST }; // Was convention to use ALL_CAPS.
  enum playerDirection = NORTH; // Notice the option isn't scoped to the enum!
```

Behind the scenes each of the enum choices is assigned an integer value starting at 0. Although those values can also be explicitly set:

```cpp
  enum directions{ NORTH = 5, SOUTH = 10, EAST = 15, WEST = 20 };
```

💡 Best Practice:
{: .label .label-green }

Avoid C-Style enums as they aren't well-scoped and can lead to naming collisions.
{: .d-inline-block }

## Further Reading

- [Enum Classes @ LearnCpp.com](https://www.learncpp.com/cpp-tutorial/enum-classes/)
- [Enumeration Guidance @ Cpp Core Guidelines](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#S-enum)
