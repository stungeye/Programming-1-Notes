---
title: Debugging and Common Mistakes
parent: Raylib Basics
nav_order: 7
---

<!-- prettier-ignore-start -->

# Debugging and Common Mistakes
{: .no_toc }

Interactive programs change dozens of times per second, so a bug can be difficult to observe. Use several debugging views: the C++ console, Raylib's log, text drawn in the window, and the Visual Studio debugger.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Debugging with `std::cout`

Include `<iostream>` and print a value when an event occurs:

```cpp
#include <iostream>

if (IsKeyPressed(KEY_SPACE)) {
    ++score;
    std::cout << "Score changed to " << score << '\n';
}
```

If your supplied project exposes a console, this message appears there. Printing every frame can create thousands of messages, hide the useful information, and slow the program. Prefer printing when a value changes or while investigating a short section of code.

## Raylib Logging with `TraceLog()`

`TraceLog()` uses Raylib's own log levels and `printf`-style placeholders:

```cpp
TraceLog(LOG_INFO, "Player position: %.1f, %.1f", player.x, player.y);

if (!FileExists("assets/scarfy.png")) {
    TraceLog(LOG_ERROR, "Missing texture: assets/scarfy.png");
}
```

Common levels are `LOG_DEBUG`, `LOG_INFO`, `LOG_WARNING`, and `LOG_ERROR`. Raylib also logs its own initialization, loading, and shutdown information, so read those messages when an asset or device fails.

## On-Screen Debug Information

Draw live values in the window when you need to see them beside the program:

```cpp
DrawText(TextFormat("Player: %.1f, %.1f", player.x, player.y),
         12, 12, 18, BLACK);
DrawText(TextFormat("Frame time: %.4f seconds", GetFrameTime()),
         12, 36, 18, BLACK);
DrawFPS(GetScreenWidth() - 95, 10);
```

Place debug drawing between `BeginDrawing()` and `EndDrawing()`, usually after the rest of the scene so it remains visible. On-screen values are replaced by the next frame, so use a log when you need a history.

You can also draw collision boundaries:

```cpp
DrawRectangleLinesEx(playerBounds, 2.0F, RED);
DrawCircleLinesV(targetPosition, targetRadius, LIME);
```

## The Visual Studio Debugger

A breakpoint pauses the program before a selected line runs. Click in the margin beside a line of code, then run the program with the debugger and perform the action that reaches that line.

While paused, you can:

- Inspect local variables by hovering over them.
- Add important expressions to a Watch window.
- Use **Step Over** (F10) to run the current line.
- Use **Step Into** (F11) to enter a function call.
- Use **Step Out** (Shift+F11) to finish the current function.
- Continue execution to the next breakpoint.

The window may appear frozen while the debugger has paused the main loop. This is expected: Raylib cannot process window events or draw another frame until execution continues.

## A Focused Debugging Process

When something goes wrong:

1. Reproduce the problem with the smallest reliable action.
2. Read compiler errors and Raylib log messages from the top; later errors may be side effects.
3. Check assumptions with one print, one on-screen value, or one breakpoint.
4. Decide whether the problem occurs during initialization, updating/input, drawing, or cleanup.
5. Reduce the program temporarily until the failing idea is isolated.
6. Fix the cause, then remove temporary debug output that runs every frame.

## Common Mistakes

### Drawing Outside the Drawing Pair

Put screen drawing between `BeginDrawing()` and `EndDrawing()`. Keep the pair balanced and call each once per normal frame.

### Loading an Asset Every Frame

Load textures, fonts, and sounds once before the loop. Loading inside the loop wastes time and leaks resources if earlier copies are not unloaded.

### Using the Wrong Cleanup Order

Unload textures, fonts, and render textures before `CloseWindow()`. Unload sounds before `CloseAudioDevice()`.

### Assuming an Asset Path Starts Beside the Source File

Relative paths begin at the process working directory. Log `GetWorkingDirectory()`, check `FileExists()`, and verify that the asset is copied where the running program expects it.

### Moving by a Fixed Amount Per Frame

`position.x += speed;` makes movement depend on frame rate. Use `position.x += speed * GetFrameTime();` when `speed` means pixels per second.

### Confusing Pressed with Down

Use `IsKeyPressed()` for one-time actions and `IsKeyDown()` for continuous actions. A held key is down for many frames but pressed for only one.

### Recreating State Inside the Loop

If `score`, `position`, or `paused` is declared inside the loop, it starts over every frame. Declare persistent state before the loop.

### Mixing Coordinate Spaces

When a `Camera2D` is active, screen-space mouse coordinates do not directly match world-space objects. Convert with `GetScreenToWorld2D()` before testing a world collision.

### Expecting Old Pixels to Stay On Screen

Normal animation clears and redraws every frame. Do not depend on skipped clearing for reliable trails or painting. Use a `RenderTexture2D` when pixels must persist; the examples page demonstrates this technique.

### Resources

- 📚 [Microsoft: First look at the Visual Studio debugger](https://learn.microsoft.com/en-us/visualstudio/debugger/debugger-feature-tour?view=visualstudio)
- 📚 [Microsoft: Debug C++ in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/debugger/getting-started-with-the-debugger-cpp?view=visualstudio)
- 📜 [Raylib 6.0 API header](https://github.com/raysan5/raylib/blob/6.0/src/raylib.h)
