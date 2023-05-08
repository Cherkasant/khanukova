import classNames from 'classnames';

import styles from './Loader.module.css';

type LoaderType = {
  className: string;
};
const Loader: React.FC<LoaderType> = ({ className }) => {
  return (
    <div className={classNames(styles.ldsFacebook, className)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
