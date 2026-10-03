# Introduction to C++

## 1. Opening: You Already Know Most of This — 2 minutes

- You already know variables, conditions, loops, and functions. Today we're using those ideas in C++.
- The goal is to get a small program running, make changes, and understand what happens.
- The notes are a reference. You'll use them during four short challenges.

## 2. Familiar Types, New Declaration Options — 6 minutes

- The types we'll use most today are familiar: `int`, `double`, `bool`, and `std::string`.
- Initialize variables when you declare them.

```cpp
int gold{23};
double speed{4.5};
bool isAlive{true};
std::string name{"Wally"};
```

- `auto` asks the compiler to deduce the type from the initializer.

```cpp
auto gold{23};       // int
auto speed{4.5};     // double
auto isAlive{true};  // bool
```

- Like C#'s `var`, this is still static typing. The variable does not change its type later.
- Use explicit `std::string` for now: `auto name = "Morgan";` does not produce a `std::string`.
- Ask: What type is `auto share = 23 / 4;`? What value does it hold?

### Constants

```cpp
constexpr int potionCost{25};
constexpr int maximumHealth{100};

int gold{0};
std::cin >> gold;
const int startingGold{gold};
```

- `const` means the object cannot be modified after initialization.
- `constexpr` also requires a compile-time constant initializer.
- A fixed potion price can be `constexpr`.
- Gold entered by the player is known only at runtime, but we can preserve a `const` snapshot.
- For our fixed game rules today, use `constexpr`.

## 3. Read a Number; Read a Whole Line — 5 minutes

```cpp
int gold{0};
std::cout << "Gold: ";
std::cin >> gold;
```

- `>>` reads a value appropriate for the destination type.
- For strings, `>>` reads one whitespace-delimited word.
- Ask: What if the character's name contains spaces?

```cpp
std::string name;
std::cout << "Character name: ";
std::getline(std::cin >> std::ws, name);
```

- `std::getline` reads a whole line, including spaces.
- After numeric input, the newline is still waiting in the stream.
- `std::ws` consumes leading whitespace, including that leftover newline.
- This is convenient for names, but it also skips blank lines and leading spaces.
- Plain `std::getline(std::cin, name)` preserves leading spaces, but after `>>` we must deal with the leftover newline.
- Demonstrate by entering `23`, followed by `Wally the Brave`.
- For today's challenges, assume valid numeric input. Input-error recovery is a separate topic.

## 4. Decisions and Loops Transfer — 4 minutes

```cpp
if (gold >= potionCost) {
    std::cout << "You can afford a potion.\n";
} else {
    std::cout << "Keep collecting gold.\n";
}
```

- C# comparisons, logical operators, and branching knowledge transfer.
- Ask: Which branch runs when gold equals the price?

```cpp
for (int round{1}; round <= 3; ++round) {
    std::cout << round << '\n';
}
```

- This has the same initialization, condition, and update students already know.
- `while` and `do while` are available too.

## 5. Functions: Calculate and Return — 5 minutes

```cpp
int calculateUpgradeCost(int level) {
    return level * 40;
}
```

```cpp
// Inside main:
auto cost{calculateUpgradeCost(3)};
std::cout << cost << '\n';
```

- Identify the return type, function name, parameter, and returned expression.
- Put the function definition above `main()` for today.
- `auto cost` gets its type from the function's return type.
- An `int` parameter receives a copy. Changing that parameter changes only the copy.
- Return the calculated result, then use or store it in the caller.
- Calling a function does not automatically assign its result anywhere.
- A function returning `void` does not return a value.

## 6. References: A Second Name for the Same Variable — 3 minutes

```cpp

```

- `copiedGold` is a separate variable containing a copied value.
- `sharedGold` is a reference: another name for `gold`.
- Changing the reference changes the original variable.
- The `&` is part of the declaration. It declares a reference.
- References can also appear in function parameters. We'll explore that later.
- For today's healing challenge, use a return value to make the update explicit.

## 7. Launch the Challenges — 1 minute

- Split the loot: input, integer division, and remainder.
- Buy a potion: use `constexpr` for the price; test below, at, and above the price.
- Repair the healing function: return the new health, assign it, and cap it using a `constexpr` maximum.
- Refactor split the loot: move the share calculation into a function; keep input and output in `main()`.

## Challenge 1: Split the Loot — 5–8 minutes

- Your party has collected some coins. Divide them evenly.
- Read:
  - Total coins: a nonnegative integer.
  - Number of players: a positive integer.
- Print:
  - Whole coins per player.
  - Coins left over.
- Use console input/output and basic math.

### Test Cases

| Coins | Players | Each | Left over |
| ----: | ------: | ---: | --------: |
|    23 |       4 |    5 |         3 |
|    20 |       4 |    5 |         0 |
|     3 |       5 |    0 |         3 |

### Debrief Prompts

- Which operator gives each player's share?
- Which operator gives the leftovers?
- Why did we require a positive number of players?

## Challenge 2: Buy a Potion — 5–8 minutes

- A potion costs 25 gold. Can the player buy one?
- Store the price in a constant.
- Store the player's gold in an int.
- If they have enough:
  - Subtract the price.
  - Print the remaining gold.
- Otherwise, print how much more gold they need.
- Assume nonnegative integer input.
- Test with `24`, `25`, and `26` gold.

### Debrief Prompts

- Why are these three inputs useful?
- What happens if you use `>` instead of `>=`?
- Where does the player's gold actually change?

### Optional Extension

- Ask for the player's full name using `std::getline` and include it in the purchase message.

## Challenge 3: Repair the Healing Function — 7–10 minutes

- Supply this program:

```cpp
#include <iostream>

void heal(int health, int amount) {
    health += amount;
}

int main() {
    int playerHealth{60};
    heal(playerHealth, 25);
    std::cout << playerHealth << '\n'; // Prints 60, but we want 85!
    return 0;
}
```

- Predict the output before running it.
- The player should gain health, but their health stays at 60.
- Repair it:
  - Return the updated health from `heal`.
  - Assign the returned value to `playerHealth`.
  - Cap the result at `100` using a `constexpr` maximum.
- Assume starting health is `0–100` and healing amounts are nonnegative.
- Test: `60 + 25` produces `85`; `90 + 25` produces `100`; `100 + 10` produces `100`.

### Debrief Prompts

- Which variable did the original function change?
- What happens if you return the result but do not assign it?
- Where did you put the maximum-health rule?

## Challenge 4: Turn Split the Loot into a Function — 5–10 minutes

- Return to the first program.
- Separate the calculation from the conversation with the user.
- Create this function above `main()`:

```cpp
int coinsPerPlayer(int totalCoins, int playerCount) {
    // Return each player's whole-number share.
}
```

- Keep prompts, input, and output in `main()`.
- Call the function using the entered values.
- Keep calculating leftovers in `main()` for now.
- Run the original three test cases again.
- The program's behaviour should stay the same.

### Debrief Prompts

- Could you call this function from a game that has no console?
- How could you test it with fixed values instead of typing input?
- Why return the share instead of printing it inside the function?

## Closing — 1 minute

- You've read input, calculated results, made decisions, and written functions in C++.
- You've also seen that changing a value parameter changes a local copy.
- Keep the notes open as a reference. You do not need to memorize every piece of syntax.
