import {combineReducers} from 'redux';
import counterReducers from './CounterReducers';
import bookReducers from './BookReducers';
import pagodaReducers from './PagodaReducers';
import audioReducers from './AudioReducers';
import audioCategoryReducers from './AudioCategoryReducers';
import subAudioCategoryReducers from './SubAudioCategoryReducers';
import videoReducers from './VideoReducers';
import videoCategoryReducers from './VideoCategoryReducers';
import bookCollectionReducers from './BookCollectionReducers';
import playerReducers from './PlayerReducers';
import audioStorageReducers from './AudioStorageReducers';

const allReducers = combineReducers({
  counterReducers,
  bookReducers,
  pagodaReducers,
  audioReducers,
  audioCategoryReducers,
  subAudioCategoryReducers,
  videoReducers,
  videoCategoryReducers,
  bookCollectionReducers,
  playerReducers,
  audioStorageReducers,
});
export default allReducers;
