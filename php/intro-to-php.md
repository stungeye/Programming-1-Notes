---
title: Intro to PHP
---

## Table of contents
{: .no_toc }

- Do not remove this line (it will not be displayed)
{:toc}

## Introduction

This module is an introduction to the PHP programming language. It will also serve as a programming reference that you can use throughout the course.

This module will cover variable data types, boolean branching structures, looping structures and variable scope.

## Objectives

Upon completion of this module, you should be able to:

- Store data in variables and constants.
- Output strings to the screen with `echo`.
- Interpolate variables in strings.
- Use comments in your PHP code.
- Define your own functions.
- Store and retrieve single and multi-dimensional array data.
- Store and retrieve hash data.
- Code various conditional and looping structures.
- Understand PHP's scoping rules.
- Use short echos and the PHP alternative syntax.

## Conventions

All source code in the notes will be syntax highlighted like so:

```php
<?php
    $beers_on_the_wall = 99;
    $beers_on_the_wall--; // Take one down, pass it around.
    echo $beers_on_the_wall . " bottles of beer on the wall.";
?>
```

The output obtained by running the source through an interpreter will be displayed in a monospace font on a grey background:

```php
98 bottles of beer on the wall.
```

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

## Wello Horld \* 4

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

## Semicolons and Comments

All PHP statements must end in a semicolon. The rules for semicolon usage are identical to those in Java.

Single-line and multi-line comments are also identical to Java comments.

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
define("INSTRUCTOR_FULL_NAME","Kyle Andrew McGrath Geske");
echo INSTRUCTOR_FULL_NAME . " knows the answer: " . THE_ANSWER;

?>
```

Output:

```php
Kyle Andrew McGrath Geske knows the answer: 42
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

## Variable Types

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
- [unset() @ PHP.net](http://us.php.net/manual/en/function.unset.php)

## Variable Types

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

## Strings

A string is series of characters. The most common ways to specify strings is by wrapping characters in single or double quotes.

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

## Strings

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

There have been examples of simple if/else clauses earlier in the notes.

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

## Arrays

Arrays are created using square braces. The data stored in an array can be retrieved using a zero-based index.

```php
<?php

$numbers      = [1,2,3];
$to_do_list   = ['finish homework','bathe','cook dinner'];
$to_do_list[] = 'practice taxidermy'; // Appended the array.
echo "Kyle {$to_do_list[0]} now!";

?>
```

Output:

```php
Kyle finish homework now!
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

## Print_r

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

```php
Aujourd'hui, je vais manger un pamplemousse.
```

## Nested Hashes and Arrays

Hashes can contain hashes. Arrays can contain arrays. Hashes can contain Arrays. Arrays can contain Hashes.

```php
<?php
    // An Array of Hashes
    $employees = [
                     ['name'     => 'Wally Glutton',
                      'position' => 'Ninja'],
                     ['name'     => 'Kyle Geske',
                      'position' => 'Instructor']
                 ];
    echo "{$employees[0]['name']} is a {$employees[0]['position']}.";
?>
```

Output:

```php
Wally Glutton is a Ninja.
```

## Nested Hashes and Arrays

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

```php
John eats rainbow trout and chalk.
```

Two things that should also be noted:

- The contents of an array or hash can be of non-uniform type.
- The `print_r()` function also works for hashes.

For example:

```php
<?php
    $mixed_bag = ['one',2,'three',4,[5 => 'five','six' => 6]];
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

```php
You have 6 dice.
You have no robots.
```

## Functions

Functions do things, they are the verbs of computer programming.

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

## Traversing Arrays

The most common task performed on arrays is a traversal, the incrementally "visiting" of each array element.

```php
<?php
    $words = ['one','two','buckle','my','shoe'];
    foreach ($words as $word) {
        echo $word . ' ';
    }
?>
```

Here's the same code in Java:

```php
String[] words = {"one", "two", "buckle", "my", "shoe"};

 for (int i = 0; i < words.length; i++) {
     System.out.println(words[i]);
 }
```

#### Resources

- [foreach @ PHP.net](http://us3.php.net/manual/en/control-structures.foreach.php)

## Traversing Hashes

The `foreach` loop can also be used to traverse the key/value pairs of a hash.

```php
<?php
    $names = ['Wally' => 'Glutton',
              'Sammy' => 'McGoo',
              'Joni'  => 'Mitchell'];
    foreach($names as $firstname => $lastname) {
        echo "{$lastname}, {$firstname}";
    }
?>
```

Output:

```php
Glutton, Wally
McGoo, Sammy
Mitchell, Joni
```

## Traversing Nested Structures

Sometimes we need to traverse complex nested structures of arrays and hashes.

When traversing such structures it is important to determine which portion of the structure is comprised of arrays and his portion is comprised of hashes.

We can then use nested `foreach` loops to traverse all of these hashes and arrays.

Here the `$football_teams` variable is an array of hashes detailing British football teams:

```php
<?php
    $football_teams = [
        [ // This is the 0th hash in the $football_teams array.
            'coach'    => 'Bobby McGoo',
            'teamname' => 'Strike Attack',
            'players'  => [ // 'players' is an array of hashes.
                ['name'=>'Jill Scott',  'position'=>'goalie'],
                ['name'=>'Willard Bee', 'position'=>'defense'],
                ['name'=>'Ace Batord',  'position'=>'centre']
            ],
            'wins'    => 5,
            'loses'   => 2
        ],
        [ // This is the 1st hash in the $football_teams array.
            'coach'    => 'Sam Smith',
            'teamname' => 'Running Scared',
            'players'  => [
                ['name'=>'Warren Lost', 'position'=>'goalie'],
                ['name'=>'Jane Mayor',  'position'=>'defense'],
                ['name'=>'Tim MacLand', 'position'=>'centre']
            ],
            'wins'    => 0,
            'loses'   => 4
        ]];

  foreach($football_teams as $current_team) {
    echo "{$current_team['teamname']} is coached by {$current_team['coach']}.\n";
    echo "The team has {$current_team['wins']} wins and {$current_team['loses']} loses.\n";
    echo "The team roster:\n";
    foreach ($current_team['players'] as $current_player) {
        echo "* {$current_player['name']} plays {$current_player['position']}\n";
    }
    echo "\n";
  }
?>
```

Output:

```php
Strike Attack is coached by Bobby McGoo.
The team has 5 wins and 2 loses.
The team roster:
* Jill Scott plays goalie
* Willard Bee plays defense
* Ace Batord plays centre

Running Scared is coached by Sam Smith.
The team has 0 wins and 4 loses.
The team roster:
* Warren Lost plays goalie
* Jane Mayor plays defense
* Tim MacLand plays centre
```

## Helpful Array Functions

- [in_array](http://ca2.php.net/manual/en/function.in-array.php) - Checks if a value exists in an array.
- [array_key_exists](http://ca2.php.net/manual/en/function.array-key-exists.php) - Checks if the given key or index exists in the array.
- [shuffle](http://ca2.php.net/manual/en/function.shuffle.php) - Shuffles an array.
- [sort](http://ca2.php.net/manual/en/function.sort.php) - Sort an array.
- [asort](http://ca2.php.net/manual/en/function.asort.php) - Sort an hash and maintain index association.
- [list](http://ca2.php.net/manual/en/function.list.php) - Assign variables as if they were an array.

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

![Mixing HTML and PHP](/system/images/805/medium/spaghetti-code.jpg?1452094005)

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
