---
title: Arrays
parent: Collections of Data
nav_order: 2
---

<!--prettier-ignore-start-->
# Arrays
{: .no_toc }

Arrays are the simplest C++ container for storing ordered data of a uniform type. 

Two types of array are available:

* Basic arrays as defined in the C programming language. 
* The enhanced `std::array` from the C++ Standard Library.

💡 Best Practice:
{: .label .label-green }

Unless your collection size is fixed, [`std::vector`](/Programming-1-Notes/docs/06-container-structures/03-vectors.html) should be preferred over arrays.
{: .d-inline-block }

💡 Best Practice:
{: .label .label-green }

With Unreal Engine use the [`TArray` container class](https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/TArrays/index.html) in place of arrays *and* vectors.
{: .d-inline-block }

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## C-Style Arrays

As the name implies, _C-Style Arrays_ are arrays as defined in the C programming language.

They are only presented here because you may run into them in legacy C++ code.

💡 Best Practice:
{: .label .label-green }

Avoid using C-Style Arrays in C++.
{: .d-inline-block}

## C-Style Arrays Definition

C-Style Arrays are defined with a type and a length.

```cpp
int primes[4]{}; // An array of four ints.
```

Arrays can be initialized when declared:

```cpp
int primes[4]{ 2, 3, 5, 7 };
```

🎵 Note:
{: .label .label-yellow}

Array length cannot be changed once defined.
{: .d-inline-block}

## C-Style Array Set and Get

We can store and retrieve data into the array positions using zero-base indexes and square braces:

```cpp
int primes[4]{}; // An array of four ints.

primes[0] = 2; // First element has index 0
primes[1] = 3;
primes[2] = 5;
primes[3] = 7; // Last element has index 3 (length-1)

// Retrieve array elements by position:
int sum = primes[0] + primes[1] + primes[2] + primes[3]
```

## C-Style Array Length

The length of an array can be retrieve using `std::size()` from the `<iterator>` header:

```cpp
#include <iterator>
#include <iostream>

int main() {
  int fibonacci[7]{ 1, 1, 2, 3, 5, 8, 13 };
  int length = std::size(fibonacci);
  std::cout << "I have the first " << length << " Fibonacci numbers.";
}
```

⚡ Warning:
{: .label .label-red}

The `std::size()` function won't work on arrays passed as arguments to functions.
{: .d-inline-block}

## Copying C-Style Arrays

C-Style arrays are not copied by using the assignment operator:

```cpp
double copy[4]{ 1, 2, 3, 4 };
double pasta[4];

// This will not make a copy:
pasta = copy; // Compiler Error: Array type is not assignable.
```

Instead we need to use `std::copy` from the `<algorithm>` header:

```cpp
std::copy(std::begin(copy), std::end(copy), std::begin(pasta));
```

## The C++ Standard Array

`std::array` was designed as a zero-overhead wrapper for C-Style Arrays.

Standard Array includes the following enhancements over C-Style Arrays:

- Easily assigned and copied.
- Length can be determined when passed into a function.
- The length and type can be inferred when initialized during declaration.

💡 Best Practice:
{: .label .label-green}

Always prefer `std::array` over C-Style arrays. Lots to gain, little to lose.
{: .d-inline-block}

## Defining Standard Arrays

To use a standard array we must first include the correct header:

```cpp
#include <array>
```

Standard arrays are defined with a type and a size:

```cpp
// Array of five integers
std::array<int, 5> evenNumbers;
```

The type and size can be inferred if an initializer list is provided:

```cpp
std::array evenNumbers{ 2, 4, 6, 8, 10 };
```

🎵 Note:
{: .label .label-yellow}

Uninitialized array positions default to a value of zero.
{: .d-inline-block}

## Standard Array Length

A standard array can be queried for its own length using the `size()` method.

```cpp
std::array evenNumbers{ 2, 4, 6, 8, 10 };
int length = evenNumbers.size();
```

## C-Style vs Standard Array

Here's a program that demonstrates some of the differences between `std::array` and C-Style Arrays.

```cpp
#include <iostream>  // For std::cout
#include <algorithm> // For std::copy
#include <array>     // For std::array

int main() {
  // Two C-Style Arrays (Length: 4, Type: int) 
  double original[4]{ 2, 4, 6, 8 };
  double duplicate[4];

  // This doesn't work for a copy:
  duplicate = original; 

  // Instead we must manually copy from original to duplicate array:
  std::copy(std::begin(original), 
            std::end(original), 
            std::begin(duplicate));

  // Must use a separate function to get array length:
  std::cout << "Length of array: " << std::size(duplicate) << "\n";

  // Change position three of the original:
  original[3] = 99;

  // Nice! The copy still has 8 in position 3:
  std::cout << "Still 8: " << duplicate[3] << "\n";

  // Two enhanced Standard Arrays (Length:4, Type: int)
  std::array stdOriginal{ 2, 4, 6, 8 };  // Type and length inferred.
  std::array<int,4> stdDuplicate;   // Type and length specified.

  // Copy by assignment. Easy!
  stdDuplicate = stdOriginal; 

  // Standard arrays can be queries for their length:
  std::cout << "Length of array: " << stdDuplicate.size() << "\n";

  // Original and copy are separate instances:
  stdOriginal[3] = 99;
  std::cout << "Still 8: " << stdDuplicate[3] << "\n";
}
```

## Out-of-Bounds Behaviour

Both C-Style and Standard Arrays are missing array boundary checking. Historically this has been (and continues to be) a major source of bugs and security exploits.

```cpp
#include <iostream>
#include <array>

int main() {
  std::array numbers{ 1, 2, 3, 4, 5 }; 
  
  // Will this work?
  std::cout << "numbers[99] is " << numbers[99] << "\n";
  numbers[99] = 42;
  std::cout << "numbers[99] is " << numbers[99] << "\n";

  // How about if we go further outside the bounds?
  std::cout << "numbers[9999] is " << numbers[9999] << "\n";
  numbers[999] = 42;
  std::cout << "numbers[9999] is " << numbers[9999] << "\n";
}
```

💡 Best Practice:
{: .label .label-green }

Manually include guards in your code to prevent out-of-bounds reads or writes.
{: .d-inline-block }

## Looping Over Standard Arrays

The two simplest ways to loop over standard arrays:

```cpp
#include <iostream> // For std::cout
#include <array>    // For std::array

int main() {
  std::array fibonacci{ 1, 1, 2, 3, 5, 8, 13 };
  
  // Regular indexed for loop:
  for (auto i = 0; i < fibonacci.size(); ++i) {
    std::cout << fibonacci[i] << "\n";
  }

  // Range based for loop:
  for (auto number : fibonacci) {
    std::cout << number << "\n";
  }
}
```

🎵 Note:
{: .label .label-yellow}

The loop variable `i` will be of type `std::size_t`. [More on this type](https://en.cppreference.com/w/cpp/types/size_t).
{: .d-inline-block}

## Copying Arrays

An easier way to copy arrays is to use the array _copy constructor_:

```cpp
  std::array arrayOne{ 3, 1, 4, 1, 5, 9};
  std::array arrayTwo{ arrayOne }; // Copy arrayOne into arrayTwo.
```

## Standard Arrays as Function Arguments

Standard Arrays can be received by function parameters.

Unlike C-Style Arrays, Standard Arrays don't lose their length information once inside the function.

```cpp
double calculateAverage(std::array<double, 5> data) {
  double sum{0.0};
  for (auto number : data) {
    sum += data;
  }
  return sum / data.size();
}
```

🎵 Note:
{: .label .label-yellow}

When passing a Standard Array to a function, a copy of the array will be made.
{: .d-inline-block}

## Passing Arrays by Reference

C++ functions are _pass-by-value_ by default, meaning copies are made of the arguments passed to a function.

We can switch to _pass-by-reference_ with the `&` operator. Passing a reference to an argument avoids the performance hit of the copy.

```cpp
// Array passed as a reference for performance and as a const for safety:
double calculateAverage(const std::array<double, 5>& data) {
  // Identical function body as above.
}
```

💡 Best Practice:
{: .label .label-green }

For safety, we mark reference arguments as immutable using `const`.
{: .d-inline-block }

Without the `const` we might accidentally change the array while in the function, affecting the referenced array outside of the function.

## Vector > Standard Array > C-Style Arrays

Above we stated that you should prefer Standard Arrays over C-Style Arrays.

C++ also has a collection type called a Standard Vector, which is similar to a `std::array`, but without a fixed length. We'll cover vectors in [the next section](/Programming-1-Notes/docs/06-container-structures/03-vectors.html).

💡 Best Practice:
{: .label .label-green }

Unless your collection length is fixed, prefer `std::vector` over `std::array`.
{: .d-inline-block }

## Further Reading

- [std::array vs C-Style Array @ Coders Corner](https://web.archive.org/web/20240105201112/https://coders-corner.net/2018/06/16/stdarray-vs-c-style-array/)
- [Prefer using STL vector by default @ C++ Core Guidelines](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rsl-vector)
