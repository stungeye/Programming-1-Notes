---
title: For and While Loops 
parent: Intro to PHP
nav_order: 7
---

## For and While Loops
{: .no_toc }
We automate repetition in our code using loops. In this section we'll explore PHP's `for` and `while` loops.

<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->

## For Loops

A for loop is a counting loops that executes a block of code until a test becomes false. In PHP a for loop works pretty much as you would expect it to.

```php
<?php

    for($i = 100; $i > 0; $i--) {
        echo $i;
    }
?>
```

#### Resources

- [For Loop @ PHP.net](http://ca3.php.net/manual/en/control-structures.for.php)

## While

A while loop repeatedly executes a block of code while the supplied boolean expression is true.

```php
<?php

    $i = 1;
    while ($i <= 10) {
        echo $i++;
    }

    echo 'Oh my, a humdrum example if I ever saw one.';

?>
```

#### Resources

- [while @ PHP.net](http://ca3.php.net/while)
- [do-while @ PHP.net](http://us3.php.net/manual/en/control-structures.do.while.php)
