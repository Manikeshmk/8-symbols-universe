/**
 * Command descriptions and documentation for educational purposes
 */

export const COMMAND_DESCRIPTIONS = {
  '>': {
    name: 'Pointer Right',
    symbol: '>',
    description: 'Move the data pointer one cell to the right',
    longDescription:
      'Increments the data pointer, which moves focus to the next memory cell. If you reach the end of allocated memory, the pointer wraps around or stops.',
    example: 'Code: >++. | Output: \\x02 (character with ASCII value 2)',
    usage: 'Navigate through memory cells to organize your data',
  },
  '<': {
    name: 'Pointer Left',
    symbol: '<',
    description: 'Move the data pointer one cell to the left',
    longDescription:
      'Decrements the data pointer, moving focus back to the previous memory cell. This allows you to revisit and modify previously set values.',
    example: 'Code: ++>++<. | Output: \\x02 (2, because we moved back)',
    usage: 'Return to previous memory cells to read or modify them',
  },
  '+': {
    name: 'Increment',
    symbol: '+',
    description: 'Increment the byte at the current data pointer',
    longDescription:
      'Adds 1 to the value in the current memory cell. Values wrap around: 255 + 1 = 0 (byte overflow).',
    example: 'Code: ++++. | Output: \\x04 (ASCII 4)',
    usage: 'Build up values for output or loop control',
  },
  '-': {
    name: 'Decrement',
    symbol: '-',
    description: 'Decrement the byte at the current data pointer',
    longDescription:
      'Subtracts 1 from the current memory cell. Values wrap around: 0 - 1 = 255 (byte underflow).',
    example: 'Code: -. | Output: \\xff (ASCII 255)',
    usage: 'Reduce values or create specific ASCII characters',
  },
  '.': {
    name: 'Output',
    symbol: '.',
    description: 'Output the byte at the current data pointer as an ASCII character',
    longDescription:
      'Outputs the current byte value as its ASCII character equivalent. Value 65 outputs "A", value 72 outputs "H", etc.',
    example:
      'Code: ++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++. | Output: "Hello World!"',
    usage: 'Display results and communicate output to the user',
  },
  ',': {
    name: 'Input',
    symbol: ',',
    description: 'Input a byte and store it at the current data pointer',
    longDescription:
      'Reads one byte from input (usually a character from user input or a file) and stores its ASCII value in the current memory cell.',
    example: 'Code: ,. | Input: "A" | Output: "A" (reads and echoes back)',
    usage: 'Accept user input or process external data',
  },
  '[': {
    name: 'Loop Start',
    symbol: '[',
    description: 'Begin a loop that continues until the current cell is 0',
    longDescription:
      'Marks the beginning of a loop. If the current cell is 0, execution jumps to the matching ]. If non-zero, execution continues into the loop. When ] is reached with a non-zero cell, control jumps back to [.',
    example: 'Code: +++[>++++<-] | Sets cell 0 to 0, cell 1 to 12 (3×4)',
    usage: 'Repeat operations until a condition is met',
  },
  ']': {
    name: 'Loop End',
    symbol: ']',
    description: 'End a loop and jump back to [ if current cell is non-zero',
    longDescription:
      'Marks the end of a loop. If the current cell value is non-zero, execution jumps back to the matching [. If the cell is 0, execution continues after ].',
    example: 'Combined with [: +++[>+<-] creates a decrement loop',
    usage: 'Complete a loop structure and control program flow',
  },
};

export function getCommandHelp(
  symbol: string
): (typeof COMMAND_DESCRIPTIONS)[keyof typeof COMMAND_DESCRIPTIONS] | null {
  return (COMMAND_DESCRIPTIONS as Record<string, any>)[symbol] || null;
}

export function getAllCommandDescriptions() {
  return COMMAND_DESCRIPTIONS;
}
