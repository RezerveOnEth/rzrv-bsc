import styles from './Vault.module.css';

interface IVault {
  currentVault: number;
  totalBurned: number;
}

const Vault = ({currentVault, totalBurned}: IVault) => {
  return (
    <div className={styles.Vault}>
      <div className={styles.Vault__column}>
        <span>Total No. Burned</span>
        <div className={styles.Vault__value}>
          <div>{new Intl.NumberFormat().format(totalBurned)}</div>
        </div>
      </div>
      <div className={styles.Vault__column}>
        <span>BUSD in Vault</span>
        <div className={styles.Vault__value}>
          <div>{new Intl.NumberFormat().format(Number(currentVault.toFixed(3)))}</div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
