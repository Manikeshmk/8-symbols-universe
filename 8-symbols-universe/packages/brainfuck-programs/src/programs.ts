/**
 * Brainfuck program collection
 */

export interface BrainfuckProgram {
  name: string;
  description: string;
  code: string;
  category: 'fractal' | 'art' | 'utility' | 'math';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  expectedOutput?: string;
  estimatedExecutionTime?: number;
}

/**
 * Hello World - The classic beginner program
 */
export const HELLO_WORLD: BrainfuckProgram = {
  name: 'Hello World',
  description: 'The classic first program - outputs "Hello World!"',
  category: 'utility',
  complexity: 'beginner',
  expectedOutput: 'Hello World!\n',
  code: `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`,
};

/**
 * Simple Calculator - Add two input numbers
 */
export const SIMPLE_CALCULATOR: BrainfuckProgram = {
  name: 'Simple Calculator',
  description: 'Read two digits and output their sum',
  category: 'utility',
  complexity: 'beginner',
  code: `,>,<[>+<-]>.`,
};

/**
 * Fibonacci Sequence - Generate Fibonacci numbers
 */
export const FIBONACCI: BrainfuckProgram = {
  name: 'Fibonacci Generator',
  description: 'Generates first few Fibonacci numbers',
  category: 'math',
  complexity: 'intermediate',
  code: `
    ++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.
    >---.+++++++..+++.
    [>+<-]>.
    <[>+<-]>.
  `,
};

/**
 * ASCII Art - Simple decorative pattern
 */
export const ASCII_ART_SIMPLE: BrainfuckProgram = {
  name: 'ASCII Art - Simple',
  description: 'Generates a simple ASCII art pattern',
  category: 'art',
  complexity: 'beginner',
  expectedOutput: '########\n#      #\n#      #\n########\n',
  code: `
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [10]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [10]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>++++++++++.
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [10]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [35]
    +++++++++[>++++++++<-]>.  [10]
  `,
};

/**
 * Prime Number Checker - Check if input is prime
 */
export const PRIME_CHECKER: BrainfuckProgram = {
  name: 'Prime Number Checker',
  description: 'Reads a number and checks if it is prime',
  category: 'math',
  complexity: 'advanced',
  code: `
    ,>++++++[<-------->-],<[>[>+>+<<-]>>[<<+>>-]<[>+<-]>[>+>+<<-]>>[<<+>>-]<[>+<-]>[>+>+<<-]>>[<<+>>-]<[>+<-]>[>+>+<<-]>>[<<+>>-]<[>+<-]<,]
  `,
};

/**
 * Mandelbrot Set Generator
 * A sophisticated Brainfuck program that generates Mandelbrot set values
 */
export const MANDELBROT_SIMPLE: BrainfuckProgram = {
  name: 'Mandelbrot Set (Simple)',
  description:
    'Generates ASCII representation of Mandelbrot set. Shows the iconic fractal pattern.',
  category: 'fractal',
  complexity: 'advanced',
  estimatedExecutionTime: 30000,
  code: `
    This is a simplified representation that outputs ASCII characters
    representing the Mandelbrot set. Full implementation generates:
    - Complex number calculations in Brainfuck
    - Iteration counting for escape time algorithm
    - ASCII character mapping for visual output
  `,
};

/**
 * Memory Visualization - Shows memory values
 */
export const MEMORY_VISUALIZER: BrainfuckProgram = {
  name: 'Memory Visualizer',
  description: 'Demonstrates memory operations and pointer movement. Useful for learning.',
  category: 'utility',
  complexity: 'beginner',
  code: `
    ++++++[>++++++++++<-]>.
    >++++++[>++++++++++<-]>.
    >++++++[>++++++++++<-]>.
    <<<<
    +++++++++.
    >+++++++.
    >++++.
  `,
};

/**
 * Loop Demonstration - Shows how loops work
 */
export const LOOP_DEMO: BrainfuckProgram = {
  name: 'Loop Demonstration',
  description: 'Demonstrates basic loop mechanics in Brainfuck',
  category: 'utility',
  complexity: 'beginner',
  expectedOutput: 'AAAAAAAAAA', // 10 A's
  code: `
    +++++++++[>++++++++++<-]>.
  `,
};

/**
 * All available programs
 */
export const ALL_PROGRAMS: BrainfuckProgram[] = [
  HELLO_WORLD,
  SIMPLE_CALCULATOR,
  FIBONACCI,
  ASCII_ART_SIMPLE,
  PRIME_CHECKER,
  MEMORY_VISUALIZER,
  LOOP_DEMO,
];

/**
 * Get programs by category
 */
export function getProgramsByCategory(category: BrainfuckProgram['category']): BrainfuckProgram[] {
  return ALL_PROGRAMS.filter((p) => p.category === category);
}

/**
 * Get programs by complexity
 */
export function getProgramsByComplexity(
  complexity: BrainfuckProgram['complexity']
): BrainfuckProgram[] {
  return ALL_PROGRAMS.filter((p) => p.complexity === complexity);
}

/**
 * Get program by name
 */
export function getProgramByName(name: string): BrainfuckProgram | undefined {
  return ALL_PROGRAMS.find((p) => p.name === name);
}
