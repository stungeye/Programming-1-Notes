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

## Complete Example: WASD RACER

Move with WASD. How many targets can you hit before time runs out?

```cpp
#include "raylib.h"
#include <algorithm> // std::min, std::clamp
#include <cmath>     // std::ceil

int main() {
    constexpr float playerSpeed{ 260.0F };
    constexpr float targetMoveInterval{ 3.0F };
    constexpr float gameDuration{ 30.0F };

    InitWindow(800, 450, "WASD RACER");
    SetTargetFPS(60);

    Rectangle player{ 80.0F, 200.0F, 42.0F, 42.0F };
    Rectangle target{ 600.0F, 200.0F, 34.0F, 34.0F };
    int score{ 0 };
    float moveRemaining{ targetMoveInterval };
    float gameRemaining{ gameDuration };
    bool started{ false };

    while (!WindowShouldClose()) {
        if (IsKeyPressed(KEY_R)) {
            player = { 80.0F, 200.0F, 42.0F, 42.0F };
            target = { 600.0F, 180.0F, 34.0F, 34.0F };
            score = 0;
            moveRemaining = targetMoveInterval;
            gameRemaining = gameDuration;
            started = false;
        }

        const int horizontal{ IsKeyDown(KEY_D) - IsKeyDown(KEY_A) };
        const int vertical{ IsKeyDown(KEY_S) - IsKeyDown(KEY_W) };
        if (horizontal || vertical) started = true;

        if (started && gameRemaining > 0.0F) {
            const float deltaTime{ std::min(GetFrameTime(), gameRemaining) };
            gameRemaining -= deltaTime;
            moveRemaining -= deltaTime;

            // WARNING: Diagonal movement is faster than it should be!
            player.x += horizontal * playerSpeed * deltaTime;
            player.y += vertical * playerSpeed * deltaTime;
            player.x = std::clamp(player.x, 0.0F, GetScreenWidth() - player.width);
            player.y = std::clamp(player.y, 0.0F, GetScreenHeight() - player.height);

            const bool caught{ CheckCollisionRecs(player, target) };
            if (caught || moveRemaining <= 0.0F) {
                if (caught) ++score;
                moveRemaining = targetMoveInterval;
                target.x = static_cast<float>(GetRandomValue(target.width, GetScreenWidth() - target.width));
                target.y = static_cast<float>(GetRandomValue(target.height, GetScreenHeight() - target.height));
            }
        }

        BeginDrawing();
        ClearBackground(LIGHTGRAY);
        DrawRectangleRec(target, ORANGE);
        DrawRectangleLinesEx(target, 3.0F, MAROON);
        DrawRectangleRec(player, BLUE);

        const char* countdown{ TextFormat("%i", static_cast<int>(std::ceil(moveRemaining))) };
        DrawText(countdown,
            static_cast<int>(target.x + (target.width - MeasureText(countdown, 18)) / 2),
            static_cast<int>(target.y + (target.height - 18) / 2), 18, MAROON);
        DrawText(TextFormat("Score: %i | Time: %.2f%s", score,
            gameRemaining,
            gameRemaining <= 0.0F ? " | Game over!" : ""), 20, 18, 26, DARKGRAY);
        DrawText(started ? "Move: WASD/arrows | Restart: R" : "Move to start: WASD/arrows",
            20, GetScreenHeight() - 34, 18, GRAY);
        EndDrawing();
    }

    CloseWindow();
}
```

### Resources

- 📜 [Official keyboard input example](https://www.raylib.com/examples/core/loader.html?name=core_input_keys)
- 📜 [Official mouse input example](https://www.raylib.com/examples/core/loader.html?name=core_input_mouse)
- 📜 [Official rectangle collision example](https://www.raylib.com/examples/shapes/loader.html?name=shapes_collision_area)
