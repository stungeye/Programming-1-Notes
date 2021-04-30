---
title: File I/O
nav_order: 9
---

<!-- prettier-ignore-start -->

# File I/O
{: .no_toc }

Most sufficiently complex application need to persist data. While databases are often used to persist complex hierarchical data, less complex data can be written to a text or binary file. In this module we'll explore the use of file streams for reading and writing files.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Objectives

Upon completion of this module, you should be able to:

- Open files for reading and writing using file streams.
- Create file streams for text and binary data.
- Write data to a text file using basic delimiter strategies.
- Use overloaded stream operators to read and write data to a text file.
- Read and write binary data sequentially and through random access.

## Reading and Writing Files

Questions you'll want to ask when reading and writing data to a file:

- Should the data be stored in a human-readable text format, or a binary format that will be much harder for a human to verify? (This decision may come down to speed or file-size requirements.)
- If a human-readable text format is desired, are you going to create your own custom format or use an established text format like CSV or JSON? (Except for the simplest data, an established format is preferred.)
- If you're storing binary data in text form, what encoding format will you use? (Ex. [Base64](https://en.wikipedia.org/wiki/Base64))
- If you're storing binary data, do you need to read data written by machines with different [binary endianness](https://en.wikipedia.org/wiki/Endianness)?

In the examples below we've explore simple text and binary storage without using established formats or worrying about endianness.

## File Streams

File I/O is based on the stream-base I/O we learned about [the console I/O section](/Programming-1-Notes/docs/05-introduction-to-cpp/04-console-input-output.html).

Let's start by reviewing the stream hierarchy:

![Stream Class Hierarchy](/Programming-1-Notes/docs/05-introduction-to-cpp/iostream.gif)

🎵 Note:
{: .label .label-yellow}

The `fstream` header is required to use the `ifstream`, `fstream`, and `ofstream` classes.
{: .d-inline-block}

## Opening File Streams

Unlike `cout` and `cin` which are available for streaming by default, we need to open files before we can stream to/from them.

```cpp
#include <fstream>

int main() {
  std::fstream  inOutFile{"in-out-filename.txt"};  // Default Mode: iso_base::in | iso_base::out
  std::ofstream outputFile{"output-filename.txt"}; // Default Mode: ios_base::out | iso_base::trunc
  std::ofstream appendFile{"append-filename.txt", std::iso_base::app}; // Append output, don't truncate file.
  std::ifstream inputFile{"input-filename.txt"};   // Default Mode: ios_base::in
}
```

## Check If Files Open Successfully

File streams can be tested as booleans to see if the file opened successfully:

```cpp
#include <fstream>
#include <iostream>

int main() {
  std::ofstream outputFile{"output-filename.txt"};
  if (!outputFile) {
    std::cerr << "Could not open output file.\n";
  }

  std::ifstream inputFile{"input-filename.txt"};
  if (!inputFile) {
    std::cerr << "Could not open input file.\n";
  }
}
```

## Closing Files

Files opened for input or output are automatically closed when their associated variable goes out of scope. They can also be manually closed earlier than this using the `.close()` method.

```cpp
#include <fstream>

int main() {
  std::ofstream outputFile{"output-filename.txt"};
  // Nah, changed my mind:
  outputFile.close();
}
```

## Writing To A Text File

To write to a file we use the insertion operator: `<<`

<iframe height="720px" width="100%" src="https://replit.com/@stungeye/Writing-to-a-File?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Reading From a Text File

To read from a file we can use the extraction operator `>>` along with the fact that the stream itself will return `0` if we've reached the end of the file (EOF):

<iframe height="625px" width="100%" src="https://replit.com/@stungeye/Reading-From-a-File?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

The `>>` uses the space and end-of-line characters as delimiters.
{: .d-inline-block}

## Reading a Line of Text at a Time

We can use `std::getline()` to read one line at a time from an input stream. The newline character is not included in the read data.

<iframe height="625px" width="100%" src="https://replit.com/@stungeye/Reading-a-Line-at-a-Time-From-a-File?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Reading Basic Delimited Text Data

When storing numbers to a file we need some way to keep numbers from getting combined. You don't want to write a `40` beside a `22` and have that read back in as `4022`.

Imagine a simplified version of the CSV format that is simply comma-delimited integers:

<iframe height="750px" width="100%" src="https://replit.com/@stungeye/Reading-Simple-Delimited-Data?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

Using a C++17 "if initializer" on line 13.
{: .d-inline-block}

## Simpler Delimited Text Data with Spaces

Reading delimited data is simplified with a space character delimiter, as the input stream will automatically consume the spaces.

<iframe height="625px" width="100%" src="https://replit.com/@stungeye/Reading-Space-Delimited-Data?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Reading Structured Text Data

Recall in [our section on operator overloading](/Programming-1-Notes/docs/08-user-defined-types/04-operator-overloading.html#overloading-io-operators---input-stream) we created a `Money` class with custom i/o stream operators.

With an overloaded `<<` operator for input streams we can easily read well-formatted files into vectors:

```cpp
// Open input stream:
std::ifstream inputFile{"input-file.txt"};
// Read all Money entries from the file into a vector:
std::vector<Money> bank{ // We can constructor vector an iterator:
  std::istream_iterator<Money>{inputFile},
  {} // Short form for the end of the iterator.
};
// Loop through the received Money entries:
for(Money money : bank) {
  std::cout << money << "\n";
}
```

Here's a version of the `Money` class used to read in a file of dollar amounts, one per line, in the `$m.n` format (where m and n are integers):

<iframe height="750px" width="100%" src="https://replit.com/@stungeye/Structure-File-Reading-Money?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

For simplicity sake we're halting all file parsing if we encounter a badly formatted entry.
{: .d-inline-block}

## Binary File Access

So far we've been reading and writing our data in text format. We can conserve space and potentially save time by writing in a binary format.

Let's start by writing strings to a binary file.

<iframe height="750px" width="100%" src="https://replit.com/@stungeye/Writing-a-Binary-File-of-Strings?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

If we were actually just saving strings to a file we may as well be using a text file.
{: .d-inline-block}

⏳ Wait For It:
{: .label .label-blue}

Note the use of pointers, which we'll cover in more detail in future sections.
{: .d-inline-block}

## Streaming Binary Structures

We can also write POD structs to a binary file, as in structs that only contain primitives or other POD structs. This process is often called serialization or marshalling

<iframe height="750px" width="100%" src="https://replit.com/@stungeye/Writing-a-Binary-File-of-Structs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

For more on PODs [see this StackOverflow response](https://stackoverflow.com/a/146589).
{: .d-inline-block}

## Vector Iterator Trick with Binary Data

Earlier we used an iterator to quickly fill a vector with input stream text data (parsed by an overloaded `<<`). We can use a similar trick to read in all a file full of binary data, if all we want are the raw bytes.

```cpp
std::ifstream inputFile("input.bin", std::ios::binary);
std::vector<std::byte> data{
  std::istreambuf_iterator<std::byte>(inputFile), // istreambuf iterator for binary data.
  {}
};
```

## Random File Access

So far with both our text and our binary files we've been writing and reading our data sequentially from the start of a file until the end. We can also perform what is called "random file access", not as in accessing random locations, but as in the ability to read/write to/from arbitrary locations within a file.

- With input streams we can move the internal read pointer within the file using: `if.seekg()`
- With output streams we can move the internal write pointer within the file using: `of.seekp()`

Movement performed with these functions is done relative to:

- The beginning of the file: `std::ios::beg`
- The current location within the file: `std::ios::cur`
- The eng of the file: `std::ios::end`

Assuming an `ifstream` named `if`:

```cpp
inf.seekg(0, std::ios::end); // move to end of file
inf.seekg(0, std::ios::beg); // move to beginning of file
inf.seekg(50, std::ios::beg); // Move to the 50th byte in the file.
inf.seekg(50, std::ios::cur); // Move forward 50 bytes from the current position to the 100th byte.
```

🎵 Note:
{: .label .label-yellow}

The `g` stands for "get" and the `p` stands for "put".
{: .d-inline-block}

## Random Access Example

<iframe height="800px" width="100%" src="https://replit.com/@stungeye/Random-Binary-File-Access?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Filesystem Library

Navigating the file system in an OS-agnostic manor is often required to:

- List files.
- Build file paths.
- Test for the existence of directory and files.
- Create directories and files.
- Copy, move, and delete directories and files.

As of C++17 we've had `<filesystem>` as part of the standard library. openFrameworks doesn't yet support C++17 projects, so [it includes a number of helper classes to work with the file system](https://openframeworks.cc/documentation/utils/).

## Further Reading

- [`<filesystem>` section of Stroustrup's Tour of C++](https://www.google.ca/books/edition/A_Tour_of_C++/jkRmDwAAQBAJ?hl=en&gbpv=1&pg=PT134&printsec=frontcover)
- [Filesystem Library Reference @ cppreference.com](https://en.cppreference.com/w/cpp/filesystem)
- [The Serialization and Unserialization FAQ @ isocpp.org](https://isocpp.org/wiki/faq/serialization)
- [Understanding Big and Little Endian Byte Order](https://betterexplained.com/articles/understanding-big-and-little-endian-byte-order/)
- [Swapping the Endian of Integers @ reddit/r/cpp](https://www.reddit.com/r/cpp_questions/comments/8f6hbu/writing_out_data_to_file_with_big_endian_order/dy1bvri/)
