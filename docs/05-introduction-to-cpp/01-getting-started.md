---
title: Getting Started
parent: Introduction to C++
nav_order: 1
---

<!--prettier-ignore-start-->
# Getting Started
{: .no_toc }

There are some basic things you need to know to start coding C++ applications. These foundational topics include C++ expressions and statements, comments in C++ source code, and the difference between `.cpp` and `.h` files.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Expressions and Statements

The building blocks of C++ applications are the commands we give the computer in our code. We call these commands _statements_. The body of any function is a sequence of statements.

One type of statement is an _expression_ statement. Expressions are the parts of our code the computer can simplify to a final value with a data type.

## Expressions

The most basic expressions are literal values like `10` or `4.2` or `"Wally"`.

Literals combined with operators also make expressions. `10 * 2` and `true || false` are expressions that _evaluate_ to `20` and `true` respectively.

Variables can be used in expressions too, like `length` or `length * width` or `width + length + 22`. Variables must be defined before use.

Assignments and function calls are also considered to be expressions: `int area = length * width` or `someFunction(5)` or even `someFunction(length * width)`.

## Statements

Expression statements are just one type of statement. There are also:

- Compound Statements - Collection of statements grouped by curly braces `{}`. Often called _blocks_.
- Selection Statements - Flow control like `if/else` and `switch`. Also called decision statements.
- Iteration Statements - Repetition control for blocks of statements like `while` or `for`.
- Jump Statements - Unconditional changes to a program's execution flow like `return` or `break`.
- Declaration Statements - Define variables, functions, namespaces, templates, and more.
- Try Blocks - Error-handling mechanism for catching exceptional circumstances.

## Of Semicolons and Mustache Braces

Some types of expressions must be terminated by a semi-colon to be considered valid:

- Expression Statements. Example: `helloWorld("Wally");`
- Jump Statements. Example: `return 0;`
- Declaration Statements. Example: `int answer = 32;`

Other statements are best made using curly braces:

- Compound Statements
- Selection Statements
- Try Blocks

Here's an example of a selection statement using curly braces:

```cpp
    if (answer == 42) {
        helloWorld("Wally");
        return;
    } // No trailing semicolon after the close brace.
```

## Comments

C++ uses C-style single-line and multi-line comments:

```cpp
// Single line comments start with two forward slashes.
helloWorld("Daisy"); // Comments can be placed on the same line as source code.
/*
    Multi-line comments start with a forward-slash followed by an asterisk,
    and continue until they are terminated by an asterisk followed by a forward-slash.
*/
/* Multiline syntax can also be used on a single line. */
```

Comments are replaced by blank space during the compilation process.

## Files Types

We use two types of files when writing a C++ application:

1. Header Files - Home to function and class definitions. Saved with a `.h` or a `.hpp` file extension.
2. C++ Source Files - Home to function and class implementations. Saved with a `.cpp` file extension.

Those descriptions are a bit of an over-simplification. We'll explore the nuances in coming sections.

## Further Reading

- [Expressions in Details @ cppreference.com](https://en.cppreference.com/w/cpp/language/expressions)
- [Statements in Detail @ cppreference.com](https://en.cppreference.com/w/cpp/language/statements)
