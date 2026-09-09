---
title: Drawing Shapes
parent: Raylib Basics
nav_order: 2
---

<!-- prettier-ignore-start -->

# Drawing Shapes
{: .no_toc }

Raylib includes focused functions for drawing common 2D shapes. We will use them to learn coordinates, colours, useful data types, and a few simple animation techniques.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## The Screen Coordinate System

Think of the window as a grid of pixels:

- `(0, 0)` is at the top-left corner.
- x values increase as you move right.
- y values increase as you move down.

The lower-right boundary is `(GetScreenWidth(), GetScreenHeight())`; the final visible pixel is one less on each axis. An object can use coordinates outside the window, but the off-screen part will not be visible.

Raylib drawing functions use either individual coordinates or small structures. A `Vector2` stores an x/y pair:

```cpp
Vector2 centre{400.0F, 225.0F};
```

A `Rectangle` stores its top-left position followed by its width and height:

```cpp
Rectangle panel{40.0F, 50.0F, 240.0F, 120.0F};
```

The `F` suffix makes a number a `float`, which matches the fields in these Raylib types.

## Colours and Alpha

Raylib defines many ready-to-use `Color` constants, including `RAYWHITE`, `BLACK`, `RED`, `ORANGE`, `LIME`, `SKYBLUE`, `DARKBLUE`, and `PURPLE`.

You can also create a colour from red, green, blue, and alpha values. Each component ranges from 0 to 255:

```cpp
Color coral{255, 110, 95, 255};       // Fully opaque.
Color glassBlue{40, 120, 255, 100};   // Partly transparent.
```

Alpha is opacity: 0 is invisible and 255 is fully opaque. Transparent drawing blends with pixels already drawn in the current frame, so draw backgrounds first and translucent foreground objects later.

`Fade()` is a convenient way to change a colour's alpha using a value from 0.0 to 1.0:

```cpp
DrawCircle(200, 120, 60.0F, Fade(VIOLET, 0.4F));
```

## Filled and Outlined Shapes

Raylib uses separate functions for filled and outlined shapes:

```cpp
DrawPixel(20, 20, BLACK);
DrawCircle(100, 90, 40.0F, GOLD);
DrawCircleLines(100, 90, 45.0F, ORANGE);

DrawRectangle(180, 50, 120, 80, SKYBLUE);
DrawRectangleLines(180, 50, 120, 80, DARKBLUE);

Rectangle card{340.0F, 50.0F, 150.0F, 80.0F};
DrawRectangleRec(card, LIME);
DrawRectangleLinesEx(card, 4.0F, DARKGREEN);

DrawTriangle(Vector2{560.0F, 50.0F},
             Vector2{520.0F, 130.0F},
             Vector2{600.0F, 130.0F},
             PINK);
DrawTriangleLines(Vector2{560.0F, 50.0F},
                  Vector2{520.0F, 130.0F},
                  Vector2{600.0F, 130.0F},
                  MAROON);
```

The order of a triangle's points matters. Raylib expects them counter-clockwise for a filled triangle when back-face culling is enabled by the drawing system. If a triangle does not appear, swap two points.

Other useful choices include `DrawEllipse()`, `DrawEllipseLines()`, `DrawPoly()`, and `DrawRing()`.

## Lines and Thickness

`DrawLine()` uses integer coordinates and draws a thin line. `DrawLineEx()` accepts `Vector2` endpoints and a thickness:

```cpp
Vector2 start{80.0F, 220.0F};
Vector2 end{360.0F, 310.0F};

DrawLineEx(start, end, 8.0F, DARKPURPLE);
DrawLineV(Vector2{400.0F, 220.0F}, Vector2{700.0F, 310.0F}, GRAY);
```

## Position, Origin, and Rotation

Many basic drawing functions use the top-left corner as their position. `DrawRectanglePro()` adds an origin and a clockwise rotation in degrees:

```cpp
Rectangle rectangle{400.0F, 225.0F, 180.0F, 70.0F};
Vector2 origin{rectangle.width / 2.0F, rectangle.height / 2.0F};

DrawRectanglePro(rectangle, origin, 25.0F, BLUE);
```

Here, `(400, 225)` is where the rectangle's **origin** will be placed. The origin is halfway across and down the rectangle, so it rotates around its centre. This is usually clearer than changing a global matrix stack.

## Random Values

`GetRandomValue(minimum, maximum)` returns an inclusive random integer. Randomness is useful for generative art, particles, varied colours, and game behaviour:

```cpp
const int randomX{GetRandomValue(0, GetScreenWidth() - 1)};
const int randomY{GetRandomValue(0, GetScreenHeight() - 1)};
const int randomRadius{GetRandomValue(3, 12)};
DrawCircle(randomX, randomY, static_cast<float>(randomRadius), GOLD);
```

## Complete Example: Orbiting Shapes

This program combines elapsed time, vectors, transparency, thick lines, and rotated rectangles:

`std::sin()` and `std::cos()` take angles in radians, while `DrawRectanglePro()` takes a rotation in degrees. We use separate speeds for the satellite's orbit and the rectangle's rotation, with each speed's units noted below.

```cpp
#include "raylib.h"

#include <cmath>

int main() {
    constexpr int screenWidth{900};
    constexpr int screenHeight{520};
    constexpr float orbitRadius{150.0F};
    constexpr float orbitSpeed{1.0F};    // Radians per second.
    constexpr float rotationSpeed{70.0F}; // Degrees per second.

    InitWindow(screenWidth, screenHeight, "Raylib - Orbiting Shapes");
    SetTargetFPS(60);

    while (!WindowShouldClose()) {
        const float elapsedTime{static_cast<float>(GetTime())};
        const float orbitAngle{elapsedTime * orbitSpeed}; // Radians.
        const float rotationAngle{elapsedTime * rotationSpeed}; // Degrees.
        const Vector2 centre{screenWidth / 2.0F, screenHeight / 2.0F};
        const Vector2 satellite{
            centre.x + std::cos(orbitAngle) * orbitRadius,
            centre.y + std::sin(orbitAngle) * orbitRadius
        };

        BeginDrawing();
        ClearBackground(Color{10, 14, 32, 255});

        DrawCircleV(centre, orbitRadius + 35.0F, Fade(DARKBLUE, 0.45F));
        DrawCircleLinesV(centre, orbitRadius, Fade(SKYBLUE, 0.55F));
        DrawLineEx(centre, satellite, 3.0F, Fade(RAYWHITE, 0.35F));

        DrawCircleV(centre, 44.0F, GOLD);
        DrawCircleV(satellite, 22.0F, PINK);

        Rectangle panel{satellite.x, satellite.y, 78.0F, 24.0F};
        DrawRectanglePro(panel, Vector2{39.0F, 12.0F}, rotationAngle, VIOLET);

        DrawText("Orbiting Shapes", 24, 22, 28, RAYWHITE);
        DrawFPS(screenWidth - 100, 20);

        EndDrawing();
    }

    CloseWindow();
    return 0;
}
```

Try changing the orbit radius, orbit speed, rotation speed, colours, or shape sizes. Then add a second satellite that uses `-orbitAngle` in both trigonometric functions to orbit in the opposite direction.

### Resources

- 📜 [Official basic shapes example](https://www.raylib.com/examples/shapes/loader.html?name=shapes_basic_shapes)
- 📜 [Official rectangle scaling and rotation example](https://www.raylib.com/examples/shapes/loader.html?name=shapes_rectangle_scaling)
- 📜 [Official examples browser](https://www.raylib.com/examples.html) — choose the `shapes` filter.
