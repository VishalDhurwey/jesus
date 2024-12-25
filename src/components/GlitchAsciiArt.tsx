import React, { useEffect, useState } from 'react';
import { asciiArt } from '../constants/asciiArt';

const GlitchAsciiArt: React.FC = () => {
  const [glitchText, setGlitchText] = useState('');

  const createGlitch = () => {
    const lines = asciiArt.split('\n');
    const glitchedLines = lines.map((line) => {
      if (Math.random() < 0.1) {
        const glitchChars = '⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏';
        const glitchStart = Math.floor(Math.random() * line.length);
        const glitchLength = Math.floor(Math.random() * 3) + 1;
        const glitched = Array.from({ length: glitchLength }, () => 
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join('');
        return line.slice(0, glitchStart) + glitched + line.slice(glitchStart + glitchLength);
      }
      return line;
    });
    return glitchedLines.join('\n');
  };

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(createGlitch());
    }, 150);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mx-auto">
      <pre className="text-green-500 text-[0.4rem] leading-[0.5rem] sm:text-[0.75rem] sm:leading-[1rem] whitespace-pre font-mono relative flex justify-center items-center -mt-3">
        <span className="relative inset-0 mix-blend-screen text-center">{glitchText}</span>
      </pre>
    </div>
  );
};

export default GlitchAsciiArt;
