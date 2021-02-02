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

<iframe height="680px" width="100%" src="https://repl.it/@stungeye/Basic-Math-Modulus?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Exponents

Exponents are used to multiply a number with itself any number of times.

C++ does not have an exponent operator, instead we use the `std::pow()` function from the `<cmath>` header.

For example, `2 * 2 * 2 * 2` could be written `std::pow(2, 4)`.

Remember that with floating point numbers we also have a special syntax that represents powers of ten:

We can write `3 * std::pow(10, 23)` as `3e23` using scientific notation.

⚡ Warning:
{: .label .label-red}

It's very easy to cause an overflow when using `std::pow` with `int`s.
{: .d-inline-block }

## Negative Exponents

Negative exponents are used to perform the reciprocal of an exponent.

By this I mean that `std::pow(a, -b)` is another way of writing `1 / pow(a, b)`.

For example, `std::pow(2, -4)` is a short-form for `1 / (2 * 2 * 2 * 2)`.

## Common Mathematical Functions

The `<cmath>` header and other build in libraries provide ways to:

- Compute square root or cubic root: `std::sqrt()` and `std::cbrt`
- Round up, down, and trucate: `std::ceil()` and `std::floor()` and `std::truncate()`
- Compute Trigonometric Functions: `std::cos` and `std::sin` and others.
- Computer Exponentials and Logs: `std:exp` and `std:log` and others.

[See `cmath` at cplusplus.com for all available functions](http://www.cplusplus.com/reference/cmath/).

## Modify-and-Assign Operators

We can pair the equals operator with other math operators to modify and assign the result back to a variable.

```cpp
int dreams = 4;
dreams += 3; // Same as: dreams = dreams + 3
dreams -= 1; // Same as: dreams = dreams - 1
dreams /= 2; // Same as: dreams = dreams / 2
dreams *= 5; // Same as: dreams = dreams * 5
dreams %= 2; // Same as: dreams = dreams % 2
```

## Unary Increment and Decrement

Like other C-influenced languages we have increment (`++`) and decrement (`--`) operators:

```cpp
let milesFromHome = 14333; // Miles away from everything you hold dear.
milesFromHome++; // Up to 14334. Sames as: milesFromHome += 1
milesFromHome--; // Back to 14333. Same as: milesFromHome -= 1
milesFromHome--; // Down to 14332
++milesFromHome; // Prefix increment and decrements work too.
```

These unary operators have a very high precedence with respect to the other mathematical operators. [See the full operator precedence table](https://en.cppreference.com/w/cpp/language/operator_precedence).

## Floating Point Rounding Errors

## Floating Point Equality

## Further Reading
