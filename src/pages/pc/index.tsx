import React, { useState, useRef, ReactElement } from 'react';
import { SignIn, did, Unlock, SignInInterface } from '@portkey/did-ui-react';

import useBingo, { StepStatus, KEY_NAME, BetType } from '@/hooks/useBingo';
import Loading from '@/page-components/Loading';
import { CHAIN_ID } from '@/constants/network';
import LoginAndUnlock from './components/LoginAndUnlock';
import Bingo from './components/Bingo';
import Play from './components/Play';
import Header from './components/Header';
import MenuPop from './components/MenuPop';
import { DEFAULT_COUNTRY_CODE_CONFIG } from '@/constants/global';
import useAccount from '@/hooks/useAccount';

import styles from '@/styles/pc.module.css';

const PCBingoGame = () => {
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [showMenuPop, setShowMenuPop] = useState<boolean>(false);
  const [showUnlock, setShowUnlock] = useState<boolean>(false);
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false);

  const { setSignRef, setShowLogin } = useAccount();

  const {
    onBet,
    onBingo,
    onPlay,
    unLock,
    login,
    logOut,
    lock,
    step,
    random,
    balanceValue,
    setBalanceInputValue,
    getBalance,
    isWin,
    difference,
    result,
    hasFinishBet,
    initContract,
    loading,
    time,
    getQrInfo,
    accountAddress,
    loadingExtraDataMode,
  } = useBingo();

  const renderScene = () => {
    switch (step) {
      case StepStatus.INIT:
      case StepStatus.LOCK:
      case StepStatus.LOGIN:
        return (
          <LoginAndUnlock
            step={step}
            showUnlockModal={() => {
              setShowUnlock(true);
            }}
            showLoginModal={() => {
              setShowLogin(true);
            }}></LoginAndUnlock>
        );
      case StepStatus.CUTDOWN:
      case StepStatus.RANDOM:
      case StepStatus.PLAY:
        return (
          <Play
            step={step}
            time={time}
            random={random}
            balanceValue={balanceValue}
            setBalanceInputValue={setBalanceInputValue}
            onPlay={onPlay}></Play>
        );
      case StepStatus.BINGO:
        return (
          <Bingo
            isWin={isWin}
            difference={difference}
            radomNumber={result}
            hasFinishBet={hasFinishBet}
            onBet={onBet}
            onBingo={onBingo}></Bingo>
        );
      default:
        break;
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.bodyWrapper}>
        <Loading loading={loading} extraDataMode={loadingExtraDataMode} />
        {![StepStatus.INIT, StepStatus.LOCK, StepStatus.LOGIN, StepStatus.END].includes(step) && (
          <Header
            accountAddress={accountAddress}
            balanceValue={balanceValue}
            lock={lock}
            logOut={logOut}
            getBalance={getBalance}
            setShowMenuPop={setShowMenuPop}
            QrCodeInfo={getQrInfo()}></Header>
        )}
        {renderScene()}

        <MenuPop
          show={showMenuPop}
          balanceValue={balanceValue}
          accountAddress={accountAddress}
          QrCodeInfo={getQrInfo()}></MenuPop>

        <SignIn
          ref={(ref: SignInInterface) => {
            setSignRef(ref);
          }}
          sandboxId="portkey-ui-sandbox"
          defaultChainId={CHAIN_ID}
          phoneCountry={DEFAULT_COUNTRY_CODE_CONFIG}
          uiType="Modal"
          isShowScan={false}
          onFinish={async (wallet) => {
            console.log('SignIn onFinish==', wallet);
            await login(wallet);
            setShowLogin(false);
            initContract();
          }}
          onError={(err) => {
            console.error('onError==', err);
          }}
          onCancel={() => {
            setShowLogin(false);
          }}
        />
        <Unlock
          open={showUnlock}
          value={passwordValue}
          isWrongPassword={invalidNumber}
          onChange={(passwordVal) => {
            setPasswordValue(passwordVal);
          }}
          onCancel={() => {
            setShowUnlock(false);
          }}
          onUnlock={async () => {
            const localWallet = await did.load(passwordValue, KEY_NAME);
            if (!localWallet.didWallet.accountInfo.loginAccount) {
              setInvalidNumber(true);
              return;
            }
            console.log('Unlock onFinish==', localWallet);
            await unLock(localWallet);
            setInvalidNumber(false);
            setPasswordValue('');
            setShowUnlock(false);
          }}
        />
      </div>
    </div>
  );
};
export default PCBingoGame;
