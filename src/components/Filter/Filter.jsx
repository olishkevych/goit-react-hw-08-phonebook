import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/reducers/filterSlice.js';
import { selectFilter } from 'redux/selectors';

import { Input } from 'antd';
import styles from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const onFilterInput = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={styles.wrapper}>
      <h3>Search contacts</h3>
      <Input
        placeholder="Start typing here..."
        onChange={onFilterInput}
        style={{ width: 200 }}
        name="filter"
        value={filter}
      />
    </div>
  );
};
