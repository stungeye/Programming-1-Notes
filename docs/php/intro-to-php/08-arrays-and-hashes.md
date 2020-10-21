---
title: Arrays and Hashes 
parent: Intro to PHP
nav_order: 8
---

## Arrays and Hashes
{: .no_toc }

PHP programmers often reach for two main composite data structures for passing data around, Arrays and Hashes. 

Arrays in PHP are similar to the arrays you've seen in other languages in that they allow you to store data in zero-based indexed collections.

Hashes (sometimes called associative arrays) also collections, but here the programmer defines the indices to use. Hashes are said to be collections of key and value pairs. 


<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->

## Arrays

Arrays are created using square braces. The data stored in an array can be retrieved using a zero-based index.

```php
<?php

$numbers      = [1,2,3];
$to_do_list   = ['finish your homework','bathe','cook dinner'];
$to_do_list[] = 'practice taxidermy'; // Appended the array.
echo "You should {$to_do_list[0]} now!";

?>
```

Output:

```php
You should finish your homework now!
```

The length of an Array need never be specified explicitly.

#### Resources

- [Arrays @ PHP.net](http://ca.php.net/manual/en/language.types.array.php)

## Count The Length

The length of an array can be determined using the `count()` function.

```php
<?php
    $bookshelf = ['Catcher in the Rye',
                  'Anathem',
                  'The Glassbead Game',
                  'The Manticore'];
    echo "I own " . count($bookshelf) ." books.";
?>
```

Output:

```php
 I own 4 books.
```

#### Resources

- [Count @ PHP.net](http://ca.php.net/manual/en/function.count.php)
- [Array Functions @ PHP.net](http://ca.php.net/manual/en/ref.array.php) - Too many useful functions to list. Come on down!

## Implode and Explode

The `implode()` function joins array elements into a string, while the `explode()` function splits a string into an array.

Both functions need to be supplied with a delimiter.

```php
<?php
    $poem = ['Mares eat oats','goat eat oats','little lambs eat ivy.'];
    echo implode(' and ', $poem) . "\n";

    $the_numbers  = '4,8,15,16,23,42';
    $dharma_hatch = explode(',',$the_numbers);
?>
```

Output:

```php
Mares eat oats and goat eat oats and little lambs eat ivy.
```

#### Resources

- [Implode @ PHP.net](http://ca.php.net/manual/en/function.implode.php)
- [Explode @ PHP.net](http://ca.php.net/manual/en/function.explode.php)

## Inspecting Arrays with Print_r

The `print_r()` function prints human-readable information about an array.

```php
<?php
    $the_numbers  = '4,8,15,16,23,42';
    $dharma_hatch = explode(',',$the_numbers);
    print_r($dharma_hatch);
?>
```

Output:

```php
Array
(
    [0] => 4
    [1] => 8
    [2] => 15
    [3] => 16
    [4] => 23
    [5] => 42
)
```

For even more details use `var_dump()` instead of `print_r`.

#### Resources

- [Hurray for Arrays](http://stungeye.com/school/pizza/pizza.php) - In which Hippolyte and Chubbs order a pizza.

## Hashes

A hash (sometimes called a map or a dictionary) is similar to an array. However, instead of storing and retrieving data using an index, hashes use _keys_ to retrieve _values_. Each key is unique, and corresponds to a single value within the array. We call these _key-value_ pairs.

In PHP, arrays are actually just hashes where the keys are zero-based integers.

**Hash keys can also be strings.**

```php
<?php
    $french_fruit = ['apple'      => 'une pomme',
                     'pineapple'  => 'un ananas',
                     'grapefruit' => 'un pamplemousse'];
    echo "Aujourd'hui, je vais manger {$french_fruit['grapefruit']}.";
?>
```

Output:

```
Aujourd'hui, je vais manger un pamplemousse.
```

## Isset() For Hashes

We can also use `isset()` to test if particular hash keys have been assigned values.

```php
<?php
    function toy_box_contains($toy, $toy_box) {
        if (isset($toy_box[$toy])) {
            echo "You have {$toy_box[$toy]} {$toy}.\n";
        } else {
            echo "You have no $toy.";
        }
    }
    $toy_box = ['tin soldiers'   => 52,
                'pick-up sticks' => 35,
                'dice'           =>  6,
                'transformers'   =>  4];
    toy_box_contains('dice', $toy_box);
    toy_box_contains('robots', $toy_box);
?>
```

Output:

```
You have 6 dice.
You have no robots.
```

## Nesting - Array of Hashes

Hashes can contain hashes. Arrays can contain arrays. Hashes can contain Arrays. Arrays can contain Hashes.

Here's an array where the elements are hashes:

```php
<?php
    // An Array of Hashes
    $employees = [
                     ['name'     => 'Wally Glutton',
                      'position' => 'Ninja'],
                     ['name'     => 'Jane McGonigal',
                      'position' => 'Instructor']
                 ];
    echo "{$employees[0]['name']} is a {$employees[0]['position']}.";
?>
```

Output:

```
Wally Glutton is a Ninja.
```

## Nesting - Hash of Arrays

Here's a hash where the values are arrays:

```php
<?php
    // A Hash of Arrays
    $favourite_foods = [ 'jane' => ['cabbage','pizza'],
                         'john' => ['rainbow trout','chalk']];

    $john_eats = $favourite_foods['john'];
    echo "John eats {$john_eats[0]} and {$john_eats[1]}.";
?>
```

Output:

```
John eats rainbow trout and chalk.
```

Two things that should also be noted:

- The contents of an array or hash can be of non-uniform type.
- The `print_r()` function also works for hashes.

For example:

```php
<?php
    $mixed_bag = ['one', 2, 'three', 4, [5 => 'five', 'six' => 6]];
    print_r($mixed_bag);
?>
```

Output:

```php
Array
(
    [0] => one
    [1] => 2
    [2] => three
    [3] => 4
    [4] => Array
        (
            [5] => five
            [six] => 6
        )
)
```

## Helpful Array Functions

- [in_array](http://ca2.php.net/manual/en/function.in-array.php) - Checks if a value exists in an array.
- [array_key_exists](http://ca2.php.net/manual/en/function.array-key-exists.php) - Checks if the given key or index exists in the array.
- [shuffle](http://ca2.php.net/manual/en/function.shuffle.php) - Shuffles an array.
- [sort](http://ca2.php.net/manual/en/function.sort.php) - Sort an array.
- [asort](http://ca2.php.net/manual/en/function.asort.php) - Sort an hash and maintain index association.
- [list](http://ca2.php.net/manual/en/function.list.php) - Assign variables as if they were an array.

