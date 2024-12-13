import { useState, useMemo, useCallback } from "react";
import { FunctionCard } from "./function-card";
import { functionsData } from "../data/functions-data";
import { FunctionData } from "../types/function-data";
import { Input } from "./UI/input";
import useDebounce from "../hooks/useDebounce";
import { Tag } from "./UI/tag";

export function FunctionChain() {
  const FIRST_FUNCTION_ID = 1;

  //* State */
  const [functions, setFunctions] = useState<FunctionData[]>(functionsData);
  const [initialValue, setInitialValue] = useState<number>(2);

  const debouncedInitialValue = useDebounce(initialValue, 500);

  //* Handler Functions */
  const chainOrder = useMemo(() => {
    const order: number[] = [FIRST_FUNCTION_ID];

    for (let i = 0; i < functions.length; i++) {
      const nextFunctionId = functions[i].nextFunctionId;

      if (nextFunctionId) order.push(nextFunctionId);
    }

    return order;
  }, [functions]);

  const executeOperation = (expression, xValue) => {
    if (!expression) return 0;

    // Modify the expression to replace ${number}x with ${number}*x e.g. 2x => 2*x
    const modifyExpression = expression.replace(/(\d)(x)/gi, "$1*$2");

    // Replace x with the value
    const sanitizeExpression = modifyExpression.replace(/x/gi, xValue);

    try {
      // eval returns the result of the expression
      const result = eval(sanitizeExpression.replace("^", "**"));

      return result;
    } catch (error) {
      console.error("Error in executing expression", error);

      return null;
    }
  };

  const results = useMemo(() => {
    const r: number[] = [];
    let currentXValue = initialValue;

    for (let i = 0; i < chainOrder.length; i++) {
      const func = functions.find((f) => f.id === chainOrder[i]);

      if (!func) break;

      currentXValue = executeOperation(func.equation, currentXValue);
      r.push(currentXValue);
    }

    return r;
  }, [debouncedInitialValue, functions, chainOrder]);

  const onEquationChange = useCallback(
    (id: number, equation: string) => {
      setFunctions((prevData) =>
        prevData.map((func) => (func.id === id ? { ...func, equation } : func))
      );
    },
    [setFunctions]
  );

  //* Return JSX */
  return (
    <div className='relative'>
      {/* SVG Line */}
      <svg className='absolute top-0 left-0 w-full h-full pointer-events-none z-10'>
        <line
          x1={425}
          y1={226}
          x2={485}
          y2={224}
          stroke='#0066FF4D'
          strokeWidth='4'
        />
      </svg>

      {/* Main Content */}
      <div className='flex justify-center gap-4'>
        {/* Left Input */}
        <div className='flex flex-col self-center items-end mb-[12rem]'>
          <Tag text='Initial value of x' variant='orange' />
          <div className='mt-2 w-[7.1875rem]'>
            <Input
              value={initialValue}
              onChange={(e) => setInitialValue(Number(e))}
              placeholder='Enter initial value of x'
              className='h-fit border-2'
              variant='orange'
              isCircleVisible={true}
              circlePosition='right'
            />
          </div>
        </div>

        {/* Cards Container */}
        <div className='flex flex-wrap gap-24 justify-center w-[51%]'>
          {functionsData.map((func) => (
            <FunctionCard
              key={func.id}
              id={func.id}
              equation={func.equation}
              svgPath={func.lineDirection}
              onEquationChange={(id, equation) =>
                onEquationChange(id, equation)
              }
              input={initialValue}
              output={results[functionsData.length - 1]}
              onInputChange={setInitialValue}
            />
          ))}
        </div>

        <svg className='absolute top-0 right-0 w-full h-full pointer-events-none z-10'>
          <line
            x1={1437}
            y1={225}
            x2={1375}
            y2={224}
            stroke='#0066FF4D'
            strokeWidth='4'
          />
        </svg>

        {/* Right Input */}
        <div className='self-center mb-[12rem]'>
          <Tag text='Final Output y' variant='green' />
          <div className='mt-2 w-[7.1875rem]'>
            <Input
              value={results[functions.length - 1]?.toString()}
              onChange={(e) => setInitialValue(Number(e))}
              disabled
              className='h-fit border-2'
              variant='green'
              isCircleVisible={true}
              circlePosition='left'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
