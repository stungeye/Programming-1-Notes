---
title: Arrays
parent: Container Structures
nav_order: 2
---

<!--prettier-ignore-start-->
# Arrays
{: .no_toc }

Arrays are the simplest C++ container for storing ordered data of an uniform type. 

Two types of array are available:

* Basic arrays as defined in the C programming language. 
* The enhanced `std::array` from the C++ Standard Library.

💡 Best Practice:
{: .label .label-green }

Unless your collection size is fixed, [`std::vector`](/Programming-1-Notes/docs/06-container-structures/03-vectors.html) should be preferred over `std::array`.
{: .d-inline-block }
### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## C-Style Arrays

C-Style array are defined with a type and a size:

```cpp
int prime[4]{}; // An array of four ints.
```

We can store and retrieve data into the array positions using zero-base indexes and square braces:

```cpp
// Assign values to our array positions:
prime[0] = 2; // First element has index 0
prime[1] = 3;
prime[2] = 5;
prime[3] = 7; // Last element has index 3 (length-1)

// Retrieve array elements by position:
int sum = prime[0] + prime[1] + prime[2] + prime[3]
```

Arrays can be initialized when declared:

```cpp
int prime[4]{2, 3, 5, 7};
```

## C-Style Array Length

The length of an array can be retrieve using `std::size()` from the `<iterator>` header:

```cpp
#include <iterator>

int main() {
  int fibonacci[7]{1, 1, 2, 3, 5, 8, 13};
  int length = std::size(fibonacci);
}
```

⚡ Warning:
{: .label .label-red}

The `std::size()` function won't work on arrays passed as arguments to functions.
{: .d-inline-block}

## Copying C-Style Arrays

C-Style arrays are not copied when using the assignment operator:

```cpp
double copy[4]{1,2,3,4};
double pasta[4];

pasta = copy; // Does not make a copy.
```

Instead we need to use `std::copy` from the `<algorithm>` header:

```cpp
std::copy(std::begin(copy), std::end(copy), std::begin(pasta));
```

## The C++ Standard Array

`std::array` was designed as a zero-overhead wrapper for C-Style arrays. It includes the following enhancements in comparisons to a C-Style array:

- Easily assigned and copied.
- Length can be determined when passed into a function.
- The length and type can be inferred when initialized during declaration.

💡 Best Practice:
{: .label .label-green}

Always prefer `std::array` over a C-Style arrays. Lots to gain, little to lose.
{: .d-inline-block}

## Defining Standard Arrays

To use a standard array we must first include the correct header:

```cpp
#include <array>
```

Standard arrays are defined with a type and a size:

```cpp
// Array of fivej integers
std::array<int, 5> doubles;
```

The type and size can be inferred if an initializer list is provided:

```cpp
std::array doubles{2, 4, 6, 8, 10};
```

🎵 Note:
{: .label .label-yellow}

Uninitialized array positions default to a value of zero.
{: .d-inline-block}

## Standard Array Length

A standard array can be queried for its own length using the `size()` method.

```cpp
int length = doubles.size();
```

## C-Style vs Standard Array

Here's program tha demonstrates some of the differences between C-Style and `std::array` arrays.

<iframe height="700px" width="100%" src="https://repl.it/@stungeye/C-Style-Array-Copy?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Looping Over Standard Arrays

## Standard Arrays as Function Arguments

## Standard Arrays as Return Values

## Introducing References

## Passing Arrays by Reference

## Prefer Vector

## Further Reading

- [std::array vs C-Style Array @ Coders Corner](https://coders-corner.net/2018/06/16/stdarray-vs-c-style-array/)
- [Prefer using STL vector by default @ C++ Core Guidelines](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rsl-vector)
