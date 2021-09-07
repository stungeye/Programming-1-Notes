---
title: Types, Variables, & Constants
parent: Introduction to C++
nav_order: 3
---

<!--prettier-ignore-start-->
# Types, Variables, and Constants 
{: .no_toc }

Variables are named placeholders for data stored in your computer's RAM (Random Access Memory). C++ is a _strictly typed_ programming language, meaning each piece of data in a C++ program has an associated data type. 

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Variables Identifiers

The names we give our variables in C++ are called _identifiers_.

- Identifiers are composed of letters, numbers, underscores, and most other Unicode characters.
- The first character of an identifier must **not** be a number.
- Identifiers are case-sensitive.

## Identifier Naming Conventions

Although the C and C++ standard libraries use `snake_case` as a naming convention, the openFrameworks community tends to use `camelCase` naming.

For this reason, we will use `camelCase` for our variable, constant, and function identifiers and `PascalCase` for our class names.

## Variable Definition and Assignment

Before we can use a variable it must first be defined with a data type and an identifier in a statement structured like this: `type identifier;`

```cpp
int userAge;
int grinsPerHour;
int numberOfApples;
```

An optional initial value can be provided using an `=`, parenthesis, or curly braces:

```cpp
int userAge = 24;        // Copy Initialization
int grinsPerMinute(43);  // Direct Initialization
int numberOfApples {6};  // List Initialization
```

💡 Best Practice:
{: .label .label-green }

Initialize your variables on definition and use list initialization whenever possible.
{: .d-inline-block }

## Variable Scope

Scope defines where in a program a variable is accessible.

In C++, variables are scoped to the `{}` blocks in which they are defined.

```cpp
int existingGemCount = 3;
int requestedGems = askUser('How many gems did you find?');

if (requestedGems > 0) { // block starts here
  int releasedGems = gemOracle(requestedGems); // releasedGems is only scoped to this block.
} // block ends here

existingGemCount += releasedGems // Error: "releasedGems" variable is out of scope.
```

☝️ Assumes that `askUser()` and `gemOracle()` have been defined elsewhere to return integers.

## Data Types

We cannot define a variable without first declaring its data type. C++ supports user-defined data types, but we will start by looking at the built-in _primitive data types_.

Data types in C++ fall into the following categories:

- Booleans -- `bool`
- Characters -- `char`
- Whole Numbers -- `short`, `int` and `long`
- Floating Point Numbers -- `float`, `double` and `long double`
- Void -- `void`

## Booleans

The name for the Boolean type in C++ is `bool`. Variables of type `bool` can hold one of two values:

- `true`
- `false`

Boolean variables are typically stored using 1 byte of RAM.

🎵 Note:
{: .label .label-yellow}

C++ stores variables in "byte-sized" chunks, so `bool` consumes 8 bits rather than 1.
{: .d-inline-block }

## Characters

Character data is stored using the `char` type.

A `char` stores a single [ASCII character](https://www.learncpp.com/cpp-tutorial/chars/) using 1 byte of RAM.

🎵 Note:
{: .label .label-yellow}

C++11 added the `char16_t` and `char32_t` data types for improved [Unicode](https://en.wikipedia.org/wiki/Unicode) characters.
{: .d-inline-block}

## Escape Sequences

There are certain special characters that can be used in C++ that are encoded using _escape sequences_. These sequences all begin with a backslash character. The most common of these special characters are:

- `\n` - New Line
- `\t` - Tab
- `\'` - Single Quote
- `\"` - Double Quote
- `\\` - Backslash

## Strings

Strings are not primitive types, but we'll treat them as such for now.

To use variables of type `std::string` you must `#include` the `<string>` header file.

```cpp
#include <string>

int main() {
  std::string simpsonsQuote = "It was the best of times, it was the blurst of times.";
  int amount = 12;
  std::string woodChuck = "The woodchuck chucked " + std::toString(amount) + " pieces of wood.";
}
```

⏳ Wait For It:
{: .label .label-blue}

We'll learn a lot more about strings [in the standard collection types module](/Programming-1-Notes/docs/06-collections/04-strings.html).
{: .d-inline-block}

## Whole Numbers

The most common data type for whole numbers in C++ is the `int`, which stands for integer.

Although the minimum size specified in the standard for an `int` is 16 bits (2 bytes), most modern architectures will use 32 bits (4 bytes) for each integer.

There are other types of data types for whole numbers. Each one supports a specific range of possible numbers:

- `short` -32,768 to +32,767 (2 bytes)
- `int` -2,147,483,648 to +2,147,483,647 (Typically 4 bytes.)
- `long` -2,147,483,648 to +2,147,483,647 (Same as `int` since both typically use 4 bytes.)
- `long long` -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807 (8 bytes)

⏳ Wait For It:
{: .label .label-blue}

Integers have undefined behaviour for values outside these ranges. See [Basic Math](/Programming-1-Notes/docs/05-introduction-to-cpp/05-basic-math.html#integer-overflow).
{: .d-inline-block}

## Unsigned Whole Numbers

It is possible to use the whole number types in the last section in as _unsigned numbers_.

Unsigned numbers can only store positive values, but the range of numbers is doubled.

- `unsigned short` 0 to 65,535
- `unsigned int` 0 to 4,294,967,295
- `unsigned long` 0 to 4,294,967,295
- `unsigned long long` 0 to 18,446,744,073,709,551,615

⚡ Warning:
{: .label .label-red}

Using unsigned numbers is not recommends. What's the unsigned answer to `8 - 10` ?
{: .d-inline-block}

## Integer Literals

We can use different prefixes to write integers in different numeral base systems:

```cpp
int d{990};  // Base 10 Decimal 990. No prefix.
int o{0520}; // Base 8 Octal 520. Prefixed with: 0
int h{0x2A}; // Base 16 Hex 2A. Prefixed with: 0x
int b{0b10}; // Base 2 Binary 10. Prefixed with: 0b
```

We can use the `l` and `ll` suffixes to denotes numbers that are `long` or `long long`. Big numbers can be made easier to read by using single quote characters in the thousands positions:

```cpp
long grainsOfSand{2'000'555'000l};
long long maxLongLong{9'223'372'036'854'775'807ll};
```

## Floating Point Numbers

We use floating point numbers to store values that include fractional components, or for numbers that are large than the maximum integer.

There are three floating point types in C++:

- `float` ±1.17 x 10⁻³⁸ to ±3.40 x 10³⁸ (4 bytes)
- `double` ±2.22 x 10⁻³⁰⁸ to ±1.79 x 10³⁰⁸ (8 bytes)
- `long double` ±2.22 x 10⁻³⁰⁸ to ±1.79 x 10³⁰⁸ (4 to 8 bytes)

⚡ Warning:
{: .label .label-red}

Depending on the architecture, `long double` may be equivalent to `double`.
{: .d-inline-block}

## Float Literals

C++ will automatically type a numeric literal as a double if it includes a decimal point. We can a `f` or a `l` suffix to write `float` or `long double` literals. In most cases the suffixes are not required, but they can help clarify your code.

```cpp
float energyLevel{0.2f};
double height{4.3}; // No suffix defaults to double.
long double funFactor{123456789l}; // Literal long double.
```

Really large floating point values can be defined using scientific notation.

```cpp
float avogadrosNumber{6.02214179e23f}; // Scientific notation:6.02214179 x 10²³
```

⏳ Wait For It:
{: .label .label-blue}

C++ floating point numbers are only approximations. See [Basic Math](/Programming-1-Notes/docs/05-introduction-to-cpp/05-basic-math.html#floating-point-rounding-errors).
{: .d-inline-block}

## Void

In C++ we use the type `void` to mean "no type". Variables cannot be defined with a type of `void`, only functions can.

```cpp
void logNumber(int number) {
// Function is void so we don't use a "return" statement.
}
```

⏳ Wait For It:
{: .label .label-blue}

When we learn about pointers we'll see that `void` has another use there.
{: .d-inline-block }

## Auto

The `auto` keyword allows us to define variables with their types inferred based on their initialization.

```cpp
char newline() {
  return '\n';
}

int main() {
  auto answer{42}; // Type int due to integer literal.
  auto temperature{12.23}; // Type double due to double literal.
  auto combo{answer + temperature}; // Type double due to expression.
  auto enter{newline()}; // Type char due to return type.
}
```

💡 Best Practice?
{: .label .label-green }

Some folks in the community follow the "AAA Style" meaning "Almost Always Auto".
{: .d-inline-block}

There's also the AAAA camp: Almost Always Avoid Auto 🤣 [Further Reading](https://h-deb.clg.qc.ca/Sujets/Divers--cplusplus/auto-when.html)

## Constants

You can make your code more error proof by marking variables that shouldn't be modified as constants with `const` and `constexpr`.

We use `constexpr` for things whose value is know at compile time:

```cpp
constexpr double pi{3.1415926};
pi = 3; // Error. Cannot redefine a constant.
```

We use `const` to mark variables as immutable even if their value isn't known at compile time;

```cpp
const double temperature{someTemperatureFunction()};
temperature = 1.2; // Error. Cannot redefine a constant.
```

💡 Best Practice:
{: .label .label-green }

An important best practice when writing C++ code is [const correctness](https://isocpp.org/wiki/faq/const-correctness).
{: .d-inline-block}

## Reference Variables

A reference is a type of variable that acts as an alias to another variable.

References are declared using an ampersand `&` after the name of the type:

```cpp
int theAnswer = 42;
int& referenceToTheAnswer{theAnswer};

std::cout << theAnswer << "\n"; // 42
std::cout << referenceToTheAnswer << "\n"; // 42

referenceToTheAnswer = 0; // Change the value of the referenced variable.
std::cout << theAnswer << "\n"; // 0
```

References can also be declared as `const` which prevents the referenced variable from being changed by way of the reference:

```cpp
int theAnswer = 42;
const int& immutableAnswer{theAnswer};

immutableAnswer = 0; // Compiler Error: Cannot assign to const-qualified reference.
```

⏳ Wait For It:
{: .label .label-blue}

References allow us to avoid the performance cost associated with copying data:
{: .d-inline-block}

- [Using references when passing arrays to functions](/Programming-1-Notes/docs/06-container-structures/02-arrays.html#passing-arrays-by-reference).
- [Using references when passing vectors to functions](/Programming-1-Notes/docs/06-container-structures/03-vectors.html#passing-vectors-to-functions).

## Type Conversion

In many cases, the C++ compiler will implicitly convert one primitive type to another in a process called _coercion_.

```cpp
  float myFloat{ 1.12f };
  double myDouble{ myFloat }; // The float value will be promoted to a double.
  functionWithOneArgumentOfTypeDouble(myFloat); // Again the float will be promoted.
```

Sometimes conversions like this can lead to the possible loss of data:

```cpp
  float myFloat{ 1.12f };
  int myInt{ myFloat }; // Error! Float cannot be narrowed to int.
```

If you are fine with the loss of data, you can force the issue with a `static_cast<>`:

```cpp
  float myFloat{ 1.12f };
  int myInt{ static_cast<int>myFloat }; // The float will be truncated to 1
```

## Sizes Can Be Different

As mentioned a few times above, the size and allowed range for certain types can be architecture or implementation dependent.

Try running this program in the embedded environment and then in Visual Studio on 64bit Windows 10:

<iframe height="650px" width="100%" src="https://repl.it/@stungeye/Size-of-Primitives?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Further Reading

- [Using `std::numeric_limits` to find the numeric limits of various types](https://en.cppreference.com/w/cpp/types/numeric_limits).
- [Initialization - Copy = vs Direct () vs List {}](https://www.learncpp.com/cpp-tutorial/variable-assignment-and-initialization/)
- [Data Types - Chapter 4 - learncpp.com](https://www.learncpp.com/cpp-tutorial/introduction-to-fundamental-data-types/)
- [C++ Style Best Practices](https://github.com/lefticus/cppbestpractices/blob/master/03-Style.md)
- [openFrameworks Community Conventions](https://github.com/openframeworks/openFrameworks/wiki/oF-Code-Style)
