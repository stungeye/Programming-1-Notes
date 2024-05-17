---
title: Console I/O
parent: Introduction to C++
nav_order: 4
---

<!--prettier-ignore-start-->
# Console I/O
{: .no_toc }

We can read from the keyboard and write to the console in C++ using input and output streams.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Input / Output Streams

In C++ a _stream_ is an abstract representation of a _device_ on which input and output operations can be performed.

The devices which we can stream to and from are things like the operating system's standard output (console), standard input (keyboard), and the file system.

You can think of a stream as a source or a destinations for a potentially unlimited sequence of bytes.

## I/O Stream Libraries

![Stream Class Hierarchy](iostream.gif)

From the hierarchy shown in the image, we typically use streams from the following built-in headers:

- iostream - Standard Input / Output (Console & Keyboard)
- fstream - File Input / Output
- sstream - String I/O (Treat Strings as Streams)

## Outputting Text To the Console

As we saw in our [initial tour of C++](/Programming-1-Notes/docs/04-cpp-and-visual-studio-tour/01-cpp-and-visual-studio-tour.html#hello-c) we can use `std::cout` with the "put to" operator `<<` to write to the standard output stream, the console.

There is also a standard error and logging output stream, `std::cerr` and `std::clog`.

The `std::` part means these streams are part of the "standard" namespace.

⏳ Wait For It:
{: .label .label-blue}

Namespaces help prevent name conflicts in large projects. See [namespaces section](/Programming-1-Notes/docs/06-containers-and-file-io/01-namespaces.html).
{: .d-inline-block}

## Console Output Example

```cpp
#include <iostream>

int main() {
  // Let's output a string literal to the console:
  std::cout << "Hello World!\n";
  // Multiple insertion operations can also be chained together:
  std::cout << "This " << "is " << "it!" << "\n";
  // Use std::endl, instead of \n, to force the stream buffer to flush:
  std::cout << "Buffer Flush" << std::endl;
}
```

💡 Best Practice:
{: .label .label-green }

Using `\n` for newlines is said to be more performant that `std::endl`.
{: .d-inline-block}

## Outputting Variables to the Console

All built-in types have predefined ways to be output to a stream.

```cpp
#include <iostream>

int main() {
  const double pi{ 3.1415926 };
  int answer{ 42 };
  long double hugeNumber{ 1.5e300 };

  std::cout << pi << "\n";
  std::cout << hugeNumber << "\n";
  std::cout << "The answer is " << answer << ".\n";
}
```

⏳ Wait For It:
{: .label .label-blue}

In [a later section](/Programming-1-Notes/docs/08-user-defined-types/04-operator-overloading.html) we'll define I/O stream operations for our own user-defined types.
{: .d-inline-block }

## Reading User Keyboard Input

The keyboard is an input stream that we can access using `cin` and the "get from" `>>` operator.

The stream will process the submitted data once the user presses enter. The newline character is automatically discarded.

```cpp
#include <iostream>
#include <cmath>

int main() {
  // Reading in an integer. 
  int ducks;
  std::cout << "How many ducks do you see: ";
  std::cin >> ducks;
  std::cout << "There are " << ducks << " ducks.\n";

  // Reading in a double.
  double temperature;
  std::cout << "What is the temperature: ";
  std::cin >> temperature;
  std::cout << "The temperature is " << temperature << ".\n";
}
```

If you wish to try this program on Compiler Explore, you will need to find and click the "Execution stdin" button found in the right-hand output tab. That will enable a place to type input. 

⚡ Warning:
{: .label .label-red }

Streams can be "partially consumed" with the remaining data fed into the next stream.
{: .d-inline-block }

Try inputting `2.3` for the number of ducks. The `2` will be streamed into the `duck` integer and the `.3` will be streamed into the `temperature` double.

## Reading String Data

We can read string data using `cin`, but the input will be whitespace terminated.

Assuming the `answer` variable is a string:

```cpp
std::cin >> answer; // User inputs: Hello World
std::cout << answer; // Outputs: Hello
```

The `getline` function can be used to get an entire line of input, up to the newline character:

```cpp
std::getline(std::cin, answer); // User inputs: Hello World
std::cout << answer;  // Outputs: Hello World
```

## String Streams and File Streams

⏳ Wait For It:
{: .label .label-blue}

In later sections, we learn [how to stream to/from the file system](/Programming-1-Notes/docs/09-file-io/00-file-io.html) and [how to stream to/from RAM](/Programming-1-Notes/docs/06-collections/04-strings.html#more-string-concatenation).
{: .d-inline-block}

Streaming to data in and out of memory as a string is possible using the `<sstream>` header.

Streaming to and from files is done using the `<fstream>` header.

## Further Reading

- [Introduction to iostream @ learncpp.com](https://www.learncpp.com/cpp-tutorial/introduction-to-iostream-cout-cin-and-endl/)
- [Basic Input / Output @ cplusplus.com](https://www.cplusplus.com/doc/tutorial/basic_io/)
