import React, { useEffect, useState } from 'react';

import { InputNumber } from 'antd';

import { BetType, StepStatus } from '@/hooks/useBingo';
import { Button, ButtonType } from '@/page-components/Button';
import { INITIAL_INPUT_VALUE, MAX_BET_VALUE, TOKEN_UNIT } from '@/constants/global';

import styles from '@/styles/mobile.module.css';
import useCopy from '@/hooks/useCopy';

interface PlayProps {
  step?: StepStatus;
  time: number;
  random: number;
  balanceValue: string;
  accountAddress: string;
  setBalanceInputValue: (value: string) => void;
  onPlay: (BetType) => void;
  showModal: () => void;
}

export interface PlayHandle {
  resetAmount: () => void;
}

const Play: React.FC<PlayProps> = (
  { step, time, random, setBalanceInputValue, balanceValue, onPlay, showModal, accountAddress },
  ref,
) => {
  const [inputValue, setInputValue] = useState<string>(INITIAL_INPUT_VALUE);
  const { onCopy } = useCopy({ accountAddress });

  useEffect(() => {
    resetAmount();
  }, []);

  const resetAmount = () => {
    setBalanceInputValue(INITIAL_INPUT_VALUE);
    setInputValue(INITIAL_INPUT_VALUE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.centerPopup}>
        <div className={styles.playWrapper}>
          <div className={styles.playContent}>
            {step === StepStatus.CUTDOWN && (
              <div>
                <div className={styles.playContent__cutDown}>
                  <div className={styles.playContent__cutDown_time}>{time}</div>
                  <img style={{ width: '15rem' }} src={require('@source/sand_clock.png').default.src} />
                </div>
              </div>
            )}

            {step === StepStatus.RANDOM && (
              <div className={styles.random}>
                <div className={styles.bingoContent}>
                  <div className={styles.boardWrapper}>
                    <div style={{ fontSize: '9.6rem' }} className={[styles.artWord, styles.randomNum].join(' ')}>
                      {random}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === StepStatus.PLAY && (
              <>
                <div style={{ fontSize: '96px' }} className={[styles.boardWrapper, styles.artWord].join(' ')}>
                  ?
                </div>
                <div className={styles.playContent__input}>
                  <InputNumber
                    value={inputValue}
                    bordered={false}
                    precision={2}
                    className={styles.content__input}
                    onChange={(val) => {
                      setBalanceInputValue(val);
                      setInputValue(val);
                    }}
                    controls={false}
                  />
                  <span style={{ paddingRight: '8px' }}>BET</span>
                  <span>ELF</span>
                </div>

                <div className={styles.playContent__btnGroups}>
                  <button
                    onClick={() => {
                      setBalanceInputValue(INITIAL_INPUT_VALUE);
                      setInputValue(INITIAL_INPUT_VALUE);
                    }}
                    className={[styles.playContent__btn, styles.button].join(' ')}>
                    MIN
                  </button>
                  <button
                    onClick={() => {
                      try {
                        const balance = Math.min(Number(balanceValue), MAX_BET_VALUE);
                        setBalanceInputValue(`${Math.floor(balance)}`);
                        setInputValue(`${Math.floor(balance)}`);
                      } catch (error) {
                        console.error('error', error);
                      }
                    }}
                    className={[styles.playContent__btn, styles.button].join(' ')}>
                    MAX
                    <span style={{ fontSize: '10px', paddingLeft: '4px' }}>{`(${MAX_BET_VALUE})`}</span>
                  </button>
                </div>

                <div className={styles.playContent__betBtnGroups}>
                  <Button
                    className={styles.playContent__betBtn}
                    type={ButtonType.ORANGE}
                    isMobile
                    onClick={async () => {
                      onPlay(BetType.BIG);
                    }}>
                    <span className={styles.playContent__betBtn_p}>
                      <p className={styles.artWord}>BIG</p>
                      <p>(128 - 255)</p>
                    </span>
                  </Button>
                  <Button
                    className={styles.playContent__betBtn}
                    type={ButtonType.BLUE}
                    isMobile
                    onClick={() => {
                      onPlay(BetType.SMALL);
                    }}>
                    <span className={styles.playContent__betBtn_p}>
                      <p className={styles.artWord}>SMALL</p>
                      <p>(0 - 127)</p>
                    </span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
