import { EventEmitter } from './components/base/events';
import { ServiceModel } from './components/models/ServiceModel';
import './scss/styles.scss';
import { CDN_URL, API_URL } from './utils/constants';

const events = new EventEmitter();
const api = new ServiceModel(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})