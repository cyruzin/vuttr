import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  value: string;
  isChecked: boolean;
  onChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, name, label, value, isChecked = false, onChange, ...rest } = props;

  return (
    <>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        ref={ref}
        onChange={onChange}
        {...rest}
      />
      <label
        style={{
          fontFamily: `'Source Sans Pro', sans-serif`,
        }}
        htmlFor={id}
      >
        {label}
      </label>
      <br></br>
    </>
  );
});

export default Checkbox;
