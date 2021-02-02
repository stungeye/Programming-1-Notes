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

As we saw in our [initial tour of C++](http://localhost:4000/Programming-1-Notes/docs/04-cpp-and-visual-studio-tour/01-cpp-and-visual-studio-tour.html#hello-c) we can use `cout` with the "put to" operator `<<` to write to the standard output stream, the console. There is also a standard error and logging output stream, `cerr` and `clog`.

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

<iframe height="550px" width="100%" src="https://repl.it/@stungeye/IOStream-Cout-With-Variables?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

⏳ Wait For It:
{: .label .label-blue}

In later sections we'll define I/O stream operations for our own user-defined types.
{: .d-inline-block }

## Reading User Keyboard Input

The keyboard is an input stream that we can access using `cin` and the "get from" `>>` operator.

The stream will process the submitted data once the user presses enter. The newline character is automatically discarded.

<iframe height="700px" width="100%" src="https://repl.it/@stungeye/IOStream-Cin?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

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
getline(cin, answer); // User inputs: Hello World
std::cout << answer;  // Outputs: Hello World
```

## String Streams and File Streams

⏳ Wait For It:
{: .label .label-blue}

In later sections we learn how to stream to/from RAM and to/from the file system.
{: .d-inline-block}

Streaming to data in and out of memory as a string is possible using the `<sstream>` header.

Streaming to and from files is done using the `<fstream>` header.

## Further Reading

- [Introduction to iostream @ learncpp.com](https://www.learncpp.com/cpp-tutorial/introduction-to-iostream-cout-cin-and-endl/)
- [Basic Input / Output @ cplusplus.com](https://www.cplusplus.com/doc/tutorial/basic_io/)
