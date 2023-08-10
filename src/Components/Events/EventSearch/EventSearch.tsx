import { useState } from 'react';
import moment from 'moment';

import { IEvent } from '../Events';
import { SearchIcon } from '../../../Assets/icons/SearchIcon';

import styles from './EventSearch.module.css';

interface EventSearchProps {
  events: Array<IEvent>;
}

const EventSearch = ({ events }: EventSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingEvents, setMatchingEvents] = useState<Array<IEvent>>([]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(value.toLowerCase()));
    setMatchingEvents(filteredEvents);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        placeholder="Search"
        className={styles.searchInput}
      />
      {matchingEvents.length > 0 && searchTerm && (
        <div className={styles.matchingEventsContainer}>
          {matchingEvents.map((event) => (
            <div key={event.title} className={styles.matchingEvent}>
              {moment(event.start).format('hA')} {event.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventSearch;
