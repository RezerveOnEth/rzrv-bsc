import styles from './Layout.module.css';

import {Route, Switch} from 'react-router-dom';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import Contract from 'web3';

import Status from '../../views/Status/Status';
import Swap from '../../views/Swap/Swap';
import Header from '../Header/Header';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

interface ILayout {
  windowWeb3: Web3 | undefined;
  ReserveExchange: any;
  Reserve: any;
  ReserveToken: any;
  web3Modal: Web3Modal;
  setWindowWeb3: Dispatch<SetStateAction<Web3 | undefined>>;
}

const Layout = ({windowWeb3, ReserveExchange, Reserve, ReserveToken, web3Modal, setWindowWeb3}: ILayout) => {
  const [ReserveExchangeContract, setReserveExchangeContract]: [Contract | undefined, Dispatch<SetStateAction<Contract | undefined>>] = useState();
  const [ReserveContract, setReserveContract]: [Contract | undefined, Dispatch<SetStateAction<Contract | undefined>>] = useState();
  const [ReserveTokenContract, setReserveTokenContract]: [Contract | undefined, Dispatch<SetStateAction<Contract | undefined>>] = useState();
  const [account, setAccount]: [string, Dispatch<SetStateAction<string>>] = useState('');

  useEffect(() => {
    (async () => {
      if (windowWeb3) {
        const ReserveExchangeAbi: any = ReserveExchange.abi;
        const _ReserveExchangeContract: any = await new windowWeb3.eth.Contract(ReserveExchangeAbi, ReserveExchange.address);
        setReserveExchangeContract(_ReserveExchangeContract);

        const ReserveAbi: any = Reserve.abi;
        const _ReserveContract: any = await new windowWeb3.eth.Contract(ReserveAbi, Reserve.address);
        setReserveContract(_ReserveContract);

        const ReserveTokenAbi: any = ReserveToken.abi;
        const _ReserveTokenContract: any = await new windowWeb3.eth.Contract(ReserveTokenAbi, ReserveToken.address);
        setReserveTokenContract(_ReserveTokenContract);
      }
    })();
  }, [Reserve.abi, Reserve.address, ReserveExchange.abi, ReserveExchange.address, ReserveToken.abi, ReserveToken.address, windowWeb3]);

  return (
    <div className={styles.Layout}>
      <Header
        windowWeb3={windowWeb3}
        web3Modal={web3Modal}
        setWindowWeb3={setWindowWeb3}
        setAccount={setAccount}
      />
      <Switch>
        <Route exact path="/">
          <Status
            windowWeb3={windowWeb3}
            ReserveExchangeContract={ReserveExchangeContract}
            ReserveContract={ReserveContract}
          />
        </Route>
        <Route exact path="/swap">
          <Swap
            windowWeb3={windowWeb3}
            ReserveExchangeContract={ReserveExchangeContract}
            ReserveTokenContract={ReserveTokenContract}
            account={account}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Layout;
