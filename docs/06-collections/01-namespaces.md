---
title: Namespaces
parent: Collections of Data
nav_order: 1
---

<!--prettier-ignore-start-->
# Namespaces
{: .no_toc }

Namespaces provide a method for preventing name conflicts in large projects. 

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Name Collisions

By default, functions or classes defined in a C++ program become part of the _global namespace_. For large projects, especially those that use 3rd party libraries, there's a chance that multiple things get defined with the same name.

For example, you may define a `log()` function in your project and you might also include a library that defines a function called `log()`. This will cause the linker to fail during compilation as it will not know which `log()` function to use.

This type of conflict is called a _name collision_ or a _naming conflict_.

## Standard Namespace

When C++ was first created all of the identifiers in the standard library were defined in the global namespace. This lead to many name collisions. The solution was the creation of named scopes which are separate from each other and from the global namespace.

All of the standard library identifiers are now defined inside of the `std` (short for standard) namespace. This is why, for example, we use `std::cout` instead of `cout` when outputting to the console.

🎵 Note:
{: .label .label-yellow}

The two colons that come after the namespace are called the _scope resolution operator_.
{: .d-inline-block}

## Using Directives

You may come across code that includes the `using` directive, which instructs the compiler to look in specific namespaces by default:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello world!"; // cout no longer needs the std:: prefix.
}
```

💡 Best Practice:
{: .label .label-green }

Avoid the `using` directive and always explicitly use identifiers with their namespace.
{: .d-inline-block}

The `using` directive effectively adds namespaces to the global scope, which defeats the entire point of having namespaces.

## Scoped Using

A `using` directive can be scoped to a block of code such that it doesn't taint your entire code base:

```cpp
#include <iostream>

int main() {
  using namespace std; // We don't need to use the std:: prefix within main().
  int number;
  cout << "Pick a number: ";
  cin >> number;
  cout << "Hello " << number;
}
```

Although an improvement over a global `using` directive, this still isn't recommended.

## Namespace Aliases

If you feel tempted to use a `using` directive because of a namespace with a very long name, you can create a shorter alias for that namespace.

For example, let's say you're using a library with a `library.h` header file that includes a namespace called `supercalifragilisticexpialidocious`:

```cpp
#include "library.h"

int main() {
  supercalifragilisticexpialidocious::prepareBattleStations();
  supercalifragilisticexpialidocious::fireCannons();
  supercalifragilisticexpialidocious::scanPerimeter();
}
```

You can write the following instead;

```cpp
#include "library.h"

int main() {
  namespace supercali = supercalifragilisticexpialidocious;

  supercali::prepareBattleStations();
  supercali::fireCannons();
  supercali::scanPerimeter();
}
```

## User Defined Namespaces

You should get in the habit of creating your own namespaces when making your own internal libraries.

Here's the code [the function headers example](/Programming-1-Notes/docs/05-introduction-to-cpp/08-function-basics.html#functions-and-header-files) re-implemented with a namespace.

Navigate through the example files using the left pane “Files” explore:

<iframe height="600px" width="100%" src="https://repl.it/@stungeye/Function-and-Headers-With-Namespace?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

The `namespace` must be used in the header file and the associated cpp file.
{: .d-inline-block}
