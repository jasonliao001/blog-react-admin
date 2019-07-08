import Loadable from 'react-loadable';
import { view as Loader } from '../../components/loader';
import * as actions from './actions';
import reducer from './reducer';
const view = Loadable({
  loader: () => import('./view'),
  loading: Loader
});

export { actions, reducer, view };
