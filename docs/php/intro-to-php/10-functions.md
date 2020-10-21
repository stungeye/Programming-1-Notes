---
title: Functions 
parent: Intro to PHP
nav_order: 10 
---

## Functions
{: .no_toc }

Functions do things, they are the verbs of computer programming.

<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->

## Functions

PHP functions can be defined to take zero of more parameters and can return any type of variable.

```php
<?php
    function square($x) {
        return $x * $x;
    }
    echo "16 squared = " . square(16);
?>
```

If your function has nothing to return you need not use the return keyword. A function will automatically return when there are no more statements to execute.

```php
<?php

function say_good_day($name) {
    echo "A fine day indeed {$name}!";
}

say_good_day('Bobby McGee');

?>
```

## Scope

All variables in PHP (created outside of functions) exist in a global scope. Function have a separate local scope. Variables used inside a function leave scope when the function exits.

```php
<?php
    $magic_words = 'abracadabra';
    function scope_scoop() {
        echo "Inside Function 1: {$magic_words}\n";
        $magic_words = 'Bibbidi-bobbidi-boo';
        echo "Inside Function 2: {$magic_words}\n" ;
    }
    scope_scoop();
    echo "Outside Function : {$magic_words}" ;
?>
```

Output:

```php
Notice:  Undefined variable: magic_words in C:\xampp\htdocs\php\text.php on line 4
Inside Function 1:
Inside Function 2: Bibbidi-bobbidi-boo
Outside Function : abracadabra
```

_Scope defines where in a program a variable is accessible. Where ever a variable is not accessible by your program it is said to be "out of scope" or "outside the current scope."_

#### Resources

- [Variable Scope @ PHP.net](http://us3.php.net/manual/en/language.variables.scope.php)

## Type Declarations

Earlier we learned that PHP variables were dynamically typed based on context. PHP 7 now allows programmers to apply strict typing to function parameters and return types.

Type declaration (also called type hinting) is optional but it can make your functions less error prone.

Here's an example of a function that will only accept an integer as its only argument:

```php
function hello_n_times( int $count ) {
    for ($i = 0; $i <= $count; $i++) {
        echo "Hello";
    }
}
```

## Return Type Declarations

With type declarations we can also specify the return type of a a function.

Here's a function that accepts two floats and returns a string:

```php
    function receipt_total(float $total, float $taxes) : string {
        $grand_total = $total + $taxes;
        return "Grand total after taxes: \${$grand_total}."; 
    }
```

## Allowed Types and Type Errors

Here are some of the main types that can be used as declarations:

|  Type      |  Description                     |
| :--------: | :------------------------------: |
|  array     | Must be an array.                |
|  bool      | Must be a boolean value.         |
|  float     | Must be a floating point number. |
|  int       | Must be an integer.              |
|  string    | Must be a string.                | 
|  object    | Must be an object.               |

PHP will throw a `TypeError` if the incorrect type of data is used in place of the declared type.



#### Resources

* [Type Declarations @ PHP.net](https://www.php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration)

