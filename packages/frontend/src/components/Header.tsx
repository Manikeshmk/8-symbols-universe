import React from 'react';

export function Header() {
  return (
    <header className="border-b border-gray-700 bg-gradient-to-r from-dark-card to-dark-bg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue">
              8 Symbols Universe
            </h1>
            <p className="text-gray-400 mt-2">
              A visual Mandelbrot fractal generator powered by Brainfuck
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-neon-green">{`< > + - . , [ ]`}</div>
            <p className="text-gray-400 text-sm mt-1">The 8 symbols of infinite complexity</p>
          </div>
        </div>
      </div>
    </header>
  );
}
