---
title: Examples and Resources
parent: openFrameworks Basics
nav_order: 6
---

<!-- prettier-ignore-start -->

# Further Reading
{: .no_toc }

We've only just scratched the surface of what is possible using openFrameworks. This section includes two sample projects, information about oF addons, and links to all sorts of example code.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## oF Add Ons

openFramworks comes packaged with a number of addons that add extra functionality to the toolkit. A large number of community supported addons are also available through [ofxaddons.com](https://ofxaddons.com).

The included addons can be found in the `addons` folder. Any community addons you wish to use should be added to this folder.

Addons can be added to new or existing projects using the project generator app.

A few of the included addons:

- 📜 [ofxGui](https://openframeworks.cc/documentation/ofxGui/) - Handy parameter tweaking GUI with sliders, checkboxes, and buttons. 📦 [Examples](https://github.com/openframeworks/openFrameworks/tree/master/examples/gui).
- 📜 [ofxBox2d](https://github.com/vanderlin/ofxBox2d) - 2D physics engine that wraps [Box2d](https://box2d.org/). 📦 [Examples](https://github.com/vanderlin/ofxBox2d).
- 📜 [ofxNetwork](https://openframeworks.cc/ja/documentation/ofxNetwork/) and [ofxOSC](https://openframeworks.cc/documentation/ofxOsc/) - TCP, UPC, and OSC networking libraries. 📦 [Examples](https://github.com/openframeworks/openFrameworks/tree/master/examples/communication).
- 📜 [ofxOpenCV](https://openframeworks.cc/documentation/ofxOpenCv/) - Wraps the powerful [OpenCV computer vision library](https://opencv.org/). 📦 [Examples](https://github.com/openframeworks/openFrameworks/tree/master/examples/computer_vision).
- 📜 [ofxSVG](https://openframeworks.cc/documentation/ofxSVG/) - Vector graphics loader for SVG files. 📦 [Example](https://github.com/openframeworks/openFrameworks/tree/master/examples/input_output/svgExample).
- 📜 [ofxXMLSettings](https://openframeworks.cc/documentation/ofxXmlSettings/) - Simple XML loader and saver. 📦 [Example](https://github.com/openframeworks/openFrameworks/tree/master/examples/input_output/xmlExamples).

### Resources

- 📺 [Project Generator and Addons Tutorial - Lewis Lepton on YouTube](https://www.youtube.com/watch?v=sgU_r4Kn_rk&list=PL4neAtv21WOlqpDzGqbGM_WN2hc5ZaVv7&index=3) (5m47s)
- 🔰 [Addon HowTo @ openframeworks.cc](https://openframeworks.cc/learning/01_basics/how_to_add_addon_to_project/)

## Other Handy Utility Functions and Classes

There's so much more to openFrameworks! Start by exploring these handy functions and classes:

- 📜 [`ofClamp()`](https://openframeworks.cc/-/documentation/math/ofMath/#!show_ofClamp) - Clamp a value between a min and a max.
- 📜 [`ofMap()`](https://openframeworks.cc/documentation/math/ofMath/#show_ofMap) - Given a value and an input range, map the value to an output range.
- 📜 [`ofRectangle`](https://openframeworks.cc/documentation/types/ofRectangle/) - Super handy for simple collision detection hit boxes.
- 📜 [`ofDirectory`](https://openframeworks.cc/documentation/utils/ofDirectory/), [`ofFilePath`](https://openframeworks.cc/documentation/utils/ofFilePath/) and [`ofFile`](https://openframeworks.cc/documentation/utils/ofFile/) - For working with files.
- 📜 [`ofURLFileLoader`](https://openframeworks.cc///documentation/utils/ofURLFileLoader/) - For loading data from URLs.
- 📜 [And many more!](https://openframeworks.cc/documentation/)

## Example Code to Study

You'll find two example programs below, but there are lots of examples out there you can learn from:

- 📦 [Official openFrameworks Examples](https://github.com/openframeworks/openFrameworks/tree/master/examples) - These are also found in the `examples` folder of the openFrameworks zip file.
- 📚 [Cookbook of Common Tasks from ofAuckland](https://sites.google.com/site/ofauckland/examples).
- 📦 [Example Source from Mastering openFrameworks Book](https://github.com/firmread/ofDemystified).
- 📺 [Lewis Lepton's 76 Video openFrameworks YouTube series](https://www.youtube.com/playlist?list=PL4neAtv21WOlqpDzGqbGM_WN2hc5ZaVv7) and 📦 [the associated github repo](https://github.com/lewislepton/openFrameworksTutorialSeries).
- 📺 Dan Buzzo's [openFrameworks superBasics YouTube series](https://www.youtube.com/playlist?list=PL6QF0yo3Zj7DbN76C5-_6VCDF5CPBIz6l) and [his many other playlists](https://www.youtube.com/c/danbuzzo/featured).

## Example Sketch One - Mouse Trails

Manually clearing the background with an alpha channel to create some mouse trails:

```cpp
void ofApp::setup() {
    ofSetBackgroundAuto(false); // Disable automatic background clearing.
    ofEnableAlphaBlending();    // Allow alpha channel transparency.
    ofSetCircleResolution(50);  // Make circles smoother than the default.
    ofSetFrameRate(60);         // Set the framerate to 60 frames per second.
}

void ofApp::draw() {
    ofSetColor(0, 0, 0, 10); // Set the fill color to black with a low alpha value.
    ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight()); // Draw a rectangle that covers the canvas.
    ofSetColor(255, 255, 255, 255); // Set the fill color to white with full alpha.
    ofDrawCircle(ofGetMouseX(), ofGetMouseY(), 30); // Draw circle at the mouse position.
}
```

## Example Sketch Two - Twisted Squares

Scaling and rotation of a circle controlled by the mouse position:

```cpp
void ofApp::setup() {
    ofSetFrameRate(60); // Set frame rate to 60 FPS.
    ofSetRectMode(OF_RECTMODE_CENTER); // Rectangle x/y positions specify the shape's center.
    ofNoFill(); // Don't fill shapes.
}

void ofApp::draw() {
    // Pink and blue circular background gradient.
    ofBackgroundGradient(ofColor::deepPink, ofColor::deepSkyBlue, OF_GRADIENT_CIRCULAR);

    // Translate the coordinate system to the middle of the canvas.
    ofTranslate(ofGetWidth() / 2, ofGetHeight() / 2);

    // Map the mouse x position to a 0 to 20 range.
    double rotation = ofMap(ofGetMouseX(), 0, ofGetWidth(), 0, 20);
    // Map the mouse y position to a 1 to 1.2 range.
    double scaleFactor = ofMap(ofGetMouseY(), 0, ofGetHeight(), 1, 1.2);

    // Draw 100 circles of increasing size and rotation.
    for (auto i = 0; i < 100; ++i) {
        // The x position of the mouse mapped 0-20 sets the rotation.
        ofRotateZDeg(rotation);
        // The y position of the mouse mapped 1.0-1.2 sets the scaling.
        ofScale(scaleFactor, scaleFactor);
        // Draw the rotated and scaled square.
        ofDrawRectangle(0, 0, 1, 1);
    }
}
```

## Some Game Built using oF

Although openFrameworks isn't a game engine, it has been used for a some PC and mobile games.

- 📚 [Kings of Space by Block Games](http://www.kingsofspace.com/)
- 📚 [Earth Analog](https://www.youtube.com/watch?v=TAX0hQ4fhe0) and [Hyper Train](https://www.youtube.com/watch?v=0LJ2vGkERtc) by [Funcraft Games](https://store.steampowered.com/search/?developer=Funcraft%20Games)
- 📚 [Super Hexagon](https://superhexagon.com) by [Terry Cavanagh](https://terrycavanaghgames.com/) of [VVVVVV](https://store.steampowered.com/app/70300/VVVVVV/) fame - PC and mobile port of the original Flash Game.
- 📚 [Ridiculous Fishing](http://ridiculousfishing.com/) - iOS game made with oF and [ofxSpriteSheetRenderer](https://github.com/stfj/ofxSpriteSheetRenderer).
- 📚 [Adventures of Yddar](https://gamejolt.com/games/adventuresofyddar/489256) - Recent game jam game made with oF.
- 📘 [ofBook Chapter on making Experimental Games with oF](https://openframeworks.cc/ofBook/chapters/game_design.html)

## Other Important Links

- 🔍 [openFrameworks Forums](https://forum.openframeworks.cc/) - Sign up today. :)
- 📜 [API Documentation @ openframeworks.cc](https://openframeworks.cc/documentation/)
- 📘 [The ofBook @ openframeworks.cc](https://openframeworks.cc/ofBook/chapters/foreword.html)
- 🔰 [How-Tos @ openframeworks.cc](https://openframeworks.cc/learning/)
- 📦 [openFramworks Github Repo](https://github.com/openframeworks/)
