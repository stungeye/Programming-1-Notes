---
title: Text, Sound, and Resources
parent: Raylib Basics
nav_order: 5
---

<!-- prettier-ignore-start -->

# Text, Sound, and Resources
{: .no_toc }

Text communicates instructions and state, while sound gives immediate feedback. Both can be simple to use, but custom fonts and sounds are resources with lifetimes that your program must manage.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## The Default Font

`DrawText()` uses Raylib's built-in default font. Its position is the top-left corner of the text:

```cpp
DrawText("Hello, Raylib!", 40, 60, 30, DARKBLUE);
```

`MeasureText()` returns the width in pixels for that same default-font setup. This lets you centre text:

```cpp
const char* message{"LEVEL COMPLETE"};
constexpr int fontSize{40};
const int textWidth{MeasureText(message, fontSize)};

DrawText(message,
         (GetScreenWidth() - textWidth) / 2,
         80,
         fontSize,
         DARKGREEN);
```

`TextFormat()` creates a temporary formatted string that is convenient for small labels:

```cpp
DrawText(TextFormat("Score: %i", score), 20, 20, 24, BLACK);
```

Use `std::string` and normal C++ string-building tools when text must be stored or changed in more involved ways.

## Custom Fonts

The examples use [`assets/JOKERMAN.TTF`](assets/JOKERMAN.TTF). Copy the module's `assets` folder into the location expected by your course project.

Load a custom font after `InitWindow()`, draw it with `DrawTextEx()`, and unload it before `CloseWindow()`:

```cpp
Font headingFont{LoadFontEx("assets/JOKERMAN.TTF",
                            48, nullptr, 0)};

if (!IsFontValid(headingFont)) {
    TraceLog(LOG_ERROR, "Could not load the custom font");
    CloseWindow();
    return 1;
}

// Inside the drawing section of the main loop:
DrawTextEx(headingFont, "NEON ARCADE", Vector2{30.0F, 30.0F},
           48.0F, 2.0F, MAGENTA);

// After the main loop:
UnloadFont(headingFont);
CloseWindow();
```

The last two numeric arguments to `DrawTextEx()` are font size and character spacing, both in pixels. `MeasureTextEx()` returns a `Vector2` containing the measured width and height.

## Initializing Audio

The audio device is separate from the window. Initialize it before loading sounds:

```cpp
InitWindow(800, 450, "Sound Example");
InitAudioDevice();

Sound coin{LoadSound("assets/coin.wav")};
```

At shutdown, release resources first, then close the device that owns them:

```cpp
UnloadSound(coin);
CloseAudioDevice();
CloseWindow();
```

Do not close the audio device while a loaded `Sound` still depends on it.

## Playing and Controlling a Sound

These functions cover the most common sound controls:

```cpp
PlaySound(coin);                 // Start from the beginning.
StopSound(coin);                 // Stop playback.
PauseSound(coin);                // Pause at the current position.
ResumeSound(coin);               // Continue a paused sound.
SetSoundVolume(coin, 0.5F);      // 0.0 is silent; 1.0 is full volume.
SetSoundPitch(coin, 1.2F);       // 1.0 is the original pitch.

const bool playing{IsSoundPlaying(coin)};
```

`PlaySound()` is a natural match for `IsKeyPressed()` or a collision that occurs once. Calling it every frame while a key is held restarts the sound repeatedly.

## Complete Example: Sound and Type

This program uses the included [drum loop](assets/kammerin-hunt-drum-loop.mp3) and [custom font](assets/JOKERMAN.TTF):

```cpp
#include "raylib.h"
#include <algorithm>

int main() {
    InitWindow(450, 180, "Raylib - Sound and Type");
    InitAudioDevice();

    bool assetsLoaded{ true };
    float volume{ 1.0F };

    Font font{ LoadFontEx("assets/JOKERMAN.TTF", 48, nullptr, 0) };
    if (!IsFontValid(font)) {
        TraceLog(LOG_ERROR, "Could not load the custom font");
        assetsLoaded = false;
    }

    Sound loop{ LoadSound("assets/kammerin-hunt-drum-loop.mp3") };
    if (!IsSoundValid(loop)) {
        TraceLog(LOG_ERROR, "Could not load the drum loop");
        assetsLoaded = false;
    }

    while (!WindowShouldClose() && assetsLoaded) {
        if (IsKeyPressed(KEY_P)) PlaySound(loop);
        if (IsKeyPressed(KEY_S)) StopSound(loop);
        if (IsKeyPressed(KEY_SPACE)) {
            if (IsSoundPlaying(loop)) {
                PauseSound(loop);
            }
            else {
                ResumeSound(loop);
            }
        }

        if (IsKeyPressed(KEY_UP)) volume += 0.1F;
        if (IsKeyPressed(KEY_DOWN)) volume -= 0.1F;
        volume = std::clamp(volume, 0.0F, 1.0F);
        SetSoundVolume(loop, volume);

		const Color background{ IsSoundPlaying(loop) ? DARKGREEN : SKYBLUE };

        BeginDrawing();
        ClearBackground(background);

        DrawTextEx(font, "SOUND + TYPE", Vector2{ 20.0F, 20.0F },
            52.0F, 2.0F, RAYWHITE);
        DrawText("P: play   Space: pause/resume   S: stop",
            20, 90, 20, RAYWHITE);
        DrawText(TextFormat("Volume: %i%%  (up/down)",
            static_cast<int>(volume * 100.0F)),
            20, 130, 20, RAYWHITE);

        EndDrawing();
    }

    UnloadSound(loop);
    UnloadFont(font);
    CloseAudioDevice();
    CloseWindow();
}
```

## Resource-Lifetime Checklist

- Call `InitWindow()` before loading textures, fonts, or render textures.
- Call `InitAudioDevice()` before loading sounds.
- Check loaded resources with functions such as `IsTextureValid()`, `IsFontValid()`, and `IsSoundValid()`.
- Load once before the main loop. Do not load the same file every frame.
- Keep each resource alive while it is being used.
- Unload each successfully loaded resource exactly once.
- Unload graphics resources before `CloseWindow()`.
- Unload sounds before `CloseAudioDevice()`.

### Resources

- 📜 [Official custom font example](https://www.raylib.com/examples/text/loader.html?name=text_font_loading)
- 📜 [Official sound loading and playing example](https://www.raylib.com/examples/audio/loader.html?name=audio_sound_loading)
- 📜 [Official examples browser](https://www.raylib.com/examples.html) — filter by `text` or `audio`.
- `coin.wav` was created by Raylib author Ramon Santamaria using rFXGen and released under [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
- `kammerin-hunt-drum-loop.mp3` by [Kammerin Hunt on Pixabay](https://pixabay.com/users/kamhunt-27612606/).
