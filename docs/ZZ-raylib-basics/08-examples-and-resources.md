---
title: Examples and Resources
parent: Raylib Basics
nav_order: 8
---

<!-- prettier-ignore-start -->

# Examples and Resources
{: .no_toc }

The following complete programs combine the module's ideas into small projects. Type them, run them, and then make one deliberate change at a time.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Example One: Orb Collector

This 30-second game combines persistent state, frame-rate-independent movement, collision, random placement, text, and sound. Copy [`assets/coin.wav`](assets/coin.wav) into the `assets` folder expected by your project.

```cpp
#include "raylib.h"

#include <algorithm>
#include <array>

int main() {
    constexpr int screenWidth{900};
    constexpr int screenHeight{520};
    constexpr float playerSize{44.0F};
    constexpr float playerSpeed{300.0F};
    constexpr float orbRadius{17.0F};
    constexpr double roundLength{30.0};
    constexpr int backgroundStarCount{70};

    InitWindow(screenWidth, screenHeight, "Raylib - Orb Collector");
    InitAudioDevice();
    SetTargetFPS(60);

    Sound coin{LoadSound("assets/coin.wav")};
    if (!IsSoundValid(coin)) {
        TraceLog(LOG_ERROR, "Could not load assets/coin.wav");
        CloseAudioDevice();
        CloseWindow();
        return 1;
    }

    std::array<Vector2, backgroundStarCount> backgroundStars{};
    for (Vector2& star : backgroundStars) {
        star = Vector2{
            static_cast<float>(GetRandomValue(0, screenWidth)),
            static_cast<float>(GetRandomValue(0, screenHeight))
        };
    }

    Rectangle player{80.0F, screenHeight / 2.0F, playerSize, playerSize};
    Vector2 orb{700.0F, screenHeight / 2.0F};
    int score{0};
    double roundStart{GetTime()};

    while (!WindowShouldClose()) {
        const float deltaTime{GetFrameTime()};
        const double elapsed{GetTime() - roundStart};
        const double timeRemaining{roundLength - elapsed};
        const bool roundOver{timeRemaining <= 0.0};

        if (!roundOver) {
            float horizontal{0.0F};
            float vertical{0.0F};

            if (IsKeyDown(KEY_A) || IsKeyDown(KEY_LEFT)) horizontal -= 1.0F;
            if (IsKeyDown(KEY_D) || IsKeyDown(KEY_RIGHT)) horizontal += 1.0F;
            if (IsKeyDown(KEY_W) || IsKeyDown(KEY_UP)) vertical -= 1.0F;
            if (IsKeyDown(KEY_S) || IsKeyDown(KEY_DOWN)) vertical += 1.0F;

            player.x += horizontal * playerSpeed * deltaTime;
            player.y += vertical * playerSpeed * deltaTime;
            player.x = std::clamp(player.x, 0.0F, screenWidth - player.width);
            player.y = std::clamp(player.y, 64.0F, screenHeight - player.height);

            if (CheckCollisionCircleRec(orb, orbRadius, player)) {
                ++score;
                PlaySound(coin);
                orb = Vector2{
                    static_cast<float>(GetRandomValue(40, screenWidth - 40)),
                    static_cast<float>(GetRandomValue(90, screenHeight - 40))
                };
            }
        } else if (IsKeyPressed(KEY_R)) {
            score = 0;
            player.x = 80.0F;
            player.y = screenHeight / 2.0F;
            roundStart = GetTime();
        }

        BeginDrawing();
        ClearBackground(Color{8, 12, 30, 255});

        for (const Vector2& backgroundStar : backgroundStars) {
            DrawCircleV(backgroundStar, 1.5F, Fade(RAYWHITE, 0.55F));
        }

        DrawCircleGradient(orb, orbRadius * 2.3F,
                           Fade(GOLD, 0.28F), BLANK);
        DrawCircleV(orb, orbRadius, GOLD);
        DrawCircleV(Vector2{orb.x - 5.0F, orb.y - 5.0F}, 4.0F, RAYWHITE);

        DrawRectangleRounded(player, 0.35F, 6, SKYBLUE);
        DrawRectangleLinesEx(player, 3.0F, BLUE);

        DrawRectangle(0, 0, screenWidth, 64, Fade(BLACK, 0.55F));
        DrawText(TextFormat("Score: %i", score), 18, 17, 28, RAYWHITE);
        DrawText(TextFormat("Time: %02i",
                            static_cast<int>(timeRemaining > 0.0 ? timeRemaining : 0.0)),
                 screenWidth - 145, 17, 28, RAYWHITE);

        if (roundOver) {
            DrawRectangle(0, 0, screenWidth, screenHeight, Fade(BLACK, 0.72F));
            const char* result{TextFormat("You collected %i orbs!", score)};
            const int resultWidth{MeasureText(result, 38)};
            DrawText(result, (screenWidth - resultWidth) / 2, 205, 38, GOLD);
            DrawText("Press R to play again", 327, 260, 24, RAYWHITE);
        }

        EndDrawing();
    }

    UnloadSound(coin);
    CloseAudioDevice();
    CloseWindow();
    return 0;
}
```

Try normalizing diagonal movement, adding hazards, or increasing the player's speed as the score rises.

## Example Two: Persistent Neon Paint

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
