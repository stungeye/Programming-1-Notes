---
title: Structures
parent: User Defined Types
nav_order: 2
---

<!-- prettier-ignore-start -->

# Structures
{: .no_toc }

It is often handy to group related data together into a user-defined data structure. A simple way to do this in C++ is with a *structure*.


## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Why Structures

We normally reach for a structure when we notice that we are passing around the same set of data in many places within our program.

For example, we might notice that we are often passing around the x and y coordinate for a point in a 2D drawing program.

```cpp
void drawLine(int x1, int y1, int x2, int y2);
void drawTriangle(int x1, int y2, int x2, int y2, int x3, int y3);
```

It might be nice here to have a structure that represents a point with an x and y value.

```cpp
void drawLine(Point p1, Point p2);
void drawTriangle(Point p1, Point p2, Point p3);
```

We can now also return `Point`s from a function, something we couldn't do when we were working with separate x and y values.

```cpp
Point generateRandomPoint();
```

## Defining Structures

Structures are defined using the `struct` keyword:

```cpp
struct Point {
  int x;
  int y;
};
```

⚡ Warning:
{: .label .label-red}

Don't forget the semicolon after the close curly brace.
{: .d-inline-block}

## Using Structures and their Members

Let's define a variable using the point `struct` defined above. Notice that we can initialize the structure's members using an initializer list, and that the members can be publicly accessed and modified.

<iframe height="800px" width="100%" src="https://replit.com/@stungeye/Using-Structs?embed=true#main.cpp" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

🎵 Note:
{: .label .label-yellow}

Initializer lists provide values for struct members in the order in which they are defined.
{: .d-inline-block }

## Structures and Collections

Once a structure has been defined you can use it like any other type with collections like arrays and vectors.

```cpp
  std::vector<Point> polygon{ {0, 0}, {1, 12}, {12, 10}, {12, 5} };

  std::cout << "x: " << polygon[2].x  << " y: " << polygon[2].y << "\n"
```

## Structs and Class

We can add constructors, destructors, and other methods to `struct`s, at which point they start to look a lot like classes.

The truth is that there is little difference between a `struct` and a `class`. The difference is that if you don't specify the visibility of members (public, private, protected) they will default to public in a `struct` and default to private in a `class`.

💡 Best Practice:
{: .label .label-green }

Use `struct` for data-only structures and `class` for objects with data and behaviours.
{: .d-inline-block}

## Further Reading

- [The Real Difference Between Struct and Class @ Fluent CPP](https://www.fluentcpp.com/2017/06/13/the-real-difference-between-struct-class/)
- [Structs @ LearnCPP.com](https://www.learncpp.com/cpp-tutorial/structs/)
