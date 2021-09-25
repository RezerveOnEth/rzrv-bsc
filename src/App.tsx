import styles from './App.module.css';
import ReserveExchange from './contracts/ReserveExchange.json';
import Reserve from './contracts/Reserve.json';
import ReserveToken from './contracts/ReserveToken.json';

import {BrowserRouter} from 'react-router-dom';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';

const App = () => {
  const [windowWeb3, setWindowWeb3]: [Web3 | undefined, Dispatch<SetStateAction<Web3 | undefined>>] = useState();
  const [isDarkMode, setIsDarkMode]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(Boolean(false));

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '57713afc30094d0e8470f83df3cf3e2a',
      }
    },
    qrcodeModalOptions: {
      mobileLinks: [
        'rainbow',
        'metamask',
        'argent',
        'trust',
        'imtoken',
        'pillar',
      ],
      package: WalletConnectQRCodeModal
    },
  };

  const web3Modal = new Web3Modal({
    // network: 'testnet',
    cacheProvider: true, // optional
    providerOptions // required
  });

  useEffect(() => {
    (async () => {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443')
      );

      setWindowWeb3(web3);

      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        setIsDarkMode(true);
      } else if (localStorage.getItem('theme') === 'light') {
        document.documentElement.setAttribute('data-theme', '');
        setIsDarkMode(false);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        setIsDarkMode(true);
      }
    })();
  }, []);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <div className={styles.App__grid}>
          <Navbar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <Layout
            windowWeb3={windowWeb3}
            ReserveExchange={ReserveExchange}
            Reserve={Reserve}
            ReserveToken={ReserveToken}
            web3Modal={web3Modal}
            setWindowWeb3={setWindowWeb3}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
