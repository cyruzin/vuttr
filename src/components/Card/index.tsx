import Typography from '../Typography';

interface CardProps {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
  onRemove: (id: number) => void;
}

const Card = (props: CardProps) => {
  const { id, title, link, description, tags, onRemove } = props;

  return (
    <div style={{ marginBottom: 20, maxWidth: 700 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a style={{ fontSize: 20 }} href={link} target="_blank" rel="noreferrer">
          <Typography type="header-5">{title}</Typography>
        </a>{' '}
        <span style={{ cursor: 'pointer' }} onClick={() => onRemove(id)}>
          <strong>[remove]</strong>
        </span>
      </div>
      <div style={{ marginTop: 5 }}>
        <Typography type="body">{description}</Typography>
      </div>
      {Array.isArray(tags) ? (
        <Typography type="body-small">{tags.join(', ')}</Typography>
      ) : (
        <Typography type="body-smallest">{tags}</Typography>
      )}
    </div>
  );
};

export default Card;
