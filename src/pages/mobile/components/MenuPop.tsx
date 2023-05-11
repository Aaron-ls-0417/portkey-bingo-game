import { useEffect, useState } from 'react';
import { message, Popover, Modal } from 'antd';
import { QRCode } from 'react-qrcode-logo';

import { copy, dealWithAccountAddressDisplay, decorateBalanceText, QrCodeDataArrType } from '@/utils/common';
import { currentNetworkType } from '@/constants/network';

import styles from '@/styles/mobile.module.css';
import useCopy from '@/hooks/useCopy';

interface MenuPopProps {
  show: boolean;
  accountAddress: string;
  balanceValue: string;
  QrCodeInfo: QrCodeDataArrType;
  logout: () => void;
  lock: () => void;
}

const MenuPop: React.FC<MenuPopProps> = ({ show, balanceValue, accountAddress, QrCodeInfo, logout, lock }) => {
  const [showMenuPop, setShowMenuPop] = useState<boolean>(false);
  const { onCopy } = useCopy({ accountAddress });

  useEffect(() => {
    setShowMenuPop(show);
  }, [show]);

  return (
    <Modal
      open={showMenuPop}
      onCancel={() => setShowMenuPop(false)}
      onOk={() => setShowMenuPop(false)}
      className={styles.ant__modal__body}
      closable={false}
      bodyStyle={{
        backgroundColor: 'transparent',
      }}
      footer={null}>
      <div className={styles.settingWrapper}>
        <div className={styles.setting__content}>
          <div className={styles.setting__account__module}>
            <div className={styles.setting__account__module__text}>{dealWithAccountAddressDisplay(accountAddress)}</div>
            <div className={styles.setting__account__module__copy} onClick={onCopy} />
            <Popover
              trigger={'click'}
              placement={'bottomLeft'}
              arrowPointAtCenter={false}
              content={() => (
                <div>
                  <QRCode
                    value={JSON.stringify(QrCodeInfo)}
                    size={175}
                    quietZone={0}
                    qrStyle={'squares'}
                    eyeRadius={{ outer: 7, inner: 4 }}
                    ecLevel={'L'}
                  />
                  <div className={styles.setting__qrcode__address}>{accountAddress}</div>
                </div>
              )}>
              <div className={styles.setting__account__module__qrcode} />
            </Popover>
          </div>
          <div className={styles.setting__balance__module}>
            <div className={styles.setting__balance__row}>
              <div className={styles.setting__balance__token__icon} />
              <div className={styles.setting__balance__content}>
                <div className={styles.setting__balance__content__title}>ELF</div>
                <div className={styles.setting__balance__content__subtitle}>{currentNetworkType}</div>
              </div>
              <div className={styles.setting__balance__current__wrapper}>
                <div className={styles.setting__balance__current__value}>{decorateBalanceText(balanceValue)}</div>
              </div>
            </div>
          </div>
          <div
            className={styles.setting__logout}
            onClick={() => {
              logout();
              setShowMenuPop(false);
            }}>
            <div className={styles.setting__logout__text}>Logout</div>
          </div>
          <div
            className={styles.setting__lock}
            onClick={() => {
              setShowMenuPop(false);
              lock();
            }}
          />
        </div>
        <img className={styles.settingBg} src={require('@source/frame_no_icon.png').default.src} />
        <div
          className={styles.modalClose}
          onClick={() => {
            setShowMenuPop(false);
          }}>
          <img className={styles.closeIcon} src={require('@source/close.png').default.src} />
        </div>
      </div>
    </Modal>
  );
};

export default MenuPop;
