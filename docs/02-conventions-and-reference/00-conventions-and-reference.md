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

Or will be embedded using a [repl.it](https://repl.it) or [Compiler Explorer](https://godbolt.org/) interactive C++ environment:

### Repl It

<iframe height="650px" width="100%" src="https://repl.it/@stungeye/Ghost-Quota?embed=true#main.cpp"></iframe>

### Compiler Explorer

<iframe width="800px" height="200px" src="https://godbolt.org/e#g:!((g:!((g:!((h:codeEditor,i:(filename:'1',fontScale:14,fontUsePx:'0',j:1,lang:c%2B%2B,selection:(endColumn:2,endLineNumber:14,positionColumn:2,positionLineNumber:14,selectionStartColumn:2,selectionStartLineNumber:14,startColumn:2,startLineNumber:14),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++int+ghostQuota+%3D+37%3B%0A++int+ghostsCaught+%3D+12%3B%0A%0A++if+(ghostsCaught+%3E+ghostQuota)+%7B%0A++++std::cout+%3C%3C+%22You+are+done+for+the+day.%5Cn%22%3B%0A++%7D+else+%7B%0A++++auto+ghostsRequired+%3D+ghostQuota+-+ghostsCaught%3B%0A++++std::cout+%3C%3C+%22You+need+to+find+%22+%3C%3C+ghostsRequired%3B%0A++++std::cout+%3C%3C+%22+more+ghosts.+%F0%9F%91%BB%5Cn%22%3B%0A++%7D%0A%7D'),l:'5',n:'1',o:'C%2B%2B+source+%231',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((g:!((h:compiler,i:(compiler:g102,filters:(b:'0',binary:'1',binaryObject:'1',commentOnly:'0',debugCalls:'1',demangle:'0',directives:'0',execute:'0',intel:'0',libraryCode:'1',trim:'1',verboseDemangling:'0'),flagsViewOpen:'1',fontScale:14,fontUsePx:'0',j:1,lang:c%2B%2B,libs:!((name:fmt,ver:'700')),options:'-O',overrides:!(),selection:(endColumn:1,endLineNumber:1,positionColumn:1,positionLineNumber:1,selectionStartColumn:1,selectionStartLineNumber:1,startColumn:1,startLineNumber:1),source:1),l:'5',n:'0',o:'+x86-64+gcc+10.2+(Editor+%231)',t:'0')),k:50,l:'4',m:50,n:'0',o:'',s:0,t:'0'),(g:!((h:output,i:(editorid:1,fontScale:14,fontUsePx:'0',j:1,wrap:'1'),l:'5',n:'0',o:'Output+of+x86-64+gcc+10.2+(Compiler+%231)',t:'0')),header:(),l:'4',m:50,n:'0',o:'',s:0,t:'0')),k:50,l:'3',n:'0',o:'',t:'0')),l:'2',n:'0',o:'',t:'0')),version:4"></iframe>
