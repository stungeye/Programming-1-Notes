---
title: Images, Text, and Sound
parent: openFrameworks Basics
nav_order: 4
---

<!-- prettier-ignore-start -->

# Images, Text, and Sound 
{: .no_toc }

This section will demonstrate how to display images, render text, and play sounds.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## Persistent Variables

The variables we've dealt with so far have been function parameters and local variables, both of which go out of scope after each frame. To preserve state across frames we can add `private` properties to the ofApp class as defined in the `ofApp.h` header file.

Primitive properties will be initially assigned zero, but can be manually assigned a value in `setup()`. Properties that are class-based will be constructed using their default constructor, but can also be assigned an initial state in `setup()`.

The next two sections give us the opportunity to work with some `private` properties.

## Loading Images

openFrameworks wraps the [FreeImage](https://freeimage.sourceforge.io/) library allowing us to load, display, resize, and manipulate images in formats like png, jpg, gif, bmp, tiff, and others.

In your project's `ofApp.h` file below the method definitions:

```cpp
private:
    ofImage freakyGoatGhost;
```

In the associated `ofApp.cpp` file, within `setup()`:

```cpp
// Place image file in the "bin/data/" folder:
freakyGoatGhost.load("freaky_goat_ghost.png");
// Or load from a URL:
freakyGoatGhost.load("http://example.com/freaky_goat_ghost.png");
```

Draw and resize within `draw()`:

```cpp
freakyGoatGhost.draw(10, 50); // Top left corner at x = 10 and y = 50
freakyGoatGhost.draw(100, 100, 50, 90); // Drawn at (100,100) resized to 50 width and 90 heights.
```

### Resources

- 📺 [Image Tutorial - Lewis Lepton on YouTube](https://www.youtube.com/watch?v=OLLtdyJC_Zs&list=PL4neAtv21WOlqpDzGqbGM_WN2hc5ZaVv7&index=8) (6m04s)
- 🔰 [How to Load and Display an Image](https://openframeworks.cc/learning/02_graphics/how_to_load_and_display_an_image/)
- 🔰 [How to Mask and Image with a Shape](https://openframeworks.cc/learning/02_graphics/how_to_maskanimagewithashape/)
- 🔰 [How To Export Canvas Screenshot as Image](https://openframeworks.cc/learning/01_basics/how_to_save_a_file/)

## Processing Image Pixels

The color and brightness of any image pixel can be retrieved:

```cpp
ofColor colorAtXY = freakyGoatGhost.getColor(30, 90); // The colour at x = 30 and y = 90
float brightnessAtXY = colorAtXY.getBrightness();
```

### Resources

- 📘 [The ofBook chapter on computer vision and low-level image pixel processing](https://openframeworks.cc/ofBook/chapters/image_processing_computer_vision.html).

## Simple Text

We can draw simple debugging messages to the screen at a set font size using:

```cpp
// Using the current color set by `ofSetColor()`:
ofDrawBitmapString("Hello Whirled", 100, 200); // Write text to x = 100, y = 200.
// White text on black background.
ofDrawBitmapStringHighlight("Hello Whirled", 100, 120);
// Blue text on yellow background.
ofDrawBitmapStringHighlight("Hello Whirled", 100, 140, ofColor::yellow, ofColor::blue);
```

### Resources

- 📺 [Text Tutorial - Lewis Lepton on YouTube](https://www.youtube.com/watch?v=0grroKrKI1I&list=PL4neAtv21WOlqpDzGqbGM_WN2hc5ZaVv7&index=9) (2m31s)

## Text and Fonts

To draw text of any size we need to use a TrueType font.

Grab a font from your `c:\windows\fonts` folder a put it in the `bin\data` folder. For the sake of example, let's say you grabbed `verdana.ttf`.

In your project's `ofApp.h` file below the method definitions:

```cpp
private:
    ofTrueTypeFont verdanaText;
```

In the associated `ofApp.cpp` file, within `setup()`:

```cpp
ofTrueTypeFont::setGlobalDpi(72); // Default is 96, but results in larger than normal pt size.
verdanaText.load("verdana.ttf", 14, true, true); // filename, point size, antialiased?, full char-set?
verdanaText.setLineHeight(18.0); // Default is based on font size.
verdanaText.setLetterSpacing(1.05); // Default is based on font size.
```

And then within `draw()`:

```cpp
verdanatText.drawString("Hello Squirrel", 50, 100); // Output text at x = 50, y = 100
```

### Resources

- 📜 [The official `ofTrueTypeFont` documentation](https://openframeworks.cc/documentation/graphics/ofTrueTypeFont/).
- 📺 [Text Font Tutorial - Lewis Lepton on YouTube](https://www.youtube.com/watch?v=6pecyHuP75Q&list=PL4neAtv21WOlqpDzGqbGM_WN2hc5ZaVv7&index=10) (5m21s)

## Playing Sounds

With openFrameworks we can easily load and play .mp3 and .wav sound files. openFrameworks wraps a number of different sound libraries to provide a common interface across different operating systems.

Like with images and fonts, sound files go in the `bin\data` folder, or into a sub-folder within `bin\data`. For this example let's assume we are using an mp3 file named [`ka-ching.mp3`](ka-ching.mp3).

In your project's `ofApp.h` file below the method definitions:

```cpp
private:
    ofSoundPlayer kaChing;
```

In the associated `ofApp.cpp` file, within `setup()`:

```cpp
kaChing.load("ka-ching.mp3");
kaChing.play(); // You can immediately play from setup if you wish.
```

To trigger the sound at a later time you could do something like this:

```cpp
void ofApp::keyPressed(int key){
    if (key == 'p') {
        kaChing.play();
    }
}
```

There are additional methods to control the volume, playback speed, left/right pan, or cause the the sound to loop.

### Resources

- 📜 [The official `ofSoundPlayer` documentation](https://openframeworks.cc/documentation/sound/ofSoundPlayer/)
- 📘 [The ofBook chapter on Sound](https://openframeworks.cc/ofBook/chapters/sound.html).

## Audio Latency

From the [ofBook Sound chapter](https://openframeworks.cc/ofBook/chapters/sound.html#latency):

> "No matter what, sound you produce in your app will arrive at the speakers sometime after the event that triggered the sound. The total time of this round trip, from the event to your app to the speakers is referred to as latency."

You usually won't notice the latency, unless you try to build something like a drum machine that requires very tight timing. In this case you'll need to look into using [ASIO](https://en.wikipedia.org/wiki/Audio_Stream_Input/Output) drivers for your sound card. You'll also want to use an `ofSoundStream` along with the [ofMaxim](https://github.com/micknoise/Maximilian) addon instead of the `ofSoundPlayer` used above.

### Resources

- 📦 [Sample low-latency drum machine using `ofSoundStream` and ofMaxim](https://github.com/stungeye/openFramewrks-Drum-Machine).
