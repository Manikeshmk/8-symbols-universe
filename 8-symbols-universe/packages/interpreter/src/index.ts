/**
 * Main index - export all public APIs
 */

export { BrainfuckInterpreter, default } from './interpreter.js';
export type {
  InterpreterOptions,
  ExecuteOptions,
  ExecutionState,
  ExecutionResult,
  CompiledProgram,
  ValidationResult,
  DebugEvent,
} from './types.js';
export { COMMANDS, ALL_COMMANDS } from './types.js';
export { COMMAND_DESCRIPTIONS, getCommandHelp, getAllCommandDescriptions } from './commands.js';
