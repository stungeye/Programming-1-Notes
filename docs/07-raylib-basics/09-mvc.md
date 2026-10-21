---
title: Model, View, Controller
parent: Raylib Basics
nav_order: 9
---

<!-- prettier-ignore-start -->

# The Model, View, Controller Pattern
{: .no_toc }

Model–view–controller (MVC) is a software architectural pattern commonly used for developing user interfaces.

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!-- prettier-ignore-end -->

## The MVC Design Pattern

From [the Wikipedia entry](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller): 

> “Model–view–controller (MVC) is a software architectural pattern commonly used for developing user interfaces that divides the related program logic into three interconnected elements. 
> These elements are:  
>  
> •	the model, the internal representations of information  
> •	the view, the interface that presents information to the user  
> •	the controller, the software linking the two  
>  
> One of the seminal insights in the early development of graphical user interfaces, MVC became one of the first approaches to describe and implement software constructs in terms of their responsibilities.” 

## Example Program: One Number, Many Views

```cpp
#include <iostream>
#include <string>

class CounterModel {
    int count;
	int maxCount;
    std::string counterName;

public:
    CounterModel(const std::string& counterName, int maxCount = 3) 
        : count{ 0 }, maxCount{ maxCount }, counterName{ counterName } {}

    int value() const { return count; }
	int maximum() const { return maxCount; }
	const std::string& name() const { return counterName; }

    void increment() {
        if (count < maxCount) {
            ++count;
        }
    }

    void reset() { count = 0; }
};

class NumberView {
public:
    void draw(const CounterModel& model) {
        std::cout << "\n" << model.name() << ": " << model.value() << "\n\n";
		std::cout << "+ increases, r resets, q quits; press Enter: ";
    }
};

class BarView {
public:
    void draw(const CounterModel& model) {
        std::cout << "\n" << model.name() << " [";
        for (int i = 0; i < model.maximum(); ++i) {
            std::cout << (i < model.value() ? '*' : '.');
        }
        std::cout << "]\n\n";

		std::cout << "+ increases, r resets, q quits; press Enter: ";
    }
};

class AnsiBarView {
public:
    void draw(const CounterModel& model) {
        std::cout << clearScreen() << hideCursor() << cursorHome();
        std::cout << "\n" << green() << model.name() << blue() << " [" << white() ;
        for (int i = 0; i < model.maximum(); ++i) {
            if (i < model.value()) {
                std::cout << green() << '*';
            } else {
                std::cout << red() << '.';
			}
        }
        std::cout << blue() << "]\n\n";
		std::cout << white() << "+ increases, r resets, q quits; press Enter: ";
		std::cout << resetStyles() << showCursor();
    }

    // ANSI Escape Code Helpers
    // Returning const char* avoids constructing a std::string on each call.
    static const char* resetStyles() { return "\x1b[0m"; }
    static const char* clearScreen() { return "\x1b[2J"; }
    static const char* hideCursor() { return "\x1b[?25l"; }
    static const char* showCursor() { return "\x1b[?25h"; }
    static const char* cursorHome() { return "\x1b[H"; }

    // Fixed 256-colour palette entries keep text readable on the black background.
    static const char* white() { return "\x1b[38;5;255m"; }
    static const char* green() { return "\x1b[38;5;82m"; }
    static const char* blue() { return "\x1b[38;5;33m"; }
    static const char* red() { return "\x1b[38;5;196m"; }

};

enum class ControllerState {
    Running,
    Quit
};

class CounterController {
public:
    ControllerState handleInput(CounterModel& model) {
		char command;
		std::cin >> command;
        switch (command) {
			case '+': model.increment(); break;
			case 'r': model.reset();     break;
			case 'q': return ControllerState::Quit;
        }

        return ControllerState::Running;
    }
};

int main() {
    CounterModel model{"Ghosts", 5};
    NumberView view;
    CounterController controller;

    view.draw(model);

	ControllerState state;
    do {
        state = controller.handleInput(model);
        view.draw(model);
	} while (state != ControllerState::Quit);

	return 0;
}
```
