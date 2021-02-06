import { forwardRef } from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, onChange, ...rest } = props;

  return (
    <input
      type="text"
      className="input"
      name={name}
      onChange={onChange}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
