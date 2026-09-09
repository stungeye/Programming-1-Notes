---
title: Input, State, and Movement
parent: Raylib Basics
nav_order: 3
---

<!-- prettier-ignore-start -->

# Input, State, and Movement
{: .no_toc }

Raylib uses polling: during each trip through the main loop, your program asks what the keyboard and mouse are doing. The answers update state that persists into later frames.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## State Persists Between Frames

A variable created before the main loop remains alive while the loop runs. That makes it suitable for a player's position, a score, a colour, or whether a menu is open:

```cpp
Vector2 playerPosition{400.0F, 225.0F};
int score{0};
bool paused{false};

while (!WindowShouldClose()) {
    // These variables still contain the values assigned during earlier frames.
}
```

A variable declared inside the loop is recreated every frame. That is appropriate for temporary calculations such as the current `deltaTime`.

## Pressed, Down, Released, and Up

Raylib provides four keyboard questions with different meanings:

- `IsKeyPressed(KEY_SPACE)` is true for one frame when Space changes from up to down.
- `IsKeyDown(KEY_SPACE)` is true every frame while Space is held.
- `IsKeyReleased(KEY_SPACE)` is true for one frame when Space changes from down to up.
- `IsKeyUp(KEY_SPACE)` is true every frame while Space is not held.

Use **pressed** for a one-time action such as toggling pause. Use **down** for continuous movement:

```cpp
if (IsKeyPressed(KEY_P)) {
    paused = !paused;
}

if (IsKeyDown(KEY_RIGHT)) {
    playerPosition.x += 200.0F * GetFrameTime();
}
```

The mouse has matching functions: `IsMouseButtonPressed()`, `IsMouseButtonDown()`, `IsMouseButtonReleased()`, and `IsMouseButtonUp()`. Common button constants include `MOUSE_BUTTON_LEFT`, `MOUSE_BUTTON_RIGHT`, and `MOUSE_BUTTON_MIDDLE`.

## Mouse Position and Wheel

`GetMousePosition()` returns both coordinates in a `Vector2`:

```cpp
const Vector2 mousePosition{GetMousePosition()};
const float wheelMovement{GetMouseWheelMove()};
```

Mouse coordinates are screen coordinates unless you convert them through a camera. We will make that distinction on the camera page.

## Frame-Rate-Independent Movement

Suppose a player should move at 240 pixels per second. Moving 240 pixels every frame would be far too fast. Instead, multiply the speed by the duration of the frame:

```cpp
#include <algorithm>

constexpr float playerSpeed{240.0F};
const float deltaTime{GetFrameTime()};

if (IsKeyDown(KEY_D)) {
    playerPosition.x += playerSpeed * deltaTime;
}
```

At 60 FPS, a typical frame lasts about 1/60 of a second, so this adds about 4 pixels. If a frame takes twice as long, the movement for that frame is twice as large. The speed remains close to 240 pixels per second.

## Keeping an Object On Screen

`std::clamp(value, minimum, maximum)` from the C++ `<algorithm>` header restricts a number to a range. For a circular player:

```cpp
playerPosition.x = std::clamp(playerPosition.x, playerRadius,
                              GetScreenWidth() - playerRadius);
playerPosition.y = std::clamp(playerPosition.y, playerRadius,
                              GetScreenHeight() - playerRadius);
```

## Simple Collision Detection

Raylib includes helpers for common 2D collision tests:

```cpp
Rectangle player{40.0F, 60.0F, 50.0F, 50.0F};
Rectangle wall{300.0F, 100.0F, 120.0F, 80.0F};
Vector2 mouse{GetMousePosition()};

const bool rectanglesOverlap{CheckCollisionRecs(player, wall)};
const bool mouseOverWall{CheckCollisionPointRec(mouse, wall)};
const bool circlesOverlap{CheckCollisionCircles(
    Vector2{100.0F, 100.0F}, 30.0F,
    Vector2{140.0F, 120.0F}, 25.0F
)};
```

These functions answer whether shapes overlap. Your program decides what the collision means: stop movement, increase a score, play a sound, or change colour.

## Complete Example: Catch the Target

Move with WASD or the arrow keys. Touch the target to score, or click it with the mouse.

```cpp
#include "raylib.h"

#include <algorithm>

int main() {
    constexpr int screenWidth{800};
    constexpr int screenHeight{450};
    constexpr float playerSize{42.0F};
    constexpr float playerSpeed{260.0F};

    InitWindow(screenWidth, screenHeight, "Raylib - Catch the Target");
    SetTargetFPS(60);

    Rectangle player{80.0F, 200.0F, playerSize, playerSize};
    Rectangle target{600.0F, 180.0F, 34.0F, 34.0F};
    int score{0};
    bool paused{false};

    while (!WindowShouldClose()) {
        const float deltaTime{GetFrameTime()};

        if (IsKeyPressed(KEY_P)) {
            paused = !paused;
        }

        if (!paused) {
            float horizontalDirection{0.0F};
            float verticalDirection{0.0F};

            if (IsKeyDown(KEY_A) || IsKeyDown(KEY_LEFT)) horizontalDirection -= 1.0F;
            if (IsKeyDown(KEY_D) || IsKeyDown(KEY_RIGHT)) horizontalDirection += 1.0F;
            if (IsKeyDown(KEY_W) || IsKeyDown(KEY_UP)) verticalDirection -= 1.0F;
            if (IsKeyDown(KEY_S) || IsKeyDown(KEY_DOWN)) verticalDirection += 1.0F;

            // Moving on both axes makes diagonal movement about 41% faster.
            player.x += horizontalDirection * playerSpeed * deltaTime;
            player.y += verticalDirection * playerSpeed * deltaTime;

            player.x = std::clamp(player.x, 0.0F, screenWidth - player.width);
            player.y = std::clamp(player.y, 0.0F, screenHeight - player.height);

            const bool touched{CheckCollisionRecs(player, target)};
            const bool clicked{
                IsMouseButtonPressed(MOUSE_BUTTON_LEFT) &&
                CheckCollisionPointRec(GetMousePosition(), target)
            };

            if (touched || clicked) {
                ++score;
                target.x = static_cast<float>(GetRandomValue(40, screenWidth - 74));
                target.y = static_cast<float>(GetRandomValue(70, screenHeight - 74));
            }
        }

        BeginDrawing();
        ClearBackground(Color{245, 246, 250, 255});

        DrawRectangleRec(target, ORANGE);
        DrawRectangleLinesEx(target, 3.0F, MAROON);
        DrawRectangleRec(player, paused ? GRAY : BLUE);

        DrawText(TextFormat("Score: %i", score), 20, 18, 26, DARKGRAY);
        DrawText("Move: WASD/arrows   Pause: P   Or click the target",
                 20, screenHeight - 34, 18, GRAY);

        if (paused) {
            const char* message{"PAUSED"};
            const int fontSize{44};
            const int textWidth{MeasureText(message, fontSize)};
            DrawText(message, (screenWidth - textWidth) / 2,
                     screenHeight / 2 - fontSize / 2, fontSize, DARKGRAY);
        }

        EndDrawing();
    }

    CloseWindow();
    return 0;
}
```

### Resources

- 📜 [Official keyboard input example](https://www.raylib.com/examples/core/loader.html?name=core_input_keys)
- 📜 [Official mouse input example](https://www.raylib.com/examples/core/loader.html?name=core_input_mouse)
- 📜 [Official rectangle collision example](https://www.raylib.com/examples/shapes/loader.html?name=shapes_collision_area)
