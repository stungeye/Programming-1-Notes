---
title: Pointers
has_children: true
nav_order: 11
---

# Pointers

It can sometimes be handy to access the data stored at a specific address within our computer's memory. In C++ this is accomplished using a special kind of variable called a _pointer_.

## Objectives

Upon completion of this module, you should be able to:

- Retrieve the memory address of a variable using the address-of operator.
- Read the data stored at a specific memory address using the indirection operator.
- Store memory addresses to pointers.
- Guard against undefined behaviour by using and testing for null and dangling pointers.
- Explain the difference between pointers and references.
- Pass functions as arguments to other functions using `std::function` or function pointers.
- Use `std::function` and function pointers to pass functions around like data.
- Describe how stack and heap allocation are used to store variable data.
- Explain how memory-related bugs like stack overflows and memory leaks are triggers.
- Use `new` and `delete` to request and free dynamically allocated memory.
- Work with objects by way of pointers and with objects that have pointers as member variables.
- Describe RAII and how it relates to dynamic memory management with pointers.
- Make use of smart unique pointers to prevent potential memory leaks in your code.
- Implement subtype polymorphism using inheritance and virtual functions.
- Override virtual functions in a derived class.
- Create abstract classes with pure virtual functions.
- Call virtual polymorphic methods by way of references or pointers.
- Work with polymorphic objects in the context of the standard library containers.
