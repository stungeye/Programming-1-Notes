---
title: Lambdas
nav_order: 10
---

# Lambdas

TBW

## Objectives

Upon completion of this module, you should be able to:

## Passing Functions as Parameters

It is sometimes handy to pass a function as an argument to another function. Take the `std::count_if()` function for example, which takes the begin and end iterator of a collection and a boolean predicate function. `std::count_if()` then returns the number of elements that return `true` when passed to the predicate.

Here's an example where we are counting how many strings in a vector have a length greater than 8:

<iframe height="750px" width="100%" src="https://repl.it/@stungeye/Callback-Functions-with-stdfindif?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Lambda Expressions

C++ lambda expressions are what we call anonymous functions or closures in other languages. Lambdas allow us to define a single-use nameless function.

Here's our example from above with the `wordIsLong()` function replaced by an inline lambda:

```cpp
  const std::vector<std::string> words{"long", "selection", "longest", "consciousness"};
  const auto longWordCount = std::count_if(words.begin(), words.end(), [](const std::string word) {
    return word.length() > 8;
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
- `find_if()` - Return an interator to the first element that matches a test.
- `all_of()` / `any_of()` / `none_of()` - Test a collection to see if all, any or none of the elements satisfy a test.

See the further [reading section](#further-reading) to learn about more of these helpful algorithms.

## Lambda Captures Including Multiple Captures

## Captures Default to Const

## Mutable Captures (Best Not To, Right?)

## Capturing By Reference (Only const variables will be const refs)

## Default Capture

## Variable Definitions as Captures

## Dangling Captures

## Further Reading

- [The World Map of C++ STL Algorithms](https://www.fluentcpp.com/getthemap/)
- [105 STL Algorithms in Less Than an Hour](https://www.youtube.com/watch?v=2olsGf6JIkU) (1 hour video)
- [Algorithm Intuition by Conor Hoekstra](https://www.youtube.com/watch?v=48gV1SNm3WA) (1.5 hour video)
- [Better Algorithm Intuition by Conor Hoekstra](https://www.youtube.com/watch?v=TSZzvo4htTQ) (1 hour video)
