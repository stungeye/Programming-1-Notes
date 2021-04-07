---
title: Operator Overloading
parent: User Defined Types
nav_order: 4
---

<!-- prettier-ignore-start -->

# Operator Overloading 
{: .no_toc }

TBW

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Operators as Functions

In C++ operators are implemented internally as functions. Let's take `+` operator used for addition:

```cpp
  int applesInBasket = 12;
  int applesFoundNearPortal = 50;
  int totalApples = applesInBasket + applesFoundNearPortal;
```

The addition in this code is internally handled by an `int operator+(int arg1, int arg2)` function:

```cpp
  int totalApples = operator+(applesInBasket, applesFoundNearPortal);
```

🎵 Note:
{: .label .label-yellow}

This isn't actually valid code, just an imagining of the C++ internals for integer addition.
{: .d-inline-block}

## Overloading Operators

[Ealier](/Programming-1-Notes/docs/05-introduction-to-cpp/08-function-basics.html#function-overloading) we saw that function could be redefined with new signatures to override their behaviour. Since operators are actually functions in C++, they too can be overloaded.

Some limitations of operator overloading:

- Certain operators cannot be overloaded, including ternary conditionals (`? :`), the scope resolution operator (`::`), the member selector (`.`), the member pointer selector (`.*`), and the `sizeof` operator.
- Only existing operators can be overloaded. You cannot create new syntax.
- One or more of the operands of the overloaded operator must be a user-defined type. You cannot redefine how operators work with the primitive data types.
- You cannot change the number of operands supported by an operator.
- Overloaded operators retain their order of execution precedence.

## Friend Functions

TBW.

## Classy Cash

Imagine for a moment a `Money` class that internally stores Canadian currency as integer dollars and integer cents.

Next imagine you'd like to do the following:

```cpp
 Money pocketChange{5, 98};
 Money foundInFountain{35, 37};
 Money totalMoney{pocketChange + foundInFountain}; // Add two Money objects together.
 totalMoney = totalMoney + 82; // Add 82 cents to an existing Money object.
```

A possible implementation:

<iframe height="800px" width="100%" src="https://replit.com/@stungeye/Operator-Overloading-Money?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Date Math

Think back to the `Date` class we defined in [the previous module](/Programming-1-Notes/docs/08-user-defined-types/03-classes.html). Here are some possible interesting overloads:

- `date1 - date2`: The `-` operator could return the number of days between two dates.
- `date1++` or `date1--`: The `++` and `--` operators could increment and decrements the day value of a date.
- `date1 + 5` or `date1 - 10`: The `+` and `-` operators could return new dates a certain number of days in the future or past.

Overloads need to make conceptual sense. The following overloads do not make sense in the domain of dates:

- `date1 + date2`
- `5 - date1`
- `100 * date1`

## Date Addition Overload

Below you'll find a definition of a `Date` class with two overloaded operators:

- An overloaded `-` to determine the number of days between two dates.
- An overloaded `+` to add additional days to a date.

The overloaded `-` operator must be marked as a `friend` method so that when implemented it will have access to the private member variables of the two `date` arguments.

The overloaded `+` operator can be a member function as there isn't need to access the private members of a second object.

Make note of the `dataInMonth` array and the `isLeapYear()` function that also need to be implemented to allow the overloaded operators to properly cross month boundaries.

```cpp
class Date {
  static const int daysInMonth[];
  int mYear;
  int mMonth;
  int mDay;

public:
  Date(int y, int m, int d);
  bool isLeapYear() const;
  void debugPrint() const;
  friend Date operator-(const Date& date1, const Date& date2);
  Date operator+(int additionalDays);
};
```

🎵 Note:
{: .label .label-yellow}

Overloaded operator functions only need to be marked as `friend` if the function requires access to the private members.
{: .d-inline-block}

## Overloading the OStream `<<` Operator

TBW

## Further Reading

TBW
