---
title: Array and Hash Traversals 
parent: Intro to PHP
nav_order: 9
---

## Array and Hash Traversals 
{: .no_toc }

When coding we often want to iterate over (or visit) every element in an array or every key/value pair in a hash. In this section we'll explore how to iterate over arrays and hashes. This interation is often called a traversal. 

<!-- prettier-ignore-start -->
## Table of Contents
{: .no_toc .text-delta }  

1. TOC
{:toc}
<!-- prettier-ignore-end -->

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

```
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

```
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

