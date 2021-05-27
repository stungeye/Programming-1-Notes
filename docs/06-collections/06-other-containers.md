---
title: Other Containers
parent: Collections of Data
nav_order: 6
---

<!--prettier-ignore-start-->

# Other Containers
{: .no_toc }

There are many other useful container types that are part of the C++ Standard Library.

Unreal Engine has their own types that should be used in place of the standard library containers.

This module lists some of the most commonly used of these containers and their Unreal Engine counterparts.

### Table of Contents
{: .no_toc }

1. TOC
{:toc}

<!--prettier-ignore-end-->

## Array `std::array`

Array of fixed length for storing ordered data of an uniform type.

Course Notes: [Arrays Module](/Programming-1-Notes/docs/06-collections/02-arrays.html)

Reference: [cppreference.com](https://en.cppreference.com/w/cpp/container/array)

Unreal Engine: [TArray](https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/TArrays/index.html)

## Vector `std::vector`

Array of variable length for storing ordered data of an uniform type.

Course Notes: [Vectors Module](/Programming-1-Notes/docs/06-collections/03-vectors.html)

Reference: [cppreference.com](https://en.cppreference.com/w/cpp/container/vector)

Unreal Engine: [TArray](https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/TArrays/index.html)

## String `std::string`

Collection of characters.

Course Notes: [Strings Module](/Programming-1-Notes/docs/06-collections/04-strings.html)

Reference: [cppreference.com](https://en.cppreference.com/w/cpp/string/basic_string)

Unreal Engine: [FString](https://docs.unrealengine.com/en-US/API/Runtime/Core/Containers/FString/index.html)

## Map `std::map` & `std::unordered_map`

Associative container for storing key/value pairs of specific types.

Reference: [map @ cppreference.com](https://en.cppreference.com/w/cpp/container/map) and [unordered_map @ cppreference.com](https://en.cppreference.com/w/cpp/container/unordered_map)

Unreal Engine: [TMap](https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/TMap/index.html)

## Set `std::set` & `std::unordered_set`

Container of unique values of a specific type.

Reference: [set @ cppreference.com](https://en.cppreference.com/w/cpp/container/set) and [unordered_set @ cppreference.com](https://en.cppreference.com/w/cpp/container/unordered_set)

Unreal Engine: [TSet](https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/TSet/index.html)

## Tuple `std::tuple`

Fixed sized collection of values of different types.

Reference: [cppreference.com](https://en.cppreference.com/w/cpp/utility/tuple)

Unreal Engine: [TTuple](https://docs.unrealengine.com/en-US/API/Runtime/Core/Templates/TTuple/index.html)

## Pair `std::pair`

Collection of two values of different types.

Reference: [cppreference.com](https://en.cppreference.com/w/cpp/utility/pair)

Unreal Engine: [TPair](https://docs.unrealengine.com/en-US/API/Runtime/Core/Containers/TPair/index.html)
