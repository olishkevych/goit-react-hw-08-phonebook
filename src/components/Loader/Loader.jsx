import { Oval } from 'react-loader-spinner';
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <Oval
      className={styles.loaderWrapper}
      height={80}
      width={80}
      color="#1622ce"
      wrapperStyle=""
      wrapperClass={styles.LoaderWrapper}
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#311c7a"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
