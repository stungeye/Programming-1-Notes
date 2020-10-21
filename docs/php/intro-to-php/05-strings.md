---
title: Strings 
parent: Intro to PHP
nav_order: 5
---

## Strings in PHP
{: .no_toc }

A string is series of characters. This section will cover how to work with string data in PHP. 

<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->

## Plain Strings and Fancy Strings

The most common ways to specify strings is by wrapping characters in single or double quotes.

If a string is specified using double quotes then any variables within curly-braces or escape characters it contains will be evaluated.

```php
<?php
    $name = 'Bobby McGee';
    $fancy_string = "My name is {$name}.\n"; // The \n represents a newline.
    $plain_string = 'My name is {$name}.\n';
    echo $fancy_string;
    echo $plain_string;
?>
```

Output:

```php
My name is Bobby McGee.
My name is {$name}.\n
```

#### Resources

- [Strings @ PHP.net](http://us.php.net/manual/en/language.types.string.php)

## String Length and Concatenation

Strings can be concatenated together using the dot operator.

We can use `strlen()` to determine the length of a string.

```php
<?php
    $old_shopping_list = 'bacon,chickpeas,gasoline,grapes';
    $new_shopping_list = $old_shopping_list . ',corn,tricycle';
    $output  = "Our list is " . strlen($new_shopping_list);
    $output .= " characters long." // Add to an existing string by using .=
    echo $output;
?>
```

Output:

```php
Our list is 45 characters long.
```