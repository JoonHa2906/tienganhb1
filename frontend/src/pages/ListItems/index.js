import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ReadingService from '~/services/reading.service';
import ListeningService from '~/services/listening.service';
import MatchimgvocaService from '~/services/matchimgvoca.service';
import styles from './ListItems.module.scss';
import Items from './Items';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const ListItems = ({ limit, titleName, type }) => {
   const [item, setItem] = useState();
   useEffect(() => {
      var ItemService;
      switch (type){
         case "reading":
            ItemService = ReadingService;
            break;
         case "listening":
            ItemService = ListeningService;
            break;
         case "game":
            ItemService = MatchimgvocaService;
            break;
         default: //"game"
            ItemService = MatchimgvocaService;
            
      }
      limit<1 ?
        (async (e) => {
            await ItemService.findAll() 
            .then((response) => {
                setItem(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        })() 
        :
        (async (e) => {
            await ItemService.findNew(limit)
            .then((response) => {
                setItem(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        })();
   }, [limit, type]);
   return (
   <div className={cx('content')}>
      <h1 className={cx('title')}>{titleName}</h1>
      {item ?
         <div className={cx('row')}>
               {item.map((itemSub, index)=>(
                  <div className={cx('col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12')} key={index}>
                     <Items 
                        key={index}
                        slug={itemSub.slug}
                        title={itemSub.title}
                        url = {itemSub.url}
                        type = {type}
                     />
                  </div>
               ))}
         </div>
         :
         <></>
      }
   </div>);
}

ListItems.propTypes = {
   limit: PropTypes.number.isRequired,
   titleName: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired //reading, listening, game
};
export default ListItems;
