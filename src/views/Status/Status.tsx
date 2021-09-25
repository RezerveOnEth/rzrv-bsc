import styles from './Status.module.css';

import Rate from '../../components/Rate/Rate';
import Total from '../../components/Total/Total';
import Vault from '../../components/Vault/Vault';
import Web3 from 'web3';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

interface IStatus {
  windowWeb3: Web3 | undefined;
  ReserveExchangeContract: any;
  ReserveContract: any;
}

const Status = ({windowWeb3, ReserveExchangeContract, ReserveContract}: IStatus) => {
  const [currentRate, setCurrentRate]: [number, Dispatch<SetStateAction<number>>] = useState(0);
  const [currentSupply, setCurrentSupply]: [number, Dispatch<SetStateAction<number>>] = useState(0);
  const [currentVault, setCurrentVault]: [number, Dispatch<SetStateAction<number>>] = useState(0);
  const [totalBurned, setTotalBurned]: [number, Dispatch<SetStateAction<number>>] = useState(0);

  useEffect(() => {
    (async () => {
      if (windowWeb3) {
        ReserveExchangeContract?.methods
          .currentSupply()
          .call()
          .then((result: number) => {
            setCurrentSupply(result / 1e9);
          });

        ReserveExchangeContract?.methods
          .floorPrice()
          .call()
          .then((result: number) => {
            setCurrentRate(result / 1e18);
          });

        ReserveExchangeContract?.methods
          .daiBalance()
          .call()
          .then((result: number) => {
            setCurrentVault(result / 1e18);
          });

        ReserveContract?.methods
          .balanceOf(await ReserveContract?.methods.burnAddress().call())
          .call()
          .then((result: number) => {
            setTotalBurned(Number((Number(String(result)) / 1e9).toFixed(0)));
          });
      }
    })();
  }, [ReserveContract?.methods, ReserveExchangeContract?.methods, totalBurned, windowWeb3]);

  return (
    <div className={styles.Status}>
      <div className={styles.Status__greeting}>
        <h1 className={styles.Status__title}>
          Welcome to <strong>THE VAULT.</strong>
        </h1>
        <h2 className={styles.Status__subtitle}>
          Please familiarize yourself with the Vault Swap contract prior to interacting with the vault.
        </h2>
      </div>
      <div className={styles.Status__widgets}>
        <Total
          currentSupply={currentSupply}
          totalBurned={totalBurned}
        />
        <Vault
          totalBurned={totalBurned}
          currentVault={currentVault}
        />
        <Rate
          currentRate={currentRate}
        />
      </div>
    </div>
  );
};

export default Status;
