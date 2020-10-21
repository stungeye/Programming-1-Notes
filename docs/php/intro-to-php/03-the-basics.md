---
title: The Basics
parent: Intro to PHP
nav_order: 3
---

## The Basics
{: .no_toc }

There are some basic things you need to know to start coding in PHP. These include semicolon requirements, single and multi-line comments, as well as defining constants and variables.

<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->



## Semicolons and Comments

All PHP statements must end in a semicolon. The rules for semicolon usage are identical to those in Java or C#.

Single-line and multi-line comments are also identical to Java and C# comments.

```php
<?php
// Single line-comments are fun times!
echo "Grinning ghosts ";

/* A multi-line
   comment if I ever saw one. */

echo "boast the most roast!";
?>
```

Output:

```php
Grinning ghosts boast the most roast!
```

## Constants

You can define constants in PHP. A constant holds a value that you do not expect to change.

Constant names should be written in all capital letters, with underscores as spaces.

```php
<?php

define("CLOSE_TO_PIE",3.1415926);
define("THE_ANSWER",42);
define("INSTRUCTOR_FULL_NAME","Walter S. Glutton");
echo INSTRUCTOR_FULL_NAME . " knows the answer: " . THE_ANSWER;

?>
```

Output:

```php
Walter S. Glutton knows the answer: 42
```

#### Resources

- [Constants @ PHP.net](http://us.php.net/manual/en/language.constants.php)

## Variables

PHP can store your data in variables. Variables are named placeholders that can store numbers, strings, and other data.

Variables in PHP begin with a dollar sign followed by the name of the variable. The variable name is case-sensitive.

```php
<?php

$goats_in_the_kitchen = 13;
$goat_feet = $goats_in_the_kitchen * 4;
$feet_story  = "Once there were " . $goat_feet . " goat feet in our kitchen.";
echo $feet_story;

?>
```

A valid variable name starts with a letter or underscore, followed by any number of letters, numbers, or underscores.

#### Resources

- [Variables @ PHP.net](http://us.php.net/manual/en/language.variables.php)
