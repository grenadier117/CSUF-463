import React from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;

interface TextFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  type?: 'email' | 'password' | 'text';
  textarea?: boolean;
}

const TextField = React.forwardRef<InputElement, TextFieldProps>(({ onChange, textarea = false, ...rest }, ref) => {
  const InputElement = textarea ? 'textarea' : 'input';
  return (
    <InputElement
      ref={ref as any}
      className={`rounded-md w-full border border-gray-400 p-3 mb-5 ${textarea ? 'h-100' : ''}`}
      onChange={({ target: { value } }: InputChangeEvent) => onChange(value)}
      {...rest}
    />
  );
});
TextField.displayName = 'TextField';
export default TextField;
