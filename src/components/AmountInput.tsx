import { InputHTMLAttributes } from 'react';

interface AmountInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  onChangeNumber: (value: number | null) => void;
}
const AmountInput = ({
  placeholder = 'Token Amount',
  errorMessage,
  onChangeNumber,
  ...inputProps
}: AmountInputProps) => {
  return (
    <div>
      <div className="relative w-full">
        <input
          type="number"
          step="any"
          placeholder={placeholder}
          className="block h-12 w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
          {...inputProps}
          onChange={(e) => {
            const value = e.target.value;
            onChangeNumber(value ? parseFloat(value) : null);
          }}
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-2 text-gray-500  sm:text-sm"
          >
            <option>DAI</option>
          </select>
        </div>
      </div>
      {errorMessage && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default AmountInput;
