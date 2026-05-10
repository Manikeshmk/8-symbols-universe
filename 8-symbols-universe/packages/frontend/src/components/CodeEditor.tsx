import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../store';

export function CodeEditor() {
  const code = useAppStore((state) => state.code);
  const setCode = useAppStore((state) => state.setCode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="space-y-3">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        placeholder="Paste Brainfuck code here or select a preset..."
        className="w-full h-48 bg-dark-bg border border-neon-cyan rounded font-mono text-sm p-3 text-neon-cyan placeholder-gray-600 focus:outline-none focus:border-neon-magenta resize-none"
        spellCheck="false"
      />
      <div className="flex gap-2 text-xs">
        <span className="text-gray-500">Characters: {code.length}</span>
        <span className="text-gray-500">
          Valid commands: {code.split('').filter((c) => '<>+-.,[]\n'.includes(c)).length}
        </span>
      </div>
    </div>
  );
}
