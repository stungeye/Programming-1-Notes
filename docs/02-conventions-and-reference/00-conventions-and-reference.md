---
title: Conventions and RTFM
nav_order: 2
---

<!-- prettier-ignore-start -->

# Conventions and The Friendly Manual(s)
{: .no_toc }

The conventions you can expect and the reference materials you can count on.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## RTFM

_"Learning to program is an iterative, systematic process of eliminating magic."_ -- [source](https://sigpwned.com/2012/04/12/learning-to-program/)

And how does one eliminate magic? By learning to **R**ead **T**he **F**riendly **M**anual.

These notes are to be considered the manual for this course. Reference these notes first before turning to Google or Stack Overflow.

## Secondary Sources

These secondary sources should also be considered manuals you should consult before Goolging:

- [CppReference.com](https://en.cppreference.com/w/) - Great reference for all things C++. Editable by the community as a wiki.
- [CPlusPlus.com](https://www.cplusplus.com/reference/) - Check here if you need a "second opinion" from ☝️.
- [LearnCpp.com](https://www.learncpp.com/) - Giant detailed tutorial for learning all of C++.
- [openFrameworks Reference](https://openframeworks.cc/documentation/) - Official API documentation for core classes and functions.
- [openFrameworks Learning](https://openframeworks.cc/learning/) - Official tutorials and the openFrameworks ebook.
- [openFrameworks Forum](https://forum.openframeworks.cc/) - Friendly place to ask questions or search for know problems.

## Help Improve These Notes

You can help improve these notes in three ways:

1. If there are topics you feel are missing from these notes please inform your instructor.
2. Anytime you come here looking for an answer that you then cannot find, email <a href="mailto:kgeske@rrc.ca">kgeske@rrc.ca</a>.
3. You can submit a pull request to fix typos, debug code samples, and update explanations using the "Edit this page on Github" link at the bottom of every page.

## Documentation Conventions

Through the notes you will see the following three types of labels.

🎵 Note:
{: .label .label-yellow}

Notes add important information you don't want to miss.

⚡ Warning:
{: .label .label-red}

Warnings are provided to prepare you for common bugs and "gotchas".

💡 Best Practice:
{: .label .label-green }

Best practices used in industry will also be highlighted.

⏳ Wait For It:
{: .label .label-blue}

Sometimes you just need to wait until later in the notes to learn more. :)

## Code Conventions

Source code in the notes will be syntax highlighted like so:

```cpp
#include <iostream>

int main() {
  int ghostQuota = 37;
  int ghostsCaught = 12;

  if (ghostsCaught > ghostQuota) {
    std::cout << "You are done for the day.\n";
  } else {
    auto ghostsRequired = ghostQuota - ghostsCaught;
    std::cout << "You need to find " << ghostsRequired << " more ghosts. 👻\n";
  }
}
```

## Run Code Samples in Your Browser

Code blocks that include an `int main()` entry point include a link to run the code in your browser using [Compiler Explorer](https://godbolt.org/).

Try clicking the "🚀 Run on Compiler Explorer" link at the bottom of the above code block.

If you don't see a link, let Kyle know by [submitting an issue](https://github.com/stungeye/Programming-1-Notes/issues).
