import { Button, ButtonType } from '@/page-components/Button';

import styles from '@/styles/pc.module.css';

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {hasFinishBet ? (
        <div className={styles.bingoContentWrapper}>
          <div className={styles.bingoLogo}>
            <div style={{ fontSize: '18rem' }} className={[styles.artWord].join(' ')}>
              {radomNumber === Infinity ? '?' : radomNumber}
            </div>
          </div>
          <div className={styles.bingoContent__bg}>
            <div className={styles.bingoContent__wrapper}>
              <>
                <div className={styles.bingoTips}>
                  {isWin ? (
                    <img style={{ width: '51.6rem' }} src={require('@source/congratulations_pc.png').default.src} />
                  ) : (
                    <img style={{ width: '51.6rem' }} src={require('@source/lose_pc.png').default.src} />
                  )}
                  <div className={styles.bingoText}>
                    <span>{text}</span>
                    <span style={style}>{Math.abs(difference).toFixed(2)} ELF</span>
                  </div>
                </div>
                <Button
                  className={styles.bingoContent__betBtn}
                  type={ButtonType.ORANGE}
                  onClick={() => {
                    onBet();
                  }}>
                  <span className={styles.playContent__betBtn_p}>
                    <p style={{ fontSize: '4.8rem', fontWeight: 900 }} className={styles.artWord}>
                      BET
                    </p>
                  </span>
                </Button>
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          <div className={styles.content__bg}>
            <div className={styles.contentBingoInit__wrapper}>
              <div className={styles.initBingoLogo}>
                <div style={{ fontSize: '18rem' }} className={[styles.artWord].join(' ')}>
                  {radomNumber === Infinity ? '?' : radomNumber}
                </div>
              </div>
              <Button className={styles.bingoBtn} type={ButtonType.ORANGE} onClick={onBingo}>
                <p className={styles.artWord}>BINGO</p>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bingo;
