import { Popover } from 'antd';
import { QRCode } from 'react-qrcode-logo';

import { decorateBalanceText, QrCodeDataArrType } from '@/utils/common';
import useCopy from '@/hooks/useCopy';

import styles from '@/styles/pc.module.css';

interface HeaderProps {
  accountAddress: string;
  balanceValue: string;
  QrCodeInfo: QrCodeDataArrType;
  lock: () => void;
  logOut: () => void;
  getBalance: () => void;
  setShowMenuPop: (boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  setShowMenuPop,
  lock,
  balanceValue,
  accountAddress,
  QrCodeInfo,
  logOut,
  getBalance,
}) => {
  const { onCopy } = useCopy({ accountAddress });

  return (
    <div className={styles.settingHeader}>
      <img
        className={[styles.setting__menu, styles.btn].join(' ')}
        src={require('@source/menu_pc.png').default.src}
        onClick={() => {
          setShowMenuPop(true);
        }}
      />
      <div className={styles.setting__balance}>
        <div className={styles.setting__balance__content}>
          <div style={{ width: '100%', fontSize: '2.4rem' }}>{decorateBalanceText(balanceValue)} ELF</div>
          <button
            className={styles.btn}
            onClick={() => {
              getBalance();
            }}
          />
        </div>
      </div>
      <div className={styles.setting__account}>
        <div className={styles.setting__account__content}>
          <div>Account</div>
          <div style={{ width: '40rem', overflow: 'hidden' }}>
            {accountAddress?.length > 18
              ? `${accountAddress.slice(0, 10)}...${accountAddress.slice(
                  accountAddress?.length - 10,
                  accountAddress?.length,
                )}`
              : accountAddress}
          </div>
          <button className={styles.setting__account__content__copy} onClick={onCopy} />

          <Popover
            content={() => (
              <QRCode
                value={JSON.stringify(QrCodeInfo)}
                size={200}
                quietZone={0}
                qrStyle={'squares'}
                eyeRadius={{ outer: 7, inner: 4 }}
                ecLevel={'L'}
              />
            )}>
            <div className={styles.setting__account__content__qrcode} />
          </Popover>
        </div>
      </div>
      <button className={styles.setting__logout} onClick={logOut}>
        Logout
      </button>
      <img
        className={[styles.setting__lock, styles.btn].join(' ')}
        src={require('@source/lock.png').default.src}
        onClick={() => {
          lock();
        }}
      />
    </div>
  );
};

export default Header;
