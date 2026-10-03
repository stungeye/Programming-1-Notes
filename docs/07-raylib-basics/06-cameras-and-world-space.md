---
title: Cameras and World Space
parent: Raylib Basics
nav_order: 6
---

<!-- prettier-ignore-start -->

# Cameras and World Space
{: .no_toc }

A `Camera2D` lets a world be larger than the window. Instead of changing every object's coordinates, you describe which part of the world the camera should show.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Screen Space and World Space

So far, drawing coordinates have been in **screen space**: `(0, 0)` is the current window's top-left corner.

A scrolling program also has **world space**. A tree might remain at world position `(1200, 300)` while the camera moves. Its screen position changes, but its world position does not.

Use `BeginMode2D(camera)` and `EndMode2D()` inside the normal drawing pair:

```cpp
BeginDrawing();
ClearBackground(RAYWHITE);

BeginMode2D(camera);
// Draw world objects here.
EndMode2D();

// Draw fixed screen-space interface elements here.
EndDrawing();
```

## The `Camera2D` Fields

`Camera2D` has four fields:

```cpp
Camera2D camera{};
camera.target = Vector2{400.0F, 300.0F};
camera.offset = Vector2{GetScreenWidth() / 2.0F,
                        GetScreenHeight() / 2.0F};
camera.rotation = 0.0F;
camera.zoom = 1.0F;
```

- `target` is the world position the camera follows.
- `offset` is where that target appears on screen. Half the screen width and height centres it.
- `rotation` rotates the world clockwise in degrees.
- `zoom` is a scale factor. `1.0F` is normal size, `2.0F` is twice as large, and `0.5F` is half size.

## Converting Coordinates

The mouse position starts in screen space. Convert it before comparing it with world objects:

```cpp
const Vector2 mouseScreen{GetMousePosition()};
const Vector2 mouseWorld{GetScreenToWorld2D(mouseScreen, camera)};
```

`GetWorldToScreen2D()` performs the opposite conversion. These functions are especially useful for selecting, placing, or labelling world objects.

## Complete Example: Explore a 2D World

Move the camera with WASD or the arrow keys and zoom with the mouse wheel. The crosshair shows the mouse's world position.

```cpp
#include "raylib.h"

#include <algorithm>

int main() {
    constexpr int screenWidth{900};
    constexpr int screenHeight{520};
    constexpr float cameraSpeed{360.0F};
    constexpr int gridSpacing{100};
    constexpr int worldExtent{1200};

    InitWindow(screenWidth, screenHeight, "Raylib - Camera2D Explorer");
    SetTargetFPS(60);

    Camera2D camera{};
    camera.target = Vector2{0.0F, 0.0F};
    camera.offset = Vector2{screenWidth / 2.0F, screenHeight / 2.0F};
    camera.rotation = 0.0F;
    camera.zoom = 1.0F;

    while (!WindowShouldClose()) {
        const float deltaTime{GetFrameTime()};

        if (IsKeyDown(KEY_A) || IsKeyDown(KEY_LEFT)) {
            camera.target.x -= cameraSpeed * deltaTime / camera.zoom;
        }
        if (IsKeyDown(KEY_D) || IsKeyDown(KEY_RIGHT)) {
            camera.target.x += cameraSpeed * deltaTime / camera.zoom;
        }
        if (IsKeyDown(KEY_W) || IsKeyDown(KEY_UP)) {
            camera.target.y -= cameraSpeed * deltaTime / camera.zoom;
        }
        if (IsKeyDown(KEY_S) || IsKeyDown(KEY_DOWN)) {
            camera.target.y += cameraSpeed * deltaTime / camera.zoom;
        }

        camera.zoom += GetMouseWheelMove() * 0.1F;
        camera.zoom = std::clamp(camera.zoom, 0.25F, 3.0F);

        if (IsKeyPressed(KEY_R)) {
            camera.target = Vector2{0.0F, 0.0F};
            camera.zoom = 1.0F;
        }

        const Vector2 mouseWorld{
            GetScreenToWorld2D(GetMousePosition(), camera)
        };

        BeginDrawing();
        ClearBackground(Color{236, 239, 244, 255});

        BeginMode2D(camera);

        for (int coordinate{-worldExtent}; coordinate <= worldExtent;
             coordinate += gridSpacing) {
            DrawLine(coordinate, -worldExtent, coordinate, worldExtent, LIGHTGRAY);
            DrawLine(-worldExtent, coordinate, worldExtent, coordinate, LIGHTGRAY);
        }

        DrawLine(-worldExtent, 0, worldExtent, 0, RED);
        DrawLine(0, -worldExtent, 0, worldExtent, BLUE);

        DrawCircle(350, 180, 70.0F, GOLD);
        DrawRectangle(-520, -260, 180, 130, VIOLET);
        DrawRectangleLinesEx(Rectangle{-520.0F, -260.0F, 180.0F, 130.0F},
                             8.0F, DARKPURPLE);

        DrawCircleLinesV(mouseWorld, 12.0F / camera.zoom, DARKGREEN);
        DrawLineEx(Vector2{mouseWorld.x - 18.0F / camera.zoom, mouseWorld.y},
                   Vector2{mouseWorld.x + 18.0F / camera.zoom, mouseWorld.y},
                   2.0F / camera.zoom, DARKGREEN);
        DrawLineEx(Vector2{mouseWorld.x, mouseWorld.y - 18.0F / camera.zoom},
                   Vector2{mouseWorld.x, mouseWorld.y + 18.0F / camera.zoom},
                   2.0F / camera.zoom, DARKGREEN);

        EndMode2D();

        DrawRectangle(0, 0, screenWidth, 72, Fade(BLACK, 0.78F));
        DrawText("Move: WASD/arrows   Zoom: wheel   Reset: R",
                 18, 12, 22, RAYWHITE);
        DrawText(TextFormat("Camera (%.0f, %.0f)  Mouse world (%.0f, %.0f)  Zoom %.2f",
                            camera.target.x, camera.target.y,
                            mouseWorld.x, mouseWorld.y, camera.zoom),
                 18, 42, 17, LIGHTGRAY);

        EndDrawing();
    }

    CloseWindow();
    return 0;
}
```

The grid and world objects move because they are drawn between `BeginMode2D()` and `EndMode2D()`. The dark information panel stays fixed because it is drawn afterward in screen space.

### Resources

- 📜 [Official 2D camera example](https://www.raylib.com/examples/core/loader.html?name=core_2d_camera)
- 📜 [Official mouse-zoom 2D camera example](https://www.raylib.com/examples/core/loader.html?name=core_2d_camera_mouse_zoom)
