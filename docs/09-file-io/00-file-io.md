---
title: File I/O
nav_order: 9
---

# File I/O

TBW

## Objectives

Upon completion of this module, you should be able to:

TBW

## File Streams

File I/O is based on the stream-base I/O we learned about [the console I/O section](/Programming-1-Notes/docs/05-introduction-to-cpp/04-console-input-output.html).

Let's start by reviewing the stream hierarchy:

![Stream Class Hierarchy](/Programming-1-Notes/docs/05-introduction-to-cpp/iostream.gif)

🎵 Note:
{: .label .label-yellow}

The `fstream` header is required to use the `ifstream`, `fstream`, and `ofstream` classes.
{: .d-inline-block}

## Opening File Streams

Unlike `cout` and `cin` which are available for streaming by default, we need to first open files before we can stream to/from them:

```cpp
#include <fstream>

int main() {
  std::ofstream outputFile{"output-filename.txt"};
  std::ifstream inputFile{"input-filename.txt"};
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

## Writing To A File

To write to a file we use the insertion operator: `<<`

<iframe height="720px" width="100%" src="https://replit.com/@stungeye/Writing-to-a-File?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Reading From a File

To read from a file we can use the extraction operator `>>` along with the fact that the stream itself will return `0` if we've reached the end of the file (EOF):

<iframe height="625px" width="100%" src="https://replit.com/@stungeye/Reading-From-a-File?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

The `>>` uses the space and end-of-line characters as delimiters.
{: .d-inline-block}

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

## Reading a Line at a Time

We can use `std::getline()` to read one line at a time from an input stream. The newline character is not included in the read data.

<iframe height="625px" width="100%" src="https://replit.com/@stungeye/Reading-a-Line-at-a-Time-From-a-File?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Reading Basic Delimited Data

Imagine a simplified version of the CSV format that is simply comma-delimited integers:

<iframe height="750px" width="100%" src="https://replit.com/@stungeye/Reading-Simple-Delimited-Data?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

Using a C++17 "if initializer" on line 13.
{: .d-inline-block}

## Reading Structured Data

Recall in [our section on operator overloading](/Programming-1-Notes/docs/08-user-defined-types/04-operator-overloading.html#overloading-io-operators---input-stream) we created a `Money` class with custom i/o stream operators. Here's a version of that class being used to read in a file of dollar amounts, one per line, in the `$m.n` format (where m and n are integers):

<iframe height="750px" width="100%" src="https://replit.com/@stungeye/Structure-File-Reading-Money?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

For simplicity sake we're halting all file parsing if we encounter a badly formatted entry.
{: .d-inline-block}

## Random File Access

## Binary File Access

## SStream Streaming from RAM?

## Update the "wait for it" in console i/o section.
