---
title: PHP and HTML 
parent: Intro to PHP
nav_order: 11 
---

## PHP and HTML
{: .no_toc }

PHP is not only a programming language, it is also an HTML templating language. This means we can mix PHP and markup together to create dynamically generated HTML pages.

<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->

## PHP and HTML

Up to this point when we've wanted to print from PHP we've been using `echo`:

```php
<?php
    $world = "Hello World";
    echo $world;
?>
```

But we can also use what is called a short echo:

```php
<?= $world ?>
```

Note that a trailing semicolon is not required.

When mixing PHP and HTML we're going to try to keep the two as separate as possible.

A typical PHP + HTML script should look like:

```php
<?php
    /* Most of your PHP code should go here.
       Including all variable initialization,
       calculations, user input processing,
       database queries, etc. */

    $world = "Hello World";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Page Title</title>
</head>
<body>
    <!-- To inject data from PHP variables into
         your HTML you should use a short echo. -->

    <p>Woot: <?= $world ?></p>
</body>
</html>
```

## Mixing HTML and PHP

![Mixing HTML and PHP](spaghetti-code.jpg)

In the HTML portion of your code you should use as little PHP as possible. At most you should use PHP within your HTML to:

- Echo the content of variables using "short echos".
- Include or exclude HTML using PHP if/elseif/else statements.
- Loop over arrays using PHP for/while loops while echoing.

The HTML portion of your page should be considered a template only, not a place to code. Because spaghetti code.

## The Alternative Syntax

When embedding PHP within your HTML you should be using what is called the "alternative syntax for control structures."

```php
<ul>
    <?php foreach($todo as $item): ?>
        <li><?=$item?></li>
    <?php endforeach ?>
</ul>

<?php if ($logged_in): ?>
   <h3>You Are Logged In</h3>
<?php elseif ($username === 'admin'): ?>
   <h3>You Are the Admin</h3>
<?php else: ?>
   <a href="login.php">Log In</a>
<?php endif ?>
```

Notice that there are no curly braces. Instead blocks begin with a colon and end with an `endif`, `endfor`, `endforeach` or `endwhile`.

#### Resources

- [PHP Alternative Syntax @ PHP.net](https://secure.php.net/manual/en/control-structures.alternative-syntax.php)

## Thou Shall Never...

...write HTML inside of your PHP inside of your HTML.\*

This is what not to do:

```php
<?php
    $href  = "http://example.com";
    $title = "Snafu";
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Make Your Instructor Cry</title>
</head>
<body>
    <!-- The following two lines are what I want you to avoid doing. -->
    <p><?= "<span>WAT?!?</span>" ?></p>
    <p><?= "<a href='" . $href ."'>" . $title . "</a>" ?></p>
</body>
</html>
```

There is always a way around embedding HTML in your PHP strings. For example:

```php
<p><a href="<?= $href ?>"><?= $title ?></a></p>
############^^^^^^^^^^^^##^^^^^^^^^^^^^########
```

Code above hashes (#) is HTML. Code above carets (^) is PHP.

When processed this line would generate:

```php
<p><a href="http://example.com">Snafu</a></p>
```

\* _Rules, of course, were meant to be broken. So try your best to keep this one, but if you really can't find a way around it, go ahead and live dangerously. ;)_

#### Resources

Another way to manage the complexity of the PHP embedded in your markup is to use a templating library like [Twig](http://twig.sensiolabs.org/) or [Blade](https://laravel.com/docs/5.1/blade). To use these libraries you'll have to look into [Composer](https://getcomposer.org/), the PHP dependency manager.
