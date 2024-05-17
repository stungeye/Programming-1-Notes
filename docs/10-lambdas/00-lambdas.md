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

```cpp
#include <iostream>  // std::cout
#include <vector>    // std::vector
#include <string>    // std::string
#include <algorithm> // std::count_if

bool isLong(std::string word) {
  return word.length() >= 8;
}

int main() {
  std::vector<std::string> words{ "the", "origin", "of", "consciousness", "in", "the", "breakdown", "of", "the", "bicameral", "mind" };

  auto longWordCount = std::count_if(words.begin(), words.end(), isLong);

  std::cout << "There are " << longWordCount << " long words.\n";
}
```

## Lambda Expressions

Lambda expressions were added to C++ in C++11 as a way to define a single-use nameless functions.

Here's our example from above with the `wordIsLong()` function replaced by an inline lambda:

```cpp
const std::vector<std::string> words{ "long", "selection", "longest", "consciousness" };

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

```cpp
#include <array>     // std::array 
#include <algorithm> // std::adjacent_find
#include <iostream>  // std::cout
 
int main() {
  std::array months{ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
 
  // Find the first two consecutive months that start with the same letter.
  auto sameLetter{ 
    std::adjacent_find(months.begin(), months.end(), 
      [](const auto& a, const auto& b) { return (a[0] == b[0]); })
  };
 
  // If no pair is found, sameLetter will point to .end()
  if (sameLetter != months.end()) { 
    std::cout << *sameLetter << " and " << *std::next(sameLetter)
              << " start with the same letter.\n";
  }
}
```

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

```cpp
#include <iostream>  // std::cout, std::cin
#include <vector>    // std::vector
#include <string>    // std::string
#include <algorithm> // std::count_if

int main() {
  std::vector<std::string> words{"the", "origin", "of", "consciousness"};

  int longWordLength;

  std::cout << "Long Word Length: ";
  std::cin >> longWordLength;

  auto longWordCount = std::count_if(words.begin(), words.end(),  
    [longWordLength](const std::string word) {
      return word.length() > longWordLength;
  });

  std::cout << "There are " << longWordCount << " words longer than "
            << longWordLength << " characters.\n";
}
```

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

```cpp
#include <iostream>  // std::cout
#include <array>     // std::array
#include <algorithm> // std::sort

int main() {
  std::array numbers{ 9, 99, 4, 44, 300, 3, 12, 2, 200 };
  int numberOfComparisons{ 0 };

  std::sort(numbers.begin(), numbers.end(),
    // Capture comparisons by reference.
    [&numberOfComparisons](const auto& a, const auto& b) {
      ++numberOfComparisons; // Mutate the outer variable.
      return (a < b); // Change to > for descending sort.
  });

  std::cout << numberOfComparisons << " comparisons required.\n";

  for(auto number : numbers) {
    std::cout << number << " ";
  }
}
```

🎵 Note:
{: .label .label-yellow}

The only way to make a reference capture `const` is to make the outer variable `const`.
{: .d-inline-block}

## Default Capture

We can capture multiple variables using a comma-delimited list of variable names as the capture clause:

```cpp
int goldCoins{ 12 };
float manaRemaining{ 45.2 };

auto exploreWorld = [goldCoins, manaRemaining]() {
  std::cout << "Setting out to explore the world with " << goldCoins
            << "gold and " << manaRemaining << " mana.\n";
}
```

The compiler can also infer the captures based on the outer variables we mention in our lambda:

```cpp
int goldCoins{ 12 };
float manaRemaining{ 45.2 };

auto exploreWorld = [=]() { // The = sign means the lambda will capture all outer variables mentioned:
  std::cout << "Setting out to explore the world with " << goldCoins
            << "gold and " << manaRemaining << " mana.\n";
}
```

We can also default to capturing all mentioned variables by reference:

```cpp
int goldCoins{ 12 };
float manaRemaining{ 45.2 };

auto exploreWorld = [&]() { // Capture all outer variables mentioned by reference:
  std::cout << "Setting out to explore the world with " << goldCoins
            << "gold and " << manaRemaining << " mana.\n";
}
```

## Mix and Match Capture Types

We can mix and match value, reference, and default captures within a single capture clause. Here are some examples, where I've kept the lambda body empty for simplicity:

```cpp
int sum = 12;
std::vector ghosts{ "pinky", "blinky", "inky", "clyde" };
float weightOnMars = 12.134;

// Some valid captures:
[=, &ghosts](){}; // Capture all mentioned outer variables by value, but ghosts by reference.
[sum, weightOnMars, &ghosts](){}; // Capture sum and weightOnMars by value, but ghosts by reference.
[&, sum](){}; // Capture all mentioned outer variables by reference, but sum by value.

// Some invalid captures:
[&, &ghosts](){}; // Compile Error: The ghosts variable is already captured by reference through the &.
[=, sum](){}; // Compile Error: The sum variable is already captured by value through the =.
[sum, &](){}; // Compile Error: Default captures must be the first element in the capture clause.
```

## Saving Lambdas to Variables

The `std::function` type from the `<functional>` header allows us to assign a function to a variable if the return type and arguments match:

```cpp
std::function<returnType(list, of, arg, types)> variableName;
```

Usage example:

```cpp
#include <iostream>   // std::cout
#include <string>     // std::string
#include <functional> // std::function

int main() {
  // Void function that takes a single integer argument:
  std::function<void(int)> lambda{ [](int num){ std::cout << num; } };
  
  lambda(10);

  // Bool function that takes a string and an integer as arguments:
  std::function<bool(std::string, int)> longerThan;
  longerThan = [](std::string s, int n)->bool{ return s.length() > n; };

  if(longerThan("supercalifragilisticexpialidocious", 20)) {
    std::cout << "\nSuper-dee-duper!\n";
  }
}
```

## Lambdas as Function Arguments

We can create our own functions that accept lambdas as arguments by using `std::function` for parameter types.

```cpp
#include <iostream>
#include <vector>
#include <functional>

void filterPrint(const std::vector<int>& vector, 
                 const std::function<bool(int)>& predicate) {
  for(auto element : vector) {
    if (predicate(element)) {
      std::cout << element << "\n";
    }
  }  
};

bool isEven(int num) {
  return num % 2 == 0;
}

int main() {
  std::vector<int> numbers{ 2, 34, 1, 679, 50, 12, 34, 31, 3, 107 };

  std::cout << "All the numbers greater than 40 in our vector:\n";
  filterPrint(numbers, [](int num)->bool{ return num > 40;});

  std::cout << "\nAll the even numbers in our vector:\n";
  filterPrint(numbers, [](int num)->bool{ return num % 2 == 0;});

  // Note that regular functions can be passed as well:
  std::cout << "\nAll the even numbers in our vector:\n";
  filterPrint(numbers, isEven);
}
```

🎵 Note:
{: .label .label-yellow}

Functions that accept lambdas can also accept regular functions by name is well.
{: .d-inline-block}

## Further Reading

- [Introduction to Lambdas @ LearnCpp.com](https://www.learncpp.com/cpp-tutorial/introduction-to-lambdas-anonymous-functions/)
- [Lambda Captures @ LearnCpp.com](https://www.learncpp.com/cpp-tutorial/lambda-captures/)
- [Lambda Expressions in C++ @ doc.microsoft.com](https://learn.microsoft.com/en-us/cpp/cpp/lambda-expressions-in-cpp)
- [The World Map of C++ STL Algorithms](https://www.fluentcpp.com/getthemap/)
- [105 STL Algorithms in Less Than an Hour](https://www.youtube.com/watch?v=2olsGf6JIkU) (1 hour video)
- [Algorithm Intuition by Conor Hoekstra](https://www.youtube.com/watch?v=48gV1SNm3WA) (1.5 hour video)
- [Better Algorithm Intuition by Conor Hoekstra](https://www.youtube.com/watch?v=TSZzvo4htTQ) (1 hour video)
