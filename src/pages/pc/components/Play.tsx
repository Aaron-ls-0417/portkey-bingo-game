import React, { Ref, useEffect, useImperativeHandle, useState } from 'react';

import { InputNumber } from 'antd';

import { BetType, StepStatus } from '@/hooks/useBingo';
import { Button, ButtonType } from '@/page-components/Button';
import { INITIAL_INPUT_VALUE, MAX_BET_VALUE } from '@/constants/global';

import styles from '@/styles/pc.module.css';

interface PlayProps {
  step: StepStatus;
  time: number;
  random: number;
  balanceValue: string;
  setBalanceInputValue: (value: string) => void;
  onPlay: (BetType) => void;
}

const Play: React.FC<PlayProps> = ({ step, time, random, setBalanceInputValue, balanceValue, onPlay }, ref) => {
  const [inputValue, setInputValue] = useState<string>(INITIAL_INPUT_VALUE);

  useEffect(() => {
    resetAmount();
  }, []);

  const resetAmount = () => {
    setBalanceInputValue(INITIAL_INPUT_VALUE);
    setInputValue(INITIAL_INPUT_VALUE);
  };

  const setAmount = (val: string) => {
    setBalanceInputValue(val);
    setInputValue(val);
  };

  return (
    <div>
      <div className={styles.contentWrapper}>
        <div className={styles.content__bg}>
          <div className={styles.content__wrapper}>
            {step === StepStatus.CUTDOWN && (
              <div className={styles.content__cutDown}>
                <div className={styles.content__cutDown_time}>{time}</div>
                <img style={{ width: '25.4rem' }} src={require('@source/sand_clock.png').default.src} />
              </div>
            )}

            {step === StepStatus.RANDOM && (
              <div className={styles.random}>
                <div className={styles.initBingoLogo}>
                  <div style={{ fontSize: '18rem' }} className={[styles.artWord, styles.randomNum].join(' ')}>
                    {random}
                  </div>
                </div>
              </div>
            )}

            {step === StepStatus.PLAY && (
              <>
                <img src={require('@source/question.png').default.src} />
                <div className={styles.content__right}>
                  <div className={styles.content__inputWrapper}>
                    <InputNumber
                      value={inputValue}
                      bordered={false}
                      precision={2}
                      className={styles.content__input}
                      onChange={(val) => {
                        setAmount(val);
                      }}
                      controls={false}></InputNumber>
                    <span>BET ELF</span>
                  </div>
                  <div className={styles.playContent__btnGroups}>
                    <button
                      onClick={() => {
                        resetAmount();
                      }}
                      className={[styles.playContent__btn, styles.button].join(' ')}>
                      MIN
                    </button>
                    <button
                      onClick={() => {
                        try {
                          const balance = Math.min(Number(balanceValue), MAX_BET_VALUE);
                          setAmount(`${Math.floor(balance)}`);
                        } catch (error) {
                          console.error('error', error);
                        }
                      }}
                      className={[styles.playContent__btn, styles.button].join(' ')}>
                      MAX
                      <span style={{ fontSize: '1.6rem', paddingLeft: '0.4rem' }}>{`(${MAX_BET_VALUE})`}</span>
                    </button>
                  </div>
                  <div className={styles.playContent__betBtnGroups}>
                    <Button
                      className={styles.playContent__betBtn}
                      type={ButtonType.ORANGE}
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
                      onClick={() => {
                        onPlay(BetType.SMALL);
                      }}>
                      <span className={styles.playContent__betBtn_p}>
                        <p className={styles.artWord}>SMALL</p>
                        <p>(0 - 127)</p>
                      </span>
                    </Button>
                  </div>
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
