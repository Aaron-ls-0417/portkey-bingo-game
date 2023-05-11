import { useEffect, useState } from 'react';
import { message, Popover, Modal } from 'antd';
import { QRCode } from 'react-qrcode-logo';

import { copy, decorateBalanceText, QrCodeDataArrType } from '@/utils/common';
import { currentNetworkType } from '@/constants/network';

import styles from '@/styles/pc.module.css';

interface MenuPopProps {
  show: boolean;
  accountAddress?: string;
  balanceValue: string;
  QrCodeInfo?: QrCodeDataArrType;
}

const MenuPop: React.FC<MenuPopProps> = ({ show, balanceValue, accountAddress, QrCodeInfo = '' }) => {
  const [showMenuPop, setShowMenuPop] = useState<boolean>(false);

  useEffect(() => {
    setShowMenuPop(show);
  }, [show]);

  return (
    <Modal
      className={styles.menuPop}
      centered
      open={showMenuPop}
      onOk={() => setShowMenuPop(false)}
      onCancel={() => setShowMenuPop(false)}
      width={1000}
      closeIcon={<img style={{ width: '6.4rem' }} src={require('@source/close.png').default.src} />}
      footer={null}>
      <div className={styles.menuPop__wrapper}>
        <div className={styles.menuPop__wrapper_content}>
          <div className={[styles.setting__account, styles.menuPop__wrapper_account].join(' ')}>
            <div className={styles.setting__account__content}>
              <div>Account</div>
              <div style={{ width: '42rem', overflow: 'hidden' }}>
                {accountAddress?.length > 18
                  ? `${accountAddress.slice(0, 10)}...${accountAddress.slice(
                      accountAddress?.length - 10,
                      accountAddress?.length,
                    )}`
                  : accountAddress}
              </div>
              <button
                className={styles.setting__account__content__copy}
                onClick={() => {
                  copy(accountAddress);
                  message.success('Copied!');
                }}
              />

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
          <div className={styles.menuPop__wrapper_content_textContent}>
            <img src={require('@source/bitcoin.svg').default.src} />
            <div className={styles.menuPop__textContent_flex}>
              <div className={styles.menuPop__textContent_flex_top}>
                <span>ELF</span>
                <span>{decorateBalanceText(balanceValue)}</span>
              </div>
              <span style={{ color: '#707070', fontSize: '1.2rem' }}>{currentNetworkType}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MenuPop;
