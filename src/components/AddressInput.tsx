import React, { InputHTMLAttributes } from 'react';
interface AddressInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}
const AddressInput = ({
  placeholder = 'Address',
  errorMessage,
  ...inputProps
}: AddressInputProps) => {
  return (
    <div>
      <div className="relative w-full">
        <input
          placeholder={placeholder}
          className="block h-12 w-full rounded-full px-4 py-2 border border-primary focus:outline-none focus:border-primary"
          {...inputProps}
        />
      </div>
      {errorMessage && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default AddressInput;
