import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, Percent } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (operator: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + operator + ' ');
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      const sanitizedEquation = fullEquation
        .replace('×', '*')
        .replace('÷', '/');
      const result = eval(sanitizedEquation);
      setDisplay(Number(result.toFixed(8)).toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handlePercent = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const handleDelete = () => {
    setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
  };

  const Button = ({ children, onClick, className = '' }: any) => (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl text-lg font-semibold transition-all duration-200 
      hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl w-full max-w-xs">
      <div className="mb-4 text-right">
        <div className="text-gray-300 text-sm h-6">{equation}</div>
        <div className="text-3xl font-bold text-white break-all">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <Button 
          onClick={clear} 
          className="bg-red-500/80 text-white hover:bg-red-600/80"
        >
          AC
        </Button>
        <Button 
          onClick={handleDelete} 
          className="bg-gray-500/80 text-white hover:bg-gray-600/80"
        >
          <Delete size={20} />
        </Button>
        <Button 
          onClick={handlePercent}
          className="bg-gray-500/80 text-white hover:bg-gray-600/80"
        >
          <Percent size={20} />
        </Button>
        <Button 
          onClick={() => handleOperator('÷')}
          className="bg-amber-500/80 text-white hover:bg-amber-600/80"
        >
          <Divide size={20} />
        </Button>

        {[7, 8, 9].map((num) => (
          <Button 
            key={num} 
            onClick={() => handleNumber(num.toString())}
            className="bg-white/20 text-white hover:bg-white/30"
          >
            {num}
          </Button>
        ))}
        <Button 
          onClick={() => handleOperator('×')}
          className="bg-amber-500/80 text-white hover:bg-amber-600/80"
        >
          <X size={20} />
        </Button>

        {[4, 5, 6].map((num) => (
          <Button 
            key={num} 
            onClick={() => handleNumber(num.toString())}
            className="bg-white/20 text-white hover:bg-white/30"
          >
            {num}
          </Button>
        ))}
        <Button 
          onClick={() => handleOperator('-')}
          className="bg-amber-500/80 text-white hover:bg-amber-600/80"
        >
          <Minus size={20} />
        </Button>

        {[1, 2, 3].map((num) => (
          <Button 
            key={num} 
            onClick={() => handleNumber(num.toString())}
            className="bg-white/20 text-white hover:bg-white/30"
          >
            {num}
          </Button>
        ))}
        <Button 
          onClick={() => handleOperator('+')}
          className="bg-amber-500/80 text-white hover:bg-amber-600/80"
        >
          <Plus size={20} />
        </Button>

        <Button 
          onClick={() => handleNumber('0')}
          className="bg-white/20 text-white hover:bg-white/30 col-span-2"
        >
          0
        </Button>
        <Button 
          onClick={() => handleNumber('.')}
          className="bg-white/20 text-white hover:bg-white/30"
        >
          .
        </Button>
        <Button 
          onClick={calculate}
          className="bg-amber-500/80 text-white hover:bg-amber-600/80"
        >
          <Equal size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Calculator;