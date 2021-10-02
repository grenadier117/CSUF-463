import { Icon, Snackbar, SnackbarOrigin } from '@mui/material';
import React, { useEffect } from 'react';
interface SnackbarState extends SnackbarOrigin {
  snackOpen: boolean;
}

interface Props {
  snackOpen: boolean;
  message: string;
  image?: string;
  iconImage?: JSX.Element;
  autohideDuration?: number | null;
  onSnackClose?: () => void;
  vertical?: string;
  horizontal?: string;
  action?: JSX.Element;
  disableIcon?: boolean;
}

export const SnackBar = (props: Props) => {
  const [snackbarState, setSnackbarState] = React.useState<SnackbarState>({
    snackOpen: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const { snackOpen } = snackbarState;
  const { autohideDuration = 3000, onSnackClose, disableIcon = false } = props;

  useEffect(() => {
    setSnackbarState({ ...snackbarState, snackOpen: props.snackOpen });
    if (props.horizontal) {
      switch (props.horizontal) {
        case 'left':
          setSnackbarState({ ...snackbarState, horizontal: 'left' });
          break;
        case 'center':
          setSnackbarState({ ...snackbarState, horizontal: 'center' });
          break;
        case 'right':
          setSnackbarState({ ...snackbarState, horizontal: 'right' });
          break;

        default:
          setSnackbarState({ ...snackbarState });
      }
    }
    if (props.vertical) {
      switch (props.vertical) {
        case 'top':
          setSnackbarState({ ...snackbarState, vertical: 'top' });
          break;
        case 'bottom':
          setSnackbarState({ ...snackbarState, vertical: 'bottom' });
          break;

        default:
          setSnackbarState({ ...snackbarState });
      }
    }
  }, [props]);

  const handleSnackClose = () => {
    onSnackClose?.();
    setSnackbarState({ ...snackbarState, snackOpen: false });
  };

  const IconSection = () => {
    return props.iconImage ? (
      props.iconImage
    ) : (
      <Icon data-testid="render-icon">
        <img src={props.image} alt={props.message} />
      </Icon>
    );
  };

  const MessageSection = () => {
    return (
      <span style={{ paddingLeft: '12px' }} data-testid="render-message">
        {props.message}
      </span>
    );
  };

  return (
    <div>
      <Snackbar
        data-testid="render-snackBar"
        open={snackOpen}
        onClose={handleSnackClose}
        autoHideDuration={autohideDuration}
        message={
          <div>
            {!disableIcon && <IconSection />}
            <MessageSection />
          </div>
        }
        action={props.action}
      />
    </div>
  );
};
