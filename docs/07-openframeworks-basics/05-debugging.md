---
title: Debugging
parent: openFrameworks Basics
nav_order: 5
---

<!-- prettier-ignore-start -->

# Debugging
{: .no_toc }

There are four main ways to debug an openFrameworks application.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## `cout` Debugging

The easiest way to quickly debug a sketch is to use `cout` to output the state of your variables to the terminal window that opens along with your sketch.

_Downsides: The output can be overwhelming and will slow down your sketch._

## `ofLog` Debugging

The `ofLog` class is slightly more powerful than `cout` debugging as it allows for log levels and the possibility of writing log messages to a file.

_Downsides: Same as `cout` debugging._

## `drawString()` Debugging

This is similar to `cout` debuggging, but instead you use a true type font to draw the state of certain variables to the screen.

_Downsides: Variables state output in this way will be overwritten every frame._

## Breakpoint Debugging

You can add one or more breakpoints by clicking in the breakpoint column to the left of your code. The breakpoints will show as red circles and can be clicked again to be removed.

![A breakpoint set in Visual Studio](breakpoint.png)

The execution of your code will now pause when a breakpoint is reached. You can then step into (F11), step over (F10), and step out (Shift-F11) to walk through your code line by line. There are buttons for these step-types as well:

![Step Debugger UI](step-buttons.png)

The state of local variables is shown below. You can add your own variables to watch as well.

![Adding a Variable to Watch](watch.png)

### Resources

- 📙 [How to View the Value of an oF Variable](https://openframeworks.cc/learning/01_basics/how_to_view_value/)
- 📗 [Official `ofLog` Documentation](https://openframeworks.cc/documentation/utils/ofLog/)
- 📚 [First Look at the Visual Studio Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/debugger-feature-tour)
- 📚 [Learn to debug C++ code using Visual Studio](https://docs.microsoft.com/en-us/visualstudio/debugger/getting-started-with-the-debugger-cpp)
