---
title: History and Comparison
parent: Intro to PHP
nav_order: 2
---

<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->

## PHP History

- **1995-97**: _PHP/FI 1.0-2.0_ (**P**ersonal **H**omepage **P**age Tools / **F**orms **I**nterpreter) - PERL scripts and C libraries developed by Rasmus Lerdorf to manage his online resume.
- **1998**: _PHP 3_ - Major Rewrite. PHP now stands for **P**HP: **H**ypertext **P**reprocessor.
- **1999**: _PHP 4_ - New Zend Engine
- **2004**: _PHP 5_ - Zend Engine 2.0 and a new object model.
- **2015**: _PHP 7_ - 10+ years in the making! [Included lots of new goodies](https://secure.php.net/archive/2015.php#id2015-12-03-1).
- **Coming Nov 2020**: _PHP 8!_

**Side note:** PHP 6 never launched, although some of that work (like namespaces and traits) was back-ported into PHP 5.3/5.4 in 2009/2010.

#### Resources

- [PHP & Zend Engine](http://www.zend.com/en/community/php)
- [PHP History @ PHP.net](http://us.php.net/manual/en/history.php.php)

## A Short PHP Example

Here's a short PHP program:

```php
<?php

for ($i = 0; $i < 4; $i++) {
    echo "Wello Horld!\n";
}

?>
```

The code looks a little bit like Java, Javascript or even C.

Note the `<?php` and `?>` which respectively indicate the beginning and end of a section of PHP code.

## Wello Horld in Java

Here is the same program written in Java.

```php
class WelloHorld {

    public static void main(String[] args) {
        for (int i = 0; i < 4; i++) {
            System.out.println("Wello Horld!");
        }
    }

}
```

When compared to PHP, the Java version has some extra baggage:

- A WelloHorld class required to wrap the entire program.
- A `public static void main(String[] args)` method required to wrap the mainline.
- `System.out.prinln` vs. `echo`
