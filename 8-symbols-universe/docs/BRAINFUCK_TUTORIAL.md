# Brainfuck Tutorial

## What is Brainfuck?

Brainfuck is an esoteric programming language created in 1993 by Urban Müller. Despite its name, it's a legitimate **Turing-complete** language that can compute anything a modern computer can compute.

The catch? It only has **8 symbols**.

## The 8 Symbols Explained

### 1. `>` - Move Pointer Right

**What it does:** Moves the data pointer one cell to the right in memory.

**How to think about it:** Imagine you have a tape with boxes, each containing a number. The pointer is your finger. `>` moves your finger one box to the right.

```
Before:  [0] [0] [0] [0]
         ↑ pointer

After:   [0] [0] [0] [0]
             ↑ pointer moved right
```

**Example:**

```
>+.  // Move right, increment, output
```

**Common Use:**

- Organizing data into different cells
- Separating variables

---

### 2. `<` - Move Pointer Left

**What it does:** Moves the data pointer one cell to the left in memory.

**How to think about it:** The opposite of `>`. Your finger moves one box to the left.

```
Before:  [0] [0] [0] [0]
             ↑ pointer

After:   [0] [0] [0] [0]
         ↑ pointer moved left
```

**Example:**

```
>+<.  // Move right, increment, move left, output
```

**Common Use:**

- Returning to a previous cell
- Copying values between cells

---

### 3. `+` - Increment

**What it does:** Adds 1 to the current cell.

**How to think about it:** Increase the number in your current box by 1.

```
Before:  [5]

After:   [6]
```

**Wraparound:** Values go from 0-255. When you increment 255, it wraps to 0.

```
Before:  [255]

After:   [0]  // Byte overflow
```

**Example:**

```
++++.  // Add 4, output (outputs ASCII character with value 4)
```

**Common Use:**

- Building up values
- Creating ASCII characters for output
- Loop counters

---

### 4. `-` - Decrement

**What it does:** Subtracts 1 from the current cell.

**How to think about it:** Decrease the number in your current box by 1.

```
Before:  [5]

After:   [4]
```

**Wraparound:** When you decrement 0, it wraps to 255.

```
Before:  [0]

After:   [255]  // Byte underflow
```

**Example:**

```
--.  // Subtract 2, output
```

**Common Use:**

- Counting down
- Zeroing out cells
- Decrementing loop counters

---

### 5. `.` - Output

**What it does:** Outputs the current cell value as an ASCII character.

**How to think about it:** Print out the character corresponding to the number in your current box.

```
[72] → outputs 'H' (ASCII 72)
[65] → outputs 'A' (ASCII 65)
[10] → outputs newline
```

**Example:**

```
++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++.
```

This outputs "ABC"

**Common ASCII Values:**

- 65-90: A-Z
- 97-122: a-z
- 48-57: 0-9
- 32: space
- 10: newline
- 33-47: punctuation

---

### 6. `,` - Input

**What it does:** Reads one byte from input and stores it in the current cell.

**How to think about it:** Listen for user input and store the character code in your current box.

```
User types: 'A'  (ASCII 65)
Cell becomes: [65]
```

**Example:**

```
,.  // Read input, output it (echo)
```

**Use Case:**

- User interaction
- Processing input data

---

### 7. `[` - Loop Start

**What it does:** Begins a loop. If the current cell is 0, **skip to after the matching `]`**.

**How to think about it:** "While this box is not zero, keep doing stuff."

```
Pseudocode:
WHILE cell != 0:
  [... do stuff ...]
```

**Matching:** Each `[` must have a matching `]`.

**Example:**

```
+++[>+++<-]>  // Set cell 0 to 3, cell 1 to 0
              // Loop while cell 0 != 0: move right, add 3 to cell 1, move left, decrement
              // Result: cell 1 = 3 × 3 = 9
```

---

### 8. `]` - Loop End

**What it does:** Ends a loop. If the current cell is **non-zero**, jump back to the matching `[`.

**How to think about it:** "If this box is still not zero, go back to the start of the loop."

```
Pseudocode:
IF cell != 0:
  JUMP BACK TO [
```

**Flow:**

```
Before:  [3] with instruction pointer at ]

After:   if [3] != 0: jump back to [
         Cell decrements each loop iteration

When:    [0] at ]: continue past ]
```

---

## Complete Example: Hello World

Let's trace through the famous "Hello World" program:

```
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
```

**Breakdown:**

1. `++++++++` - Set cell 0 to 8
2. `[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]` - Complex loop that sets up cells 1-4 with specific values
3. `>>.` - Move to cell 2, output (72 = 'H')
4. `>---.` - Move to cell 3, subtract 3, output (101 = 'e')
5. `+++++++..` - Add 7, output twice (108,108 = 'l','l')
6. `+++.` - Add 3, output (111 = 'o')
7. `>>.<-.<.` - Output space, then 'W'
8. `+++.` - Output 'o'
9. `------.` - Output 'r'
10. `--------.` - Output 'l'
11. `>>+.` - Output 'd'
12. `>++.` - Output '!'

**Output:** `Hello World!`

---

## Common Patterns

### 1. Clear a Cell

```
[-]  // While cell != 0, decrement
     // Result: cell = 0
```

### 2. Move a Value

```
[>+<-]  // While cell 0 != 0: move right, add, move left, subtract
        // Result: value moved from cell 0 to cell 1
        //         cell 0 becomes 0
```

### 3. Copy a Value

```
[>+>+<<-]>>[-<<+>>]
// First loop: copy to cells 1 and 2
// Second loop: move cell 2 back to cell 0
// Result: cell 0 and 1 both have original value
```

### 4. Multiply

```
>,[>++++[>++>+++>+++>+<<<<-]<-],<[>.++++++++++<]
// Read a number, multiply by various amounts
```

### 5. Conditional

```
[        // If cell 0 != 0
  [-]    // Clear it (set to 0)
  >++<   // Set cell 1 to 2
]        // If cell 0 was 0, cell 1 stays 0
```

---

## Optimization Tips

### 1. Consecutive Operations

```
++++++  // Can also be written as
++++++++>+++++++

// Same as:
++++++[>+<-]>+++++++
```

### 2. Use Variables Strategically

```
// DON'T move back and forth constantly
>>>>><<<<<>>>>>

// DO organize data logically
>>>>>  // Move once to destination
<<<<<  // Move back to source once
```

### 3. Pre-compute Values

```
// Instead of:
[>++++[>++>+++<<<<-]
 >+>+>->>+[<]<-]

// Pre-calculate and build the structure you need
```

---

## Mathematical Concepts

### Turing Completeness

Brainfuck is **Turing-complete**, meaning it can:

- Compute any computable function
- Simulate any other Turing-complete language
- Theoretically solve any computational problem (given infinite time and memory)

### Complexity of Brainfuck

Despite its simplicity, real programs are surprisingly complex:

- **Hello World:** 117 characters
- **Fibonacci:** ~200 characters
- **Mandelbrot Set:** 10,000+ characters

### Why is Mandelbrot in Brainfuck?

The Mandelbrot set requires:

1. Complex number arithmetic (a + bi)
2. Iterative calculation
3. Integer approximation
4. Memory management

All possible in Brainfuck, but requires incredible optimization:

```
For each pixel, calculate:
  c = (x + yi)
  z = 0
  iterations = 0

  WHILE |z| < 2 AND iterations < MAX:
    z = z² + c
    iterations++

  OUTPUT based on iterations
```

In Brainfuck, this becomes thousands of symbols.

---

## Visual Learning

### Memory State

```
Visual representation of memory during execution:

Cell:     0    1    2    3    4    5
Value:   [5]  [0] [10]  [0]  [2]  [0]
         ↑
       pointer

After ">":
Cell:     0    1    2    3    4    5
Value:   [5]  [0] [10]  [0]  [2]  [0]
             ↑
           pointer
```

### Execution Timeline

```
Instruction: +++++[>++++<-]>
Step 1:      [1] [0]  increment cell 0
Step 2:      [2] [0]  increment cell 0
Step 3:      [3] [0]  increment cell 0
Step 4:      [4] [0]  increment cell 0
Step 5:      [5] [0]  increment cell 0
Step 6:      [5] [0]  move to cell 1, check loop: cell 0 != 0, continue
Step 7:      [5] [4]  move right, add 4, result [4]
Step 8:      [4] [4]  move left, subtract
Step 9:      [5] [4]  move right... loop back to [
Step 10:     [5] [8]  second iteration
...
Step 22:     [0][20]  after 5 iterations, cell 0 = 0, exit loop
```

---

## Tips for Learning

1. **Start Small** - Begin with simple programs like `+++.`
2. **Trace Execution** - Write out memory state as you go
3. **Use Comments** - Write pseudo-code above your Brainfuck
4. **Build Blocks** - Learn patterns like clear (`[-]`), copy, move
5. **Debug Visually** - Use the 8 Symbols Universe to watch execution

---

## Further Reading

- [Brainfuck on Esolangs](https://esolangs.org/wiki/Brainfuck)
- [Brainfuck Interpreter Archive](http://www.muppetlabs.com/~breadbox/bf/)
- [Brainfuck Algorithms](https://github.com/apfeltee/bfdecomp/wiki)

---

**Remember:** In Brainfuck, simplicity is the ultimate sophistication. With only 8 symbols, you can express any algorithm. Master the basics, and you'll be amazed at what you can create.

🧠 Happy Brainfucking! 🎯
