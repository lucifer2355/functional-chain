import { useCallback, useState, useMemo } from "react";
import { Card } from "./UI/card";
import { Input } from "./UI/input";
import { Label } from "./UI/label";
import useDebounce from "../hooks/useDebounce";
import { Select, SelectOption } from "./UI/select";
import { functionsData } from "../data/functions-data";

interface FunctionCardProps {
  id: number;
  equation: string;
  svgPath: string;
  onEquationChange: (id: number, equation: string) => void;
  onInputChange: (input: number) => void;
}

export function FunctionCard({
  id,
  equation,
  svgPath,
  onEquationChange,
}: FunctionCardProps) {
  const [equationValue, setEquationValue] = useState<string>(equation);

  const debouncedEquation = useDebounce(equationValue, 500);

  const nextFunctionOptions: SelectOption[] = useMemo(() => {
    return functionsData
      .map((f) => ({
        value: f.id,
        label: `Function ${f.id}`,
      }))
      .filter((f) => f.value !== id);
  }, [functionsData]);

  //* Handler FUnction */
  const validateEquation = (equation: string): boolean => {
    // Allow only mathematical operations and 'x'
    const validChars = /^[x0-9+\-*/^()\s]*$/;
    return validChars.test(equation);
  };

  const error = useMemo(() => {
    if (!validateEquation(equationValue)) {
      return "Invalid equation. Please use only x, numbers, and basic operators (+, -, *, /, ^).";
    }

    return null;
  }, [debouncedEquation]);

  const equationChangeHandler = useCallback(
    (e: string) => {
      setEquationValue(e);

      onEquationChange(id, e);
    },
    [id, onEquationChange]
  );

  //* useEffect */

  return (
    <>
      {svgPath && (
        <svg className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-10'>
          <path d={svgPath} stroke='#0066FF4D' strokeWidth='4' fill='none' />
        </svg>
      )}
      <div className='flex items-end gap-4 function-card'>
        <Card className='relative flex flex-col'>
          <Card.Header>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <Label className='text-sm text-muted-foreground text-[#A5A5A5]'>
                  Function: {id}
                </Label>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col gap-1'>
                <div className=''>
                  <Label>Equation</Label>
                  <Input
                    value={equationValue}
                    onChange={(e) => equationChangeHandler(e)}
                    placeholder='Enter equation (e.g., x*2, x+5)'
                    className={error ? "border-red-500" : ""}
                  />
                  {error && <p className='text-red-500 text-sm'>{error}</p>}
                </div>
                <div>
                  <Select
                    label='Next Function'
                    value={
                      functionsData.find((f) => f.id === id)?.nextFunctionId ||
                      null
                    }
                    options={nextFunctionOptions}
                    disabled
                  />
                </div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <div className='relative w-[15px] h-[15px] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
                  <div className='w-[7px] h-[7px] bg-[#0066FF4D] rounded-full z-20 input'></div>
                </div>
                <span className='text-sm ml-1'>input</span>
              </div>
              <div className='flex items-center output'>
                <span className='text-sm mr-1'>output</span>
                <div className='relative w-[15px] h-[15px] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
                  <div className='w-[7px] h-[7px] bg-[#0066FF4D] rounded-full z-10 output'></div>
                </div>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
