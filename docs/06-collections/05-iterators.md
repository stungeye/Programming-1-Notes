---
title: Iterators
parent: Collections of Data
nav_order: 5
---

<!--prettier-ignore-start-->

# Iterators
{: .no_toc }

Iterators are special objects that can be used to iterate over (loop through) container objects.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Iterators

Another way to traverse a collection is to use **iterators**, which are special objects that allow us to step through the elements of a container.

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

## Iterators and Standard Collections

The above examples have used vectors, but iterators work for all C++ standard containers:

```cpp
  std::string sentence{"You eat bugs!"};
  for (auto i{ sentence.begin() }; i != sentence.end(); ++i) {
    std::cout << *i << "\n";
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

## Reverse Iterators

There are iterators that let us walk through a collection in reverse:

```cpp
  std::vector sentence{"you", "eat", "bugs"};

  for (auto i{ sentence.rbegin() }; i != sentence.rend(); ++i) {
    std::cout << *i << ' '; // Indirection to get value of current element
  }
```

## Const Iterators

In many cases when we are using an iterator we aren't modifying the container contents, in those cases we should be using the `const` iterators:

```cpp
  std::vector sentence{"you", "eat", "bugs"};

  for (auto i{ sentence.cbegin() }; i != sentence.cend(); ++i) {
    std::cout << *i << ' '; // Indirection to get value of current element
  }
```

🎵 Note:
{: .label .label-yellow}

There are also `const` reverse iterators `crbegin()` and `crend()`.
{: .d-inline-block}

## Iterators as Function Arguments

There are many standard functions that operate on a range of container elements using iterators. These function usually take two iterators as arguments, an iterator to the start of the range and an iterator to the end of the range.

Some examples of functions from the `<algorithm>` header:

<iframe height="900px" width="100%" src="https://repl.it/@stungeye/Iterators?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Further Reading

- [Introduction to Iterators @ LearnCpp.com](https://www.learncpp.com/cpp-tutorial/introduction-to-iterators/)
- [STL Iterators Overview @ LearnCpp.com](https://www.learncpp.com/cpp-tutorial/stl-iterators-overview/)
