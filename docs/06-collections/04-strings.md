---
title: Strings
parent: Collections of Data
nav_order: 4
---

<!--prettier-ignore-start-->

# Strings 
{: .no_toc }

Strings are objects that represent sequences of characters. We use strings to store text.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Defining and Initializing Strings

Strings are part of the `std` namespace and can be used in your code by including the `<string>` header.

```cpp
#include <string>
```

The easiest way to define and initialize a string is with a string literal:

```cpp
std::string description{"It was a dark and stormy night!"};
```

## String Length

The length of a string can be retrieved using the `length()` method.

```cpp
std::string numerals{"123456789"};
std::cout << "The length of the string '" << numerals << "' is " << numerals.length() << ".";
```

## Copying Strings

Strings are easily copied to other variables using the assignment operator.

```cpp
std::string original{"I am truly a unique and valued string."};
std::string copycat = original; // Both strings now contain the same characters.
```

## Accessing Chars Within Strings

We can access particular characters within a string using square braces `[]` or with the `at()` method. Like arrays and vectors, access to characters in a string is zero-based.

```cpp
  std::string hacker{"Acid Burn"};
  char space = hacker[4]; // The space character.
  char capitalB = hacker.at(5); // The capital letter B.
```

⚡ Warning:
{: .label .label-red}

The `.at()` does bounds checking but `[]` access does not. Use `[]` with caution.
{: .d-inline-block}

## Looping Over the Chars of a String

We can visit every character of a string using a for loop combined with character indexing using square braces or the `at()` method.

```cpp
  // Print out each character in the string on separate lines:
  for(audo i{0}; i < hacker.length(); i++) {
    std::cout << hacker[i] << "\n"; // We could also have used: hacker.at(i)
  }
```

## String Concatenation

Multiple strings can be combined using the `+` concatenation operator. The `+` operator can also concatenate chars to strings.

```cpp
std::string hack{"Hack"};
std::string the{"The"};
std::string planet{"Planet"};
char space = ' ';

std::string sentence = hack + space + the + space + planet;
```

## String Concatenation with Primitives

Although the `+` operator can be used to glue strings and characters together, it won't work with numeric types. Instead we use `std::to_string()` to first convert numeric data to strings.

```cpp
int time = 4;
std::string townCrier{"It's " + std::to_string(time) + " o'clock and all is well!"};
// It's 4 o'clock and all is well!
```

## Output Stream String Concatenation

If you like how strings and primitives can be compared using `std::cout` you can build strings in a similar way using an `std::ostringstream` from the `<sstream>` header:

```cpp
int numberOfAxes = 4;
int numberOfRubies = 2;

std::ostringstream groceryList;
groceryList << "Trade " << numberOfAxes << " axes for " << numberOfRubies << " rubies.";

std::string list = groceryList.str();
```

## Input Stream String Parsing

String streams can also be used to do simple string parsing:

```cpp
void parseSentence(std::string sentence) {
  std::istringstream iss{sentence};
  std::string animal, adjective;
  int number;

  iss >> number >> animal >> adjective;

  std::cout << "There were " << number << " " << adjective << " " << animal << ".\n";
}

// Later used like this:
parseSentence("25 elephants chill"); // There were 25 chill elephants.
parseSentence("14 gazel angry");     // There were 14 angry gazel.
```

## Comparing Strings

Two strings can be easily compared using the equality operator.

<iframe height="650px" width="100%" src="https://replit.com/@stungeye/Comparison?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Sub-Strings

We can use the `.substr()` method to extract sub-strings from `std::string`.

- First argument: Starting position of the string.
- Second argument: Length of the sub-string you want.

The second argument is optional. Sub-string will go to the end of the string if only the first argument is provided.

```cpp
std::string maryPoppins{"supercalifragilisticexpialidocious"};
std::string super{maryPoppins.substr(0, 5)}; // super
std::string docious{maryPoppins.substr(27)}; // docious
```

## Replacing Sub-Strings

We can use the `.replace()` method to replace a portion of a string with another string:

```cpp
std::string phrase{"Today is a good day to dine!"};
phrase.replace(11, 4, "great"); // Replace character 11 through 14 "good" with "great".
```

🎵 Note:
{: .label .label-yellow}

There are many other forms of the `replace()` method. [Details](http://www.cplusplus.com/reference/string/string/replace/).
{: .d-inline-block}

## Searching Strings

We can search for characters or sub-strings in a string using `find()`. The method returns the start position (`std::string::size_type`) of the found character/sub-string. If not found, the method returns `std::string::npos`.

<iframe height="700px" width="100%" src="https://replit.com/@stungeye/Searching-Strings?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Passing Strings to Functions

Passing large strings to functions can be expensive. Although we can mitigate this by passing as `const` reference, we have another option: `std::string_view`.

Introduced in C++17, a `std::string_view` gives us a view into an existing string. String views are very cheap to copy and have a similar API to regular standard strings.

<iframe height="650px" width="100%" src="https://replit.com/@stungeye/String-Views?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## C-Style Strings

You will occasionally run across code that uses old school C-style strings. C-style strings are arrays of characters with the end of the string denoted by a _null terminator_ (ascii code 0). This is why they are sometimes referred to as null-terminated strings.

Defining a C-style string:

```cpp
char username[]{"GhostlyGrinner"}; // C++ automatically adds the null terminator.
```

If you need to use a function that requires a C-style string parameter:

```cpp
std::string modernString{"I'm so fancy and modern!"};
someOldSchoolFunction(modernString.c_str());
```

Converting a C-style string into `std::string` is easy:

```cpp
char oldSkool[]{"I'm totally 31337!"};
std::string newSchool{oldSkool};
```

⚡ Warning:
{: .label .label-red}

C-style strings cannot be assigned values with an assignment statement.
{: .d-inline-block}

## Unreal Engine String

When working in Unreal Engine there are three different lightweight string types we can use `FText`, `FString`, and `FName`.

`FName` is the most lightweight, is case-insensitive, and mainly used for internal IDs, tags, and names.

`FText` is used for any text that might be shown to the user and forms the basis for UI translation/localization.

`FString` is similar to `FText` but includes all sorts of handy helper functions at the cost of using more memory.

## Further Reading

- [11 Ways to Format Strings in C++ @ Stack Overflow](https://stackoverflow.com/a/900035s)
- [The Complete Guide to Building Strings In C++ @ Fluent CPP](https://www.fluentcpp.com/2017/12/19/build-strings-from-plain-string-up-to-boost-karma/)
- [Working with C-Style Strings @ learncpp.com](https://www.learncpp.com/cpp-tutorial/c-style-strings/)
- [C++ Regular Expressions 101 @ Fluent CPP](https://www.fluentcpp.com/2020/02/28/c-regex-101-simple-code-for-simple-cases-with-regexes/)
- [String Handling in UE4 @ docs.unrealengine.com](https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/StringHandling/index.html)
