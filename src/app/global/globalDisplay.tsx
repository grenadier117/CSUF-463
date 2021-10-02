import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { selectSnackBar, selectSnackBarOpen } from './Global.selectors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { globalSliceKey, globalReducer, globalActions } from './global.redux';
import { SnackBar } from 'app/components/snackbar';

export const GlobalDisplay = props => {
  useInjectReducer({ key: globalSliceKey, reducer: globalReducer });
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackBar);
  const open = useSelector(selectSnackBarOpen);

  const onSnackBarClose = () => {
    dispatch(globalActions.closeSnackBar());
    let interval;
    if (open) {
      interval = setTimeout(() => {
        dispatch(globalActions.popSnackBar());
      }, 500);
    }
    return () => clearTimeout(interval);
  };

  return (
    <React.Fragment>
      {props.children}
      <SnackBar
        open={open ?? false}
        message={snackbar?.message ?? ''}
        severity={snackbar.severity}
        handleClose={onSnackBarClose}
      />
    </React.Fragment>
  );
};
