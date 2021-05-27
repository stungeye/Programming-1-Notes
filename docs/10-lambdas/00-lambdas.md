---
title: Lambdas
nav_order: 10
---

<!-- prettier-ignore-start -->

# Lambdas
{: .no_toc }

C++ lambda expressions are what we call anonymous functions or closures in other languages. They are most useful in cases where you need to pass a single-use function as an argument to another function.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Objectives

Upon completion of this module, you should be able to:

- Describe why lambdas were a useful addition to the C++ language.
- Define lambda functions that make use of:
  - Function Parameters
  - Capture Clauses
- Define lambdas that capture by value, reference, default, and mixed captures.
- Use lambdas as inline function argument.
- Save lambdas to variables for later use.
- Make use of lambdas with some of the standard `<algorithm>` functions.

## Passing Functions as Parameters

It is sometimes handy to pass a function as an argument to another function. Take the `std::count_if()` function, which takes as arguments the begin and end iterator of a collection and a boolean predicate function. `std::count_if()` then returns the number of elements that return `true` when passed to the predicate function.

In this example we're counting how many strings in a vector have 8 or more characters:

<iframe height="730px" width="100%" src="https://repl.it/@stungeye/Callback-Functions-with-stdfindif?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

⏳ Wait For It:
{: .label .label-blue}

We'll learn more about functions as parameters in the [Pointer Basics module](/Programming-1-Notes/docs/12-pointer-basics/00-pointer-basics.html).
{: .d-inline-block}

## Lambda Expressions

Lambda expressions were added to C++ in C++11 as a way to define a single-use nameless functions.

Here's our example from above with the `wordIsLong()` function replaced by an inline lambda:

```cpp
const std::vector<std::string> words{"long", "selection", "longest", "consciousness"};
const auto longWordCount = std::count_if(words.begin(), words.end(), [](const std::string word) {
  return word.length() >= 8;
});
std::cout << "There are " << longWordCount << " long words.\n";
```

## Defining Lambdas

The syntax for defining a lambda is:

```
[ captureClause ] ( parameters ) -> returnType {
    statements;
}
```

- `captureClause`: The variables from the defining scope accessible from within the lambda.
- `parameters`: The lambda function parameters.
- `returnType`: The return type of the lambda. If omitted, the `->` is also omitted and the type will be `auto` inferred from the `return`.
- `statements`: Any number of statements that make up the body of the function.

Let's look at the lambda defined above:

```cpp
[](const std::string word) {
  return word.length() > 8;
}
```

It has no capture variables, one parameter, and a single body statement. Its return type is `auto`, which will be inferred as `bool`.

## Naming and Storing Lambdas

Although we can define lambdas inline inside a function call we can also assign them to variables:

```cpp
auto helloSquirrel{
  [](const std::string name) {
    std::cout << "Hello " << name << " from your friendly neighbourhood squirrel!\n";
  }
};

helloSquirrel("Wally");
helloSquirrel("Daisy");
```

## Generic Lambdas

Starting with C++14, the parameters of a lambda expression can be of type `auto` and they will be inferred from how the lambda is used.

<iframe height="800px" width="100%" src="https://repl.it/@stungeye/Generic-Lambda?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## The Wonderful World of STL Algorithms

In the above examples we've seen two functions from the `<algorithm>` header that work nicely with lambdas. There are many helpful in this header including:

- `count_if()` - Count the number of element in a collection that match a test.
- `adjacent_find()` - Find the first two adjacent elements that are equal (or satisfy a test).
- `for_each()` - Apply a function or lambda to all elements in a collection.
- `find_if()` - Return an iterator to the first element that matches a test.
- `all_of()` / `any_of()` / `none_of()` - Do all, any or none of the elements in a collection satisfy a test?

See the further [reading section](#further-reading) to learn about more of these helpful algorithms.

## The Need to Capture Local Variables

The above lambdas have all had empty capture clauses (`[]`). The capture clause is the list of variables from the outside scope that will be made available to the lambda.

Let's look at an example of when we might want to use a capture clause. We'll return to our example where we are counting the number of "long words" in a vector:

```cpp
const auto longWordCount = std::count_if(words.begin(), words.end(), [](const std::string word) {
  return word.length() >= 8;
});
```

Notice that a "long word" is hardcoded to be 8 characters or more. But what if we wanted to ask the user for the required length? We can't add another argument to the lambda because `count_if()` is calling the lambda and is only passing one argument.

## Lambda Captures to the Rescue

<iframe height="730px" width="100%" src="https://repl.it/@stungeye/Lambda-With-Capture?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Captures Default to Const Value

By default, variables are capture by `const` value. This means they are copied to a new variable with the same name as the outer variable. Since this inner capture variable is `const`, its value cannot be changed.

```cpp
int longWordLength = 8;
auto longWordCount = std::count_if(words.begin(), words.end(),
  [longWordLength](const std::string word) {
    longWordLength++; // ERROR: The capture variable is immutable.
    return word.length() > longWordLength;
});
```

## Capturing By Reference

There are times that you may wish to capture a variable by reference, rather than default to by value. I'm of the opinion that this should primarily be done for performance reasons (large capture objects), as mutating variables from the outer scope can easily be a source of bugs.

That said, here's an example of a reference capture that does mutate the outer variable as a way of tracking how many comparisons are required when sorting an array:

<iframe height="800px" width="100%" src="https://repl.it/@stungeye/Lambda-With-Reference-Capture?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

The only way to make a reference capture `const` is to make the outer variable `const`.
{: .d-inline-block}

## Default Capture

We can capture multiple variables using a comma-delimited list of variable names as the capture clause:

```cpp
int goldCoins = 12;
float manaRemaining = 45.2;

auto exploreWorld = [goldCoins, manaRemaining]() {
  std::cout << "Setting out to explore the world with " << goldCoins
            << "gold and " << manaRemaining << " mana.\n";
}
```

The compiler can also infer the captures based on the outer variables we mention in our lambda:

```cpp
int goldCoins = 12;
float manaRemaining = 45.2;

auto exploreWorld = [=]() { // The = sign means the lambda will capture all outer variables mentioned:
  std::cout << "Setting out to explore the world with " << goldCoins
            << "gold and " << manaRemaining << " mana.\n";
}
```

We can also default to capturing all mentioned variables by reference:

```cpp
int goldCoins = 12;
float manaRemaining = 45.2;

auto exploreWorld = [&]() { // Capture all outer variables mentioned by reference:
  std::cout << "Setting out to explore the world with " << goldCoins
            << "gold and " << manaRemaining << " mana.\n";
}
```

## Mix and Match Capture Types

We can mix and match value, reference, and default captures within a single capture clause. Here are some examples, where I've kept the lambda body empty for simplicity:

```cpp
int sum = 12;
std::vector ghosts{"pinky", "blinky", "inky", "clyde"};
float weightOnMars = 12.134;

// Some valid captures:
[=, &ghosts](){}; // Capture all mentioned outer variables by value, but ghosts by reference.
[sum, weightOnMars, &ghosts](){}; // Capture sum and weightOnMars by value, but ghosts by reference.
[&, sum](){}; // Capture all mentioned outer variables by reference, but sum by value.

// Some invalid captures:
[&, &ghosts](){}; // Compile Error: The ghosts variable is already captured by reference through the & default.
[=, sum](){}; // Compile Error: The sum variable is already captured by value through the = default.
[sum, &](){}; // Compile Error: Default captures must be the first element in the capture clause.
```

## Further Reading

- [Introduction to Lambdas @ LearnCpp.com](https://www.learncpp.com/cpp-tutorial/introduction-to-lambdas-anonymous-functions/)
- [Lambda Captures @ LearnCpp.com](https://www.learncpp.com/cpp-tutorial/lambda-captures/)
- [Lambda Expressions in C++ @ doc.microsoft.com](https://docs.microsoft.com/en-us/cpp/cpp/lambda-expressions-in-cpp?view=msvc-160)
- [The World Map of C++ STL Algorithms](https://www.fluentcpp.com/getthemap/)
- [105 STL Algorithms in Less Than an Hour](https://www.youtube.com/watch?v=2olsGf6JIkU) (1 hour video)
- [Algorithm Intuition by Conor Hoekstra](https://www.youtube.com/watch?v=48gV1SNm3WA) (1.5 hour video)
- [Better Algorithm Intuition by Conor Hoekstra](https://www.youtube.com/watch?v=TSZzvo4htTQ) (1 hour video)
