---
title: Booleans and Decisions 
parent: Intro to PHP
nav_order: 6
---

## Booleans and Decisions 
{: .no_toc }

In many ways, computer programming is the art of automating decisions. Decisions are made by a computer based on statements that are either true or false. In this section we'll see how PHP deals with boolean variables and how to made decisions with `if` and `switch` statements.


<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->

## Truthiness and Falsiness

When working with Boolean expressions PHP contains the constants `TRUE` and `FALSE`. However, most other variable types can be coerced into Booleans.

```php
<?php
    function boolean_test($var) {
        if ($var) {
            echo "{$var} is true\n";
        } else {
            echo "{$var} is false\n";
        }
    }
    boolean_test(TRUE);     boolean_test(FALSE);
    boolean_test(0);        boolean_test(1);
    boolean_test(2);        boolean_test(3);
    boolean_test('string'); boolean_test('');
    boolean_test([]);       boolean_test([34]);
    boolean_test(NULL);
?>
```

Output:

```php
1 is true
 is false
0 is false
1 is true
2 is true
3 is true
string is true
 is false
Array is false
Array is true
 is false
```

Some things to note here:

- When printing out `TRUE` we get a 1.
- When print `FALSE` or `NULL` a empty string is printer.
- Zero is false while all other numbers are true.
- Empty strings are false, while all other strings are true.
- Empty arrays and hashes are false, while all other arrays and hashes are true.

#### Resources

- [The Nitty-Gritty of Type Comparisons @ PHP.net](http://php.net/manual/en/types.comparisons.php)

## Boolean Expressions

A boolean expression is a mathematical expression that results in either `true` or `false`.

Boolean expressions can contain the following common operators (and more):

|      Symbol      | Meaning               |
| :--------------: | :-------------------- |
|        ==        | equal                 |
|        !=        | not equal             |
|        >         | greater than          |
|        <         | less than             |
|        >=        | greater than or equal |
|        <=        | less than or equal    |
|        &&        | Boolean 'and'         |
| &brvbar;&brvbar; | Boolean 'or'          |

#### Resources

- [George Boole](http://stungeye.com/archive/by_date/2009/06/15)

## Really Really Really Equals?

Because PHP will auto-cast your variables when you compare them with different types, the double equals operator doesn't always act in an expected manner.

For example, the following comparisons will evaluate to true.

```php
42 == "42"
42 == true
0 == false
0 == "a"
"a" == true
0 != true
```

To avoid these WAT!? moments, use the triple equals operator `===` when making comparisons.

## If Statements

If statements work as expected. Note that `elseif` is one word when chaining statements.

```php
<?php

if (($wobblypops > 4) || ($wobblypops === 0)) {
    echo 'I pity da fool.';
} elseif ($wobblypops < 4) {
    echo 'Gulp gulp.';
    $wobblypops++;
}

?>
```

There have been other examples of simple if/else clauses earlier in the notes.

#### Resources

- [if @ PHP.net](http://us.php.net/manual/en/control-structures.if.php)

## Switch Statements

It's sometimes nice to express long if/else chains as switch statements:

```php
<?php
    $i = 1;
    switch ($i) {
        case 0:
            echo 'i equals 0' . $i;
            break;
        case 1:  // Note: Fall-through
            echo "falling\n";
        case 2:  // Note: Fall-through
            echo "falling\n";
        case 3:
            echo 'i equals 1-3';
            break;
        default:
            echo 'Nothing special about the default.';
    }
?>
```

_Note the "fall-through" cases for 1 and 2. Execution does not stop until we reach a `break` or the end of the switch block._

Output:

```php
falling
falling
i equals 1-3
```

Strings can also be used as the target of a switch:

```php
<?php
    switch($beer)
    {
        case 'trad':
        case 'fort garry dark':
        case 'hoegaarden':
            echo 'Good choice';
            break;
        default:
            echo 'Please make a new selection...';
    }
?>
```

#### Resources

- [Switch @ PHP.net](http://us3.php.net/manual/en/control-structures.switch.php)
