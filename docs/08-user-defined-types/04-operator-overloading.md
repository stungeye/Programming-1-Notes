---
title: Operator Overloading
parent: User Defined Types
nav_order: 4
---

<!-- prettier-ignore-start -->

# Operator Overloading 
{: .no_toc }

C++ includes a powerful system for overloading existing operators to support custom behaviour for user defined types.

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

Before we dive into overloading let's quickly look at a new concept: Friend Functions

A friend function is a function that is granted access to the private members of a class. Functions are declared friends of a class by listing the function signature within the class along with the `friend` keyword.

Functions can be friends to multiple classes and you can even define an entire class as a friend.

A toy example:

```cpp
class Value {
private:
    int mValue;
public:
    Value(int value)
      : mValue{value}
    { }

    // isEqual() is a friend of this class.
    friend bool isEqual(const Value &value1, const Value &value2);
};

// The implementation of isEqual could also go inside of the Value class.
bool isEqual(const Value &value1, const Value &value2) {
    // Accessing the private members of both parameters.
    return value1.mValue == value2.mValue;
}
```

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

## Overloading I/O Operators - Output Stream

Make note of the second third overloaded operator in the previous example. By overloading the `<<` operator and returning a reference an `std::ostream` parameter we can easily use `Money` objects within `std::cout` chains:

```cpp
friend std::ostream& operator<<(std::ostream &out, const Money& money) {
  std::string padding{money.mCents < 10 ? "0" : ""};
  out << "$" << money.mDollars << "." << padding << money.mCents;
  return out;
}

// Later in the program:
Money pocketChange{5, 98};
std::cout << "I've got " << pocketChange << " in my pocket.\n";
```

## Overloading I/O Operators - Input Stream

The above example also includes an overloaded `>>` to allow an `istream` to be parsed to a the custom `Money` type.

```cpp
friend std::istream& operator>>(std::istream &in, Money& money) {
  int dollars, cents;
  char dollarSign, dot;

  // Parses input in the form: $m.n (where m and n are integers)
  in >> dollarSign >> dollars >> dot >> cents;

  if ((dollarSign != '$') || (dot != '.')) {
    in.clear(std::ios_base::failbit); // Mark input as failed.
  } else {
    money = Money{dollars, cents};
  }

  return in;
}
```

Which is then used like this:

```cpp
Money userInput; // Requires a non-arg constructor.

do {
  std::cout << "Enter monetary amount using the format $#.##: ";

  if (std::cin >> userInput) { // Use the istream overload.
    break; // Successful read of Money value.
  }

  // No number found so clear the cin error flag:
  std::cin.clear();
  // Ignore remaining user input to reset stream for the next try.
  std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
} while (true);
```

⏳ Wait For It:
{: .label .label-blue}

We'll learn more about i/o stream operator overloading in a later module.
{: .d-inline-block}

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

## Further Reading

- [Friend Functions and Classes @ learncpp.com](https://www.learncpp.com/cpp-tutorial/friend-functions-and-classes/)
- [Friend FAQ @ isocpp.org](https://isocpp.org/wiki/faq/friends)
- [The `friend` Keyword @ docs.microsoft.com](https://docs.microsoft.com/en-us/cpp/cpp/friend-cpp?view=msvc-160)
