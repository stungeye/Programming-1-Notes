---
title: Basic Math
parent: Introduction to C++
nav_order: 5
---

<!--prettier-ignore-start-->
# Basic Math
{: .no_toc }

This section is a run-through of the basic math operators available in C++.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Available Math Operators

Like most programming languages, C++ uses the following symbols for the basic math operations:

- Addition: `+`
- Subtractions: `-`
- Multiplication: `*`
- Division: `\`
- Remainder (Modulus): `%`
- Grouping Parenthesis: `()`

⚡ Warning:
{: .label .label-red}

Most math operations are safe, but dividing by zero will crash a C++ program.
{: .d-inline-block}

## Order of Operations

PFMMDAS order of operations rules are applied:

- P: **P**arenthesis First
- F: **F**unction Calls Next
- MMD: **M**odulus, **M**ultiplication, **D**ivision (From Left to Right)
- AS: **A**ddition and **S**ubstraction (From Left to Right)

🎵 Note:
{: .label .label-yellow}

This is a much simplified version of the precedence rules. [See the complete table here](https://en.cppreference.com/w/cpp/language/operator_precedence).
{: .d-inline-block }

## Modulus

The modulus operator `%` calculates the remainder of a division.

The expression `a % b` means: What remains after taking away all groups of `b` from `a`.

So, for example, `15 % 4` has a modulus of 3, because 4 goes into 15 three times with 2 remaining.

Modulus is commonly used to determine if a number is even or odd:

```cpp
#include <iostream>

int main() {
  int number;
  std::cout << "Please enter a whole number: ";
  std::cin >> number;
  
  std::cout << "The number " << number << " is ";
  if (number % 2 == 0) {
    std::cout << "even.\n";
  } else {
    std::cout << "odd.\n";
  }
}
```

## Exponents

Exponents are used to multiply a number with itself any number of times.

C++ does not have an exponent operator, instead we use the `std::pow()` function from the `<cmath>` header.

For example, `2 * 2 * 2 * 2` could be written `std::pow(2, 4)`.

Remember that with floating point numbers we also have a special syntax that represents powers of ten:

We can write `3 * std::pow(10, 23)` as `3e23` using scientific notation.

⚡ Warning:
{: .label .label-red}

It's very easy to cause an [integer overflow](/Programming-1-Notes/docs/05-introduction-to-cpp/05-basic-math.html#integer-overflow) when using `std::pow`.
{: .d-inline-block }

## Common Mathematical Functions

The `<cmath>` library provides ways to:

- Compute square root or cubic root: `std::sqrt()` and `std::cbrt`
- Round up, down, and trucate: `std::ceil()` and `std::floor()` and `std::truncate()`
- Compute Trigonometric Functions: `std::cos` and `std::sin` and others.
- Computer Exponentials and Logs: `std:exp` and `std:log` and others.

[See `cmath` at cplusplus.com for all available functions](http://www.cplusplus.com/reference/cmath/).

## Modify-and-Assign Operators

We can pair the equals operator with other math operators to modify and assign the result back to a variable.

```cpp
int dreams{ 4 };
dreams += 3; // Same as: dreams = dreams + 3
dreams -= 1; // Same as: dreams = dreams - 1
dreams /= 2; // Same as: dreams = dreams / 2
dreams *= 5; // Same as: dreams = dreams * 5
dreams %= 2; // Same as: dreams = dreams % 2
```

## Unary Increment and Decrement

Like other C-influenced languages we have increment (`++`) and decrement (`--`) operators.

```cpp
let milesFromHome{ 14333 }; // Miles away from everything you hold dear.
milesFromHome++; // Up to 14334. Sames as: milesFromHome += 1
milesFromHome--; // Back to 14333. Same as: milesFromHome -= 1
milesFromHome--; // Down to 14332

++milesFromHome; // Prefix increment and decrements work too.
```

These unary operators have a very high precedence with respect to the other mathematical operators. [See the full operator precedence table](https://en.cppreference.com/w/cpp/language/operator_precedence).

## Floating Point Rounding Errors

Not all numbers can be stored precisely in a fixed number of binary digits.

Take the result of `1/3` for example:

- Decimal result: `0.33333333...` _(The threes continue infinitely.)_
- When stored as binary: `0.01010101...` _(The pattern continue infinitely.)_

Or even the result of `1/10`:

- In decimal we can be precise: `0.1`
- But when stored in binary: `0.000110011..` _(Infinite digits still required.)_

⚡ Warning:
{: .label .label-red}

C++ floating point numbers should always be considered approximations.
{: .d-inline-block}

## Floating Point Equality

The approximations in floating point math make some code error prone:

```cpp
#include <iostream>
#include <iomanip> // For std::setprecision()

int main() {
  // Floating point comparisons are hard:
  if (0.1 + 0.2 == 0.3) {
    std::cout << "This will never print!\n";
  }

  // Increasing the display precision to see why:
  std::cout << std::setprecision(17) << 0.1 + 0.2 << "\n";

  // For this reason, looping with floats is bug-prone:
  for(double value = -1.0; value <= 1.0; value += 0.2) {
    std::cout << value << std::endl;

    if (value == 0) {
      std::cout << "This will also never print!\n";
    }
  }
}
```

## Integer Overflow

Integer math can be problematic too. C++ will not stop you from accidentally assigning an out-of-range a value for a particular type.

```cpp
short secondsInDay{ 60 * 60 * 24 }; // 86,400 is larger than the maximum short!
```

You also need to watch for variables that could increment or decrement past range limits:

```cpp
#include <iostream>

int main() {
  short overflowShort = 32767; // Maximum short.
  unsigned int overflowInt= 0; // Minimum unsigned int.
  
  std::cout << "Before Overflow:\n";
  std::cout << overflowShort << "\n"; // 32767
  std::cout << overflowInt << "\n";   // 0

  overflowShort++; // One greater than max short.
  overflowInt--;   // One less than min unsigned int.

  std::cout << "After Overflow:\n";
  std::cout << overflowShort << "\n"; // -32768
  std::cout << overflowInt << "\n";   // 4294967295
}
```

⚡ Warning:
{: .label .label-red}

Watch out for integer overflow as it results in undefined behavior.
{: .d-inline-block}

## Further Reading

- [Floating Point Numbers @ learncpp.com](https://www.learncpp.com/cpp-tutorial/floating-point-numbers/)
- [Tempted to build your own `isAlmostEqual()` function for comparing floats](https://www.learncpp.com/cpp-tutorial/relational-operators-and-floating-point-comparisons/)?
- [0.30000000000000004.com](https://0.30000000000000004.com) - Float approximations as seen in many languages.
- [What Every Computer Scientist Should Know About Floating-Point Arithmetic](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)
- [Binary Fractions @ Wikipedia](https://en.wikipedia.org/wiki/Binary_number#Fractions)
