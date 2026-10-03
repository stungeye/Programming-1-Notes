---
title: Getting Started
parent: Raylib Basics
nav_order: 1
---

<!-- prettier-ignore-start -->

# Getting Started
{: .no_toc }

A Raylib program owns its main loop. This explicit structure makes it easy to see what happens once and what happens during every frame.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Your Course Project

For this module, assume you have been given a working Visual Studio C++ project in which Raylib is already installed, linked, and ready to use. Course-specific project setup instructions will be provided separately.

Package installation, project creation, and linker configuration are intentionally outside the scope of these notes. You should be able to edit the project's main `.cpp` file, build it, and run it.

## A Minimal Raylib Program

Replace the contents of the project's main `.cpp` file with this complete program:

```cpp
#include "raylib.h"

int main() {
    constexpr int screenWidth{800};
    constexpr int screenHeight{450};

    InitWindow(screenWidth, screenHeight, "Hello, Raylib!");
    SetTargetFPS(60);

    while (!WindowShouldClose()) {
        // Update variables and respond to input here.

        BeginDrawing();
        ClearBackground(RAYWHITE);

        DrawText("Hello, Raylib!", 290, 210, 24, DARKBLUE);

        EndDrawing();
    }

    CloseWindow();
    return 0;
}
```

The program should open an 800 by 450 pixel window. It keeps drawing until you press Escape or click the window's close button.

## The Program Lifecycle

Most introductory Raylib programs have four stages:

1. **Initialization** happens once. Create the window, configure the target frame rate, initialize audio when needed, and load resources here.
2. **Update and input** happen once per frame. Read the keyboard or mouse, move objects, test collisions, and change stored state here.
3. **Drawing** happens once per frame between `BeginDrawing()` and `EndDrawing()`.
4. **Cleanup** happens once, after the loop. Unload resources and close the systems that created them.

`WindowShouldClose()` returns `true` when Raylib receives a close request. The `!` means "not," so the loop continues **while the window should not close**.

⚡ Keep the pair together:
{: .label .label-red}

Every call to `BeginDrawing()` must have one matching `EndDrawing()` in the same frame. Put drawing calls between them.
{: .d-inline-block}

## Clearing and Presenting a Frame

`BeginDrawing()` prepares Raylib to draw the next frame. `ClearBackground()` fills the entire window with one colour so pixels from the old frame do not remain. `EndDrawing()` finishes the frame and presents it in the window.

Unlike a framework with predefined callback methods, Raylib does not call your `update()` or `draw()` functions. The comments in the example mark conceptual sections of the loop. As a program grows, you may choose to move those sections into your own functions.

## Window Dimensions

The constants passed to `InitWindow()` set the initial client-area dimensions in pixels. You can ask for the current dimensions later:

```cpp
const int currentWidth{GetScreenWidth()};
const int currentHeight{GetScreenHeight()};
```

This is useful if the window may be resized. For a resizable window, call `SetConfigFlags(FLAG_WINDOW_RESIZABLE)` **before** `InitWindow()`.

## Frames and Time

`SetTargetFPS(60)` asks Raylib to limit the program to approximately 60 frames per second. It is a target, not a promise: a slow computer or expensive frame can take longer.

Raylib provides several useful timing functions:

```cpp
const int framesPerSecond{GetFPS()};
const float deltaTime{GetFrameTime()}; // Seconds taken by the previous frame.
const double elapsedTime{GetTime()};   // Seconds since InitWindow().
```

`GetFrameTime()` is often called **delta time**. We will multiply movement speed by delta time so an object moves approximately the same distance per second on fast and slow computers.

`GetTime()` is useful for repeating animation such as a pulsing radius:

```cpp
#include <cmath> // Place this with the other includes, above main().

const float radius{30.0F + 8.0F * static_cast<float>(std::sin(GetTime() * 3.0))};
DrawCircle(GetScreenWidth() / 2, GetScreenHeight() / 2, radius, SKYBLUE);
```

## Cleanup Order

`CloseWindow()` releases the window and graphics context. Any resource that depends on that graphics context, such as a texture, font, or render texture, must be unloaded **before** `CloseWindow()`.

A useful rule is: clean up in the reverse order that you initialized and loaded things.

### Resources

- 📜 [Official basic window example](https://www.raylib.com/examples/core/loader.html?name=core_basic_window)
- 📜 [Raylib 6.0 `raylib.h`](https://github.com/raysan5/raylib/blob/6.0/src/raylib.h)
- 📜 [Official examples browser](https://www.raylib.com/examples.html) — choose the `core` filter.
