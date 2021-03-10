---
title: User Input
parent: openFrameworks Basics
nav_order: 3
---

<!-- prettier-ignore-start -->

# User Input
{: .no_toc }

openFrameworks includes an event-driven system for responding to mouse and keyboard input.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Mouse Position and Input

The current x/y location of the mouse can be retrieved as follows:

```cpp
int mouseX = ofGetMouseX();
int mouseY = ofGetMouseY();
```

If you look through the `ofApp.cpp` and `ofApp.h` files you will see a number of predefined methods you can use to respond to mouse events as they happen:

- `void mouseMoved(int x, int y );`
- `void mouseDragged(int x, int y, int button);`
- `void mousePressed(int x, int y, int button);`
- `void mouseReleased(int x, int y, int button);`
- `void mouseEntered(int x, int y);`
- `void mouseExited(int x, int y);`

The value of the `button` parameter will be:

- `0` if the left button is pressed.
- `1` if the center button/wheel is pressed.
- `2` if the right button is pressed.

### Resources

- 📗 Details on these callbacks and their touch event equivalents: [`ofBaseApp` documentation](https://openframeworks.cc/documentation/application/ofBaseApp/).
- 📺 [Mouse Tutorial - Lewis Lepton on YouTube](https://www.youtube.com/watch?v=RFr5cM4m5XA&list=PL4neAtv21WOlqpDzGqbGM_WN2hc5ZaVv7&index=15) (5m04s)

## Keyboard Events

There are similar `keyPressed(int key)` and `keyReleased(int key)` callbacks available to handle keyboard events.

The `key` parameter can be compared with specific characters:

```cpp
void keyPressed(int key){
    if (key == 't'){
        // The t key was pressed.
    } else if (key == ' '){
        // The spacebar was pressed.
    }
}
```

There are constants available to test for the arrow keys, backspace, return, and other special non-character keys: `OF_KEY_BACKSPACE`, `OF_KEY_RETURN`, `OF_KEY_PRINTSCR`, `OF_KEY_F1` to `OF_KEY_F12`, `OF_KEY_LEFT`, `OF_KEY_UP`, `OF_KEY_RIGHT`, `OF_KEY_DOWN`, `OF_KEY_PAGE_UP`, `OF_KEY_PAGE_DOWN`, `OF_KEY_HOME`, `OF_KEY_END`, `OF_KEY_INSERT`

### Resources

- 📺 [Keyboard Tutorial - Lewis Lepton on YouTube](https://www.youtube.com/watch?v=3DHpmJAzas4&list=PL4neAtv21WOlqpDzGqbGM_WN2hc5ZaVv7&index=14) (5m57s)
