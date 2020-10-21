---
title: Variable Types 
parent: Intro to PHP
nav_order: 4
---

## Variable Types
{: .no_toc }

In this section we'll look it how types are assigned to variables in PHP scripts.

<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->


## Variable Types in PHP 

PHP variables are dynamically typed, which means that they are not assigned types by the programmer. They are assigned a type by the interpreter based on their context.

Types in PHP:

- boolean (scalar)
- integer (scalar)
- float (scalar)
- string (scalar)
- array (compound)
- object (compound)
- NULL (Variables can be assigned NULL or `unset()`.)
- resource (special)

#### Resources

- [Types @ PHP.net](http://us.php.net/manual/en/language.types.php)
- [Resource Types @ PHP.net](https://www.php.net/manual/en/resource.php)
- [unset() @ PHP.net](http://us.php.net/manual/en/function.unset.php)

## Casting and Testing Variable Types

The type of a variable can be changed at any time by reassignment or by casting.

There are a number of `is_*()` functions available (example `is_bool()`, `is_int()`, &c) and `isset()` to check for NULL.

```php
<?php

$my_int   = 12;
$my_float = (float)$my_int; // Casting int to a float.
unset($my_int); // Equivalent to: $my_int = NULL;
if (!isset($my_int) && is_float($my_float)) {
    echo "All is well.";
}

?>
```

#### Resources

- [gettype() @ PHP.net](http://us.php.net/manual/en/function.gettype.php)
- [Variable Handling Funcions @ PHP.net](http://us.php.net/manual/en/ref.var.php)

## NULL

A variable is considered NULL if:

- It has not yet been assigned a value.
- It has been explicitly assigned the constant `NULL`.
- It has been `unset()`.

We can test for null using `isset()`.

```php
<?php
    if (isset($new_variable)) {
        echo "How very odd!?!";
    }
    $new_variable = 'I am no longer NULL.';
    if (isset($new_variable)) {
        echo $new_variable;
    }
?>
```

Output:

```php
I am no longer NULL.
```

#### Resources

- [unset() @ PHP.net](http://us3.php.net/manual/en/function.unset.php)
- [isset() @ PHP.net](http://us3.php.net/manual/en/function.isset.php)
