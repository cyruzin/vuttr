interface ModalProps {
  title: string;
  isOpen: boolean;
  children?: React.ReactNode;
  onCancel: () => void;
}

const Modal = (props: ModalProps) => {
  const { title, isOpen = false, onCancel, children } = props;

  return (
    <div
      style={{
        position: 'absolute',
        top: '20%',
        left: '30%',
        minWidth: 700,
        minHeight: 230,
        border: '2px solid white',
        backgroundColor: 'black',
        opacity: 0.9,
        color: 'white',
        padding: 5,
        display: isOpen ? 'block' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 5,
        }}
      >
        <div>{title}</div>
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {children}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingTop: 20,
            marginRight: 15,
            marginBottom: 10,
          }}
        >
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
