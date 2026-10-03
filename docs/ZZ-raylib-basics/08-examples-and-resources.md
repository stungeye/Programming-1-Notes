---
title: Examples and Resources
parent: Raylib Basics
nav_order: 8
---

<!-- prettier-ignore-start -->

# Examples and Resources
{: .no_toc }

The following complete program combine the module's ideas into a small project. 

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Example Program: Persistent Neon Paint

Clearing the window every frame is correct for animation, but a painting program needs its marks to persist. A `RenderTexture2D` is an off-screen GPU drawing surface. This program draws marks into that texture, then displays the saved texture every frame.

```cpp
#include "raylib.h"

#include <algorithm>
#include <cmath>

int main() {
    constexpr int screenWidth{900};
    constexpr int screenHeight{520};

    InitWindow(screenWidth, screenHeight, "Raylib - Persistent Neon Paint");
    SetTargetFPS(60);

    RenderTexture2D canvas{LoadRenderTexture(screenWidth, screenHeight)};
    if (!IsRenderTextureValid(canvas)) {
        TraceLog(LOG_ERROR, "Could not create the render texture");
        CloseWindow();
        return 1;
    }

    BeginTextureMode(canvas);
    ClearBackground(Color{8, 10, 24, 255});
    EndTextureMode();

    Vector2 previousMouse{GetMousePosition()};
    float brushSize{18.0F};

    while (!WindowShouldClose()) {
        const Vector2 mouse{GetMousePosition()};
        brushSize += GetMouseWheelMove() * 2.0F;
        brushSize = std::clamp(brushSize, 3.0F, 60.0F);

        if (IsKeyPressed(KEY_C)) {
            BeginTextureMode(canvas);
            ClearBackground(Color{8, 10, 24, 255});
            EndTextureMode();
        }

        if (IsMouseButtonPressed(MOUSE_BUTTON_LEFT)) {
            previousMouse = mouse;
        }

        if (IsMouseButtonDown(MOUSE_BUTTON_LEFT)) {
            const float hue{
                static_cast<float>(std::fmod(GetTime() * 70.0, 360.0))
            };
            const Color brushColour{ColorFromHSV(hue, 0.78F, 1.0F)};

            BeginTextureMode(canvas);
            DrawLineEx(previousMouse, mouse, brushSize, Fade(brushColour, 0.72F));
            DrawCircleV(mouse, brushSize / 2.0F, brushColour);
            EndTextureMode();
        }

        previousMouse = mouse;

        BeginDrawing();
        ClearBackground(BLACK);

        Rectangle canvasSource{
            0.0F,
            0.0F,
            static_cast<float>(canvas.texture.width),
            -static_cast<float>(canvas.texture.height)
        };
        DrawTextureRec(canvas.texture, canvasSource, Vector2{0.0F, 0.0F}, WHITE);

        DrawRectangle(0, 0, screenWidth, 48, Fade(BLACK, 0.72F));
        DrawText("Hold left mouse to paint   Wheel: size   C: clear",
                 14, 13, 20, RAYWHITE);
        DrawCircleLinesV(mouse, brushSize / 2.0F, RAYWHITE);

        EndDrawing();
    }

    UnloadRenderTexture(canvas);
    CloseWindow();
    return 0;
}
```

Render textures use an inverted vertical orientation compared with normal screen drawing. The negative height in `canvasSource` flips the saved canvas into the expected orientation.

## Where to Go Next

- 📜 [Official interactive examples](https://www.raylib.com/examples.html) — filter by module or function name, and start with one-star examples.
- 📜 [Official Raylib 6.0 cheatsheet](https://www.raylib.com/cheatsheet/raylib_cheatsheet_v6.0.pdf) — a compact API reference.
- 📦 [Raylib 6.0 source and examples](https://github.com/raysan5/raylib/tree/6.0) — the authoritative source for signatures and behaviour.
- 📘 [Official Raylib wiki](https://github.com/raysan5/raylib/wiki) — platform notes, frequently asked questions, and technical guides.
- 📦 [Official Raylib game template](https://github.com/raysan5/raylib-game-template) — useful after you understand the single-file lifecycle taught here.
- 📚 [Raylib technologies community page](https://www.raylib.com/#community) — official links to the Raylib Discord, Reddit community, and other places to ask questions.

When studying an example, identify its initialization, update/input, drawing, and cleanup sections first. Then look up only the unfamiliar functions in the cheatsheet or the pinned 6.0 header.
