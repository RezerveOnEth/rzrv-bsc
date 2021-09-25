import styles from './Header.module.css';

import {Dispatch, SetStateAction, useState} from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';

interface IHeader {
  web3Modal: Web3Modal;
  setWindowWeb3: Dispatch<SetStateAction<Web3 | undefined>>;
  setAccount: Dispatch<SetStateAction<string>>;
  windowWeb3: any;
}

const Header = ({web3Modal, setWindowWeb3, setAccount, windowWeb3}: IHeader) => {
  const [isConnect, setIsConnect]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(Boolean(false));

  const resetApp = async () => {
    if (windowWeb3 && windowWeb3.currentProvider && windowWeb3.currentProvider.close) {
      await windowWeb3.currentProvider.close();
    }
    await web3Modal.clearCachedProvider();
    setAccount('');
    setIsConnect(false);
  };

  const subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on('close', () => resetApp());
    provider.on('accountsChanged', async (accounts: string[]) => {
      await setAccount(accounts[0]);
    });
  };

  const connectWeb3 = async () => {
    if (!isConnect) {
      const provider = await web3Modal.connect();

      await subscribeProvider(provider);

      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      setAccount(accounts[0]);
      setWindowWeb3(web3);

      setIsConnect(true);
    } else {
      await resetApp();
    }
  };

  return (
    <header className={styles.Header}>
      <button
        className={styles.Header__connect}
        onClick={connectWeb3}
      >{!isConnect ? 'Connect Wallet' : 'Disconnect'}</button>
    </header>
  );
};

export default Header;
