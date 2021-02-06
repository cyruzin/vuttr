import './Typography.scss';

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  type:
    | 'header-1'
    | 'header-2'
    | 'header-3'
    | 'header-4'
    | 'header-5'
    | 'body'
    | 'body-small'
    | 'body-smallest';
  children: React.ReactNode;
}

const Typography = (props: TypographyProps) => {
  const { type, children, ...rest } = props;

  return (
    <div className={type} {...rest}>
      {children}
    </div>
  );
};

export default Typography;
