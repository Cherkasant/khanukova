import styles from './ModalChat.module.css';

type ModalDeclinedType = {
  onClose: () => void;
};
export const ModalDeclined: React.FC<ModalDeclinedType> = ({ onClose }) => {
  return (
    <div className={styles.wrapDecl}>
      <h3 className={styles.title} style={{ marginBottom: '10px' }}>
        Pavel has declined your offer
      </h3>
      <div className={styles.mainText}>
        {'You can write to another team with a commercial proposal and find the best team! Good luck!'}
      </div>
      <button onClick={onClose} className={styles.btn} style={{ marginBottom: 0 }}>
        Close
      </button>
    </div>
  );
};
