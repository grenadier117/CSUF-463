/* istanbul ignore file */
/**
 * Asynchronously loads the component for PageNotFound
 */

import { lazyLoad } from 'utils/loadable';

export const PageNotFoundLoadable = lazyLoad(
  () => import('./pageNotFound'),
  module => module.PageNotFound,
);
