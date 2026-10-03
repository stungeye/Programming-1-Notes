---
title: Raylib Basics
has_children: true
nav_order: 7
---

# Raylib Basics

[Raylib](https://www.raylib.com/) is a free, open-source library for making games, visual experiments, tools, and other interactive programs. It gives us a small, approachable C API for windows, 2D drawing, input, images, text, and sound. We will call that API directly from C++.

These notes target **Raylib 6.0**, the latest stable release when this module was written. Using a stated version gives every example a clear baseline. Raylib's official [6.0 release](https://github.com/raysan5/raylib/releases/tag/6.0) was published on April 23, 2026.

## Objectives

Upon completion of this module, you should be able to:

- Explain the initialization, update, drawing, and cleanup stages of a Raylib program.
- Create a window and run a frame-based main loop until the user closes it.
- Use frame time and elapsed time to animate at a predictable speed.
- Draw coloured 2D shapes, lines, text, and textures.
- Store program state and update it using polled mouse and keyboard input.
- Move objects independently of frame rate and test simple 2D collisions.
- Load, draw, and unload textures and custom fonts.
- Initialize audio, control sounds, and release audio resources safely.
- Animate a sprite sheet using source and destination rectangles.
- Use a `Camera2D` to separate screen coordinates from world coordinates.
- Debug with console output, Raylib logging, on-screen information, and the Visual Studio debugger.
- Combine these techniques into small, complete interactive programs.

## Linked Resources

Linked resources will be identified with the following emoji:

- 📺: Video.
- 📜: Official Raylib reference, cheatsheet, or example.
- 📘: Official guide or wiki page.
- 🔰: Beginner tutorial or learning resource.
- 📚: Other online tutorial, guide, or article.
- 📦: Source code repository.

Raylib's header file is its most precise API reference. The searchable [official cheatsheet](https://www.raylib.com/cheatsheet/cheatsheet.html) and [official examples](https://www.raylib.com/examples.html) make that reference easier to explore.
