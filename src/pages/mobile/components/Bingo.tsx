import { Button, ButtonType } from '@/page-components/Button';

import styles from '@/styles/mobile.module.css';

interface BingoProps {
  isWin: boolean;
  hasFinishBet: boolean;
  radomNumber: number;
  difference: number;
  onBingo: () => void;
  onBet: () => void;
}

const Bingo: React.FC<BingoProps> = ({ isWin, hasFinishBet, radomNumber, difference, onBingo, onBet }) => {
  const text = isWin ? 'You Win' : 'You Lose';
  const style = isWin
    ? {
        color: '#2E6BC7',
        background: '#C5DFFF',
      }
    : {
        color: '#D63333',
        background: '#FFCB9B',
      };
  return (
    <div className={styles.container}>
      <div className={styles.centerPopup}>
        <div className={styles.playWrapper}>
          <div className={styles.playContent}>
            <div className={styles.bingoContent}>
              <div style={{ fontSize: '96px' }} className={[styles.boardWrapper, styles.artWord].join(' ')}>
                {radomNumber === Infinity ? '?' : radomNumber}
              </div>
              {hasFinishBet ? (
                <>
                  <div className={styles.bingoTips}>
                    {isWin ? (
                      <img src={require('@source/congratulation.png').default.src} />
                    ) : (
                      <img src={require('@source/lose.png').default.src} />
                    )}
                    <div className={styles.bingoText}>
                      <span>{text}</span>
                      <span style={style}>{Math.abs(difference).toFixed(2)} ELF</span>
                    </div>
                  </div>
                  <Button
                    className={styles.playContent__betBtn}
                    type={ButtonType.ORANGE}
                    isMobile
                    onClick={() => {
                      onBet();
                    }}>
                    <span className={styles.playContent__betBtn_p}>
                      <p style={{ fontSize: '24px' }} className={styles.artWord}>
                        BET
                      </p>
                    </span>
                  </Button>
                </>
              ) : (
                <Button isMobile className={styles.playContent__betBtn} type={ButtonType.ORANGE} onClick={onBingo}>
                  <span className={styles.playContent__betBtn_p}>
                    <p style={{ fontSize: '24px' }} className={styles.artWord}>
                      BINGO
                    </p>
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bingo;
