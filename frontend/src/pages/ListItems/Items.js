import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Items.module.scss';

const cx = classNames.bind(styles);

const Items = ({ title, slug, url, type }) => {
    return (
        <Link to={`/${type}/${slug}`} className={cx("block")}>
            <div className={cx("card")}>
                <div className={cx("header")}>
                    <div className={cx("box")}>
                        <div className={cx("image")} style={{backgroundImage: `url(${url})`}}>
                            <div className={cx("bg-color")}></div>
                            <div className={cx("button")}>{type === "game" ? "Play Game" : "Learn"}</div>
                        </div>
                        
                    </div>
                    <div className={cx("date")}>
                        <span>6 min ago</span>
                    </div>
                </div>
                <div className={cx("title")}>{title}</div>
            </div>
        </Link>
    )
};

export default Items;
