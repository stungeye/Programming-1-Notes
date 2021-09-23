---
title: Loops
parent: Introduction to C++
nav_order: 7
---

<!--prettier-ignore-start-->
# Loops
{: .no_toc }

Loops allow us to automate repetition. In this section we'll review `while`, `do while`, and `for` loops.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## While and Do While Statements

C++ contains standard `while` and `do while` loops. They work as you might expect:

```cpp
while (booleanCondition) {
  // Loop body will execute over and over while booleanCondition remains true.
}

do {
  // Loop body executes at least once, and then repeatedly while booleanCondition remains true.
} while (booleanCondition);
```

## Data Validation

An intentionally infinite `do while` loop can be helpful when validating user input:

<iframe height="860px" width="100%" src="https://repl.it/@stungeye/TEster?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## For Statements

Standard C-style for loops are also available. These loops are best used for counting tasks:

```cpp
for (int apples{10}; apples <= 20; apples++) {
  std::cout << apples << ": How do you like them apples?\n";
}
```

💡 Best Practice:
{: .label .label-green }

Always use braces, even though they are optional for single statement loops.
{: .d-inline-block}

## Multi-Counter For Loops

There's nothing stopping you from using multiple counters in your `for` loops:

```cpp
for (int x{0}, y{9}; x < 10; ++x, --y) {
    std::cout << x << ' ' << y << '\n';
}
```

🎵 Note:
{: .label .label-yellow}

The two update expressions are separated by a comma.
{: .d-inline-block}

## Auto With For

It's common to see the `auto` keyword used with loop variable initialization:

```cpp
for (auto apples{10}; apples <= 20; apples++) {
  std::cout << apples << ": How to you like them apples?\n";
}
```

## Nested Loops

Loops can go inside of loops inside of other loops.

<iframe height="650px" width="100%" src="https://repl.it/@stungeye/Nested-Loops?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

⚡ Warning:
{: .label .label-red}

"Expensive" operations inside of nested loops can lead to performance issues.
{: .d-inline-block}

## Loops for Arrays and Objects

⏳ Wait For It:
{: .label .label-blue}

There are special loops for traversing collections. See the ["ranged-base for" notes in the vector module](/Programming-1-Notes/docs/06-collections/03-vectors.html#looping-over-vectors).
{: .d-inline-block }

## Further Reading
