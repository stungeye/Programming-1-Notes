---
title: Booleans and Decisions
parent: Introduction to C++
nav_order: 6
---

<!--prettier-ignore-start-->
# Booleans and Decisions
{: .no_toc }

Boolean expressions and flow control statements are how we instruct computers to make decisions.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Boolean Expressions

A boolean expression is a mathematical expression that results in either `true` or `false`.

Boolean expressions in C++ can contain the following operators (and more):

|      Symbol      |        Meaning        |
| :--------------: | :-------------------: |
|        ==        |         equal         |
|        !=        |       not equal       |
|        >         |     greater than      |
|        <         |       less than       |
|        >=        | greater than or equal |
|        <=        |  less than or equal   |
|        &&        |     Boolean 'and'     |
|        \|\|        |     Boolean 'or'      |

## Decision Statements

The `if` and `else` keywords allow us to control the flow of execution in our programs.

```cpp
int grinStrength = 45;

if (grinStrength > 30) {
  std::cout << "You defeat the evil wizard with a grin.\n";
} else if (grinStrength < 10) {
  std::cout << "Your grin fails you. The wizard steals your beard.\n";
} else {
  std::cout << "You are unsure how to proceed.\n";
}
```

💡 Best Practice:
{: .label .label-green }

Always use braces with `if`/`else`, even if your blocks only include one statement each.
{: .d-inline-block }

## Non-Boolean Conditionals

You will sometimes see numeric values used in place of booleans in legacy C++ code.

Non-zero values evaluate as true. Zero evaluates as false.

```cpp
int applesFound = 0;
if (!applesFound) {
  std::cout << "We have no apples.\n";
}
```

## Mistaking Assignment for Equals

⚡ Warning:
{: .label .label-red}

Careful not to put one equals (assignment) where you mean two (equality test).
{: .d-inline-block}

For example, you mean to test if `applesFound` is equal to `2`, but instead, you accidentally assign `applesFound` a value of `2`:

```cpp
  if (applesFound = 2) {  // Always: true
    std::cout << applesFound; // Always prints: 2
  }
```

## Init-Statements and Conditionals

As of C++17, you can put a variable declaration/initialization inside the `if` statement parenthesis. It must be separated from the boolean by a semicolon.

```cpp
int value = computeValue();
if (value == 42) { /* do something */ }

// Can be re-written as:
if (int value = computeValue(); value == 42) { /* do something */ }
```

⚡ Warning:
{: .label .label-red }

The `value` variable in the re-written example won't be available after the `if`.
{: .d-inline-block }

## Short Circuit Evaluation

When evaluating `&&` and `||` C++ programs will sometimes optimize away the second operand:

```cpp
// Anything ANDed with false is false.
// No need to call functionTwo if functionOne returns false.
if (functionOne() && functionTwo()) { /* ... */ }

// Anything ORed with true is true.
// No need to call functionTwo if functionOne returns true.
if (functionOne() || functionTwo()) { /* ... */ }
```

## Ternary Operator

The ternary operator, sometimes called a conditional or question mark operator, allows you to replace `if`/`else` statements that guard assignments with a single statement.

Ternary assignments are structured like this:

```
type variable = boolean ? value1 : value2;
```

☝️ The `variable` will be assigned `value1` if `boolean` is true, otherwise it will be assigned `value2`.

A more detailed example:

```cpp
int rubiesInPocket{ 0 };
char isBirthday;
std::cout << "Is today your birthday (y/n): ";
std::cin >> isBirthday;
// Assignment using if/else:
if (isBirthday == 'y') {
    rubiesInPocket = 50;
} else {
    rubiesInPocket = 5;
}
// Using a ternary statement instead:
rubiesInPocket = isBirthday == 'y' ? 50 : 5;
```

🎵 Note:
{: .label .label-yellow}

We aren't validating the user input here, so any value entered other than `y` means no.
{: .d-inline-block }

## Switch Statements

We can replace `if`/`else if` chains with `switch` statements.

Consider this code:

```cpp
if (applesFound == 1) {
  std::cout << "One apple was found!\n";
} else if (applesFound == 2) {
  std::cout << "Two apples recovered!\n";
} else {
  std::cout << applesFound << " apples were present!\n";
}
```

Rewritten with a `switch` statement:

<iframe height="800px" width="100%" src="https://repl.it/@stungeye/Switch-Statement?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Switch Statement Breaks

Without a `break` statement, cases will "fall through" and continue executing later cases.

<iframe height="950px" width="100%" src="https://repl.it/@stungeye/Switch-Statement-Break?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Init-Statements and Switch

Like `if` statements, a `switch` statement can be paired with a scoped variable declaration/initialization.

```cpp
switch(int applesFound = countApples(); applesFound) {
  /* Case Statements Go Here */
}
```

## Further Reading

- [If Statement @ cppreference.com](https://en.cppreference.com/w/cpp/language/if)
- [Switch Statement Basics @ learpcpp.com](https://www.learncpp.com/cpp-tutorial/switch-statement-basics/)
