---
title: Vectors
parent: Collections of Data
nav_order: 3
---

<!--prettier-ignore-start-->
# Vectors
{: .no_toc }

Vectors allow us to create dynamically-sized collections of ordered data of a uniform type. 

💡 Best Practice:
{: .label .label-green }

With Unreal Engine use the [`TArray` container class](https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/TArrays/index.html) in place of arrays and vectors.
{: .d-inline-block }

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Defining and Initializing Vectors

Standard vectors can be used by including the `<vector>` header.

```cpp
#include <vector>
```

Part of the `std` namespace, they are defined with a type and an optional length or list of elements.

```cpp
std::vector<double> myVector; // vector of floats with length 0.
std::vector<float> iceCreamFloats(3); // vector of floats of length 3.
std::vector<int> evenNumbers{ 2, 4, 6, 8, 10, 12}; // vector of int of length 6.
```

If we provide an initializer list, the type becomes optional as it can be inferred by the compiler.

```cpp
std::vector evenNumbers{ 2, 4, 6, 8, 10, 12}; // Vector of int
```

⏳ Wait For It:
{: .label .label-blue}

The `<>` braces used to specify the element type indicates that vectors are template classes.
{: .d-inline-block}

## Get and Set Vector Elements

Vectors elements can be retrieved and set using square braces:

```cpp
std::vector temperatures{ -34.2, -30.0, -32.5, -25.3, -20.0 };
// Get using square braces:
std::cout << temperatures[3];
// Set using square braces:
temperatures[0] = -38.7;
```

There are also special accessor methods for the first and last element:

```cpp
double first = temperatures.front();
double last = temperatures.back();
```

## .at() and Out of Bounds Checking

Like with arrays, square brace access of vectors is not boundary checked, which can led to bugs and security holes.

The `.at()` method is a boundary-safe way to get vector elements, which will throw an exception if an out of bounds index is requested:

```cpp
std::vector temperatures{ -34.2, -30.0, -32.5, -25.3, -20.0 };
// Get using .at():
std::cout << temperatures.at(3);
// This will throw an exception:
std::cout << temperatures.at(333);
```

⏳ Wait For It:
{: .label .label-blue}

Exceptions will be covered in more detail in a later section.
{: .d-inline-block}

## Vector Length

The length of a vector can be retrieve using the `size()` method:

```cpp
auto length = temperatures.size();
```

## Resizing Vectors

A vector's length can be modified using the `resize()` method. The first argument is the new length, the second argument is the optional default value of any newly created elements.

```cpp
// Assumes: #include <string> and #include <vector>
std::vector poem{"Mares eat oats", "Goats eat oats", "Little lambs eat ivy"};
poem.resize(2); // Shrink the vector: No more little lambs.
poem.resize(10, ""); // Resize to length 10 and fill with empty strings.
```

If the default value isn't provided:

- Vectors of primitives are filled with zeros.
- Vectors of objects are filled using the default constructor of the vector's type.

## Clearing Out a Vector

Instead of using `.resize(0)` to truncate a vector you can use the `.clear()` method. There likely isn't a performance difference between the two, but `clear()` is more intention revealing to other humans.

We can also test if an vector is empty using the `.empty()` predicate method.

```cpp
std::vector bagOfHolding{"sword", "shield", "potion"};
bagOfHolding.clear();
if (bagOfHolding.empty()) {
  std::cout << "You have no inventory!\n";
}
```

## Growing Vectors One Element at a Time

We can use `push_back()` to increase a vector's length by one while adding a new element to the end of the vector:

```cpp
std::vector poem{"Mares eat oats", "Goats eat oats", "Little lambs eat ivy"};
poem.push_back("A kiddley divey too, wouldn't you?");
```

There's also `emplace_back()` which constructs new objects to be put at the end, rather than copying/moving as will happen with `push_back()`. [Learn more about `emplace_back`](https://en.cppreference.com/w/cpp/container/vector/emplace_back).

## Vector as Stack

We can use a vector as a LIFO (Last in First Out) stack using `push_back()` to add to elements the end of the vector, `back()` to retrieve elements from the end of the vector, and `pop_back()` to remove elements from the end of the vector.

```cpp
std::vector oddNumbers{1, 3, 5, 7}; // Length is 4.
oddNumbers.push_back(9); // Length is 5.
oddNumbers.push_back(11); // Length is 6.

int eleven = oddNumbers.back();
oddNumbers.pop_back(); // Length is 5.
int nine = oddNumbers.back();
```

🎵 Note:
{: .label .label-yellow}

The Standard library includes actual stacks and queues: `std:stack`, `std:queue`, and `std:deque`.
{: .d-inline-block}

## Looping Over Vectors

We can loop over vectors with standard and range-based `for` loops.

This demo code shows both styles of loops and also includes the use of `push_back()` and `resize()`:

<iframe height="800px" width="100%" src="https://repl.it/@stungeye/Looping-Over-Vector?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Passing Vectors to Functions

Vectors can be passed to and from functions. Vector function parameters are often defined as as `const &` references for performance reasons:

```cpp
// Array passed as a reference for performance and as a const for safety:
void calculateAverage(const std::vector<double>& data) {
  double sum{0.0};
  for (number : data) {
    sum += data;
  }
  return data / data.size();
}
```

C++ functions are _pass-by-value_ by default, meaning copies are made of the arguments passed to a function. We can switch to _pass-by-reference_ with the `&` operator. Passing a reference to an argument avoids the performance hit of the copy.

## Vector Capacity

Because resize operations on vectors are expensive, a vector will sometimes preallocate capacity for future elements without changing its length:

<iframe height="800px" width="100%" src="https://repl.it/@stungeye/Length-vs-Capacity?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Pointers and Iterators

We can use `data()` for direct access to the underlying array using a pointer.

The standard `begin()` and `end()` iterators (and variants) are all available.

⏳ Wait For It:
{: .label .label-blue}

These affordances will make more sense once we study pointers and iterators.
{: .d-inline-block}

## Comparing Vectors

Two vectors can be compared using the `==` operator. The operator will first check the vector lengths. If they are of equal length, each pair of elements will be compared using `==`.

```cpp
  std::vector vectorOne = { 3, 1, 4, 1, 5, 9};
  std::vector vectorTwo = { 9, 5, 1, 4, 1, 3};

  if (vectorOne == vectorTwo) {
    std::cout << "We should never see this message as the vector elements are not equal.";
  }
```

⚡ Warning:
{: .label .label-red}

Vector comparisons depends on the order of the elements.
{: .d-inline-block}

The above vectors are not equal even though they included the same numbers! If order doesn't matter you could first sort the vectors, or use something like an `unordered_set` instead.

## Vector Iterators

Another way to traverse a vector is to use **iterators**, which are special objects that allow us to step through a container.

All standard containers come with a function that returns an iterator that points to the start of the collection:

```cpp
  std::vector bagOfHolding{"sword", "shield", "potion"};
  auto iterator{bagOfHolding.begin()}; // Iterator that points to the first element.
```

With iterators we can:

- Use the `*` operator to access the element the iterator points to.
- Use addition or subtraction to advance or rewind the iterator.

```cpp
  std::cout << *iterator << "\n"; // Use * to access the element. Outputs: sword
  iterator++; // Advance the iterator
  std::cout << *iterator << "\n"; // Outputs: shield
  iterator++; // Advance the iterator
  std::cout << *iterator << "\n"; // Outputs: potion
  iterator--; // Rewinds the iterator
  std::cout << *iterator << "\n"; // Outputs: shield
```

## Iterator Safety

Nothing stops us from advancing an iterator beyond the end of a collection. This can cause our programs to crash:

```cpp
  std::vector twoWords{"ghostly", "grinner"};
  auto iterator{twoWords.begin()}; // Iterator that points to the first element.

  std::cout << *iterator << "\n"; // Use * to access the element. Outputs: ghostly
  iterator++; // Advance the iterator
  std::cout << *iterator << "\n"; // Outputs: grinner
  iterator++; // Oh no! We've advanced the iterator beyond the end of the collection!
  std::cout << *iterator << "\n"; // Segmentation fault!
```

To guard against this problem we can use the `.end()` iterator:

```cpp
  std::vector sentence{"you", "eat", "bugs"};

  for (auto i{ sentence.begin() }; i != sentence.end(); ++i) {
    std::cout << *i << ' '; // Indirection to get value of current element
  }
```

🎵 Note:
{: .label .label-yellow}

The end iterator points to one position _past_ the last element of the collection.
{: .d-inline-block}

## Reverse Iterators

There are also iterators that let us walk through a collection in reverse:

```cpp
  std::vector sentence{"you", "eat", "bugs"};

  for (auto i{ sentence.rbegin() }; i != sentence.rend(); ++i) {
    std::cout << *i << ' '; // Indirection to get value of current element
  }
```

## Next and Prev Iterators

The `<iterator>` header provides `std::next()` and `std::prev()` functions that return the next or previous iterator:

```cpp
  std::vector sentence{"you", "eat", "bugs"};
  auto secondElement{ std::next(sentence.begin()) };
  auto lastElement{ std::prev(sentence.end()) };
  // These function also take a second argument for number of position to advance or rewind:
  auto alsoLastElement{std::next(sentence.begin(), 2) };
```

⚡ Warning:
{: .label .label-red}

These functions may return iterators pointing outside of our collection!
{: .d-inline-block}

## Further Reading

- [Standard Vector @ cpprefernce.com](https://en.cppreference.com/w/cpp/container/vector)
- [Introduction to std::vector @ learncpp.com](https://www.learncpp.com/cpp-tutorial/an-introduction-to-stdvector/)
- [Vector Capacity and Stack Behavior @ learncpp.com](https://www.learncpp.com/cpp-tutorial/stdvector-capacity-and-stack-behavior/)
- [push_back vs emplace_back](https://yasenh.github.io/post/cpp-diary-1-emplace_back/)
