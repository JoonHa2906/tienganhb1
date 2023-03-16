import classNames from 'classnames/bind';
import styles from './Testing.module.scss';

const cx = classNames.bind(styles);

function Testing() {
   return (<div>
   <h1 className={cx('title')}>Testing page</h1></div>);
}

export default Testing;
