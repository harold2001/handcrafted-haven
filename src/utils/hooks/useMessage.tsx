import React from 'react';
import {
  toast,
  ToastOptions,
  TypeOptions,
  ToastContentProps,
} from 'react-toastify';

export default function useMessage() {
  const options: ToastOptions = {
    theme: 'dark',
    closeButton: true,
  };

  const errorToast = (message: string) =>
    toast(message, {
      ...options,
      type: 'error' as TypeOptions,
      autoClose: 3000,
    });

  const succesToast = (message: string) =>
    toast(message, {
      ...options,
      type: 'success' as TypeOptions,
      autoClose: 3000,
    });

  /**
   * Displays a warning toast with an optional confirmation callback.
   * When a callback is provided, the toast will display a Confirm button,
   * and autoClose will be disabled until the user confirms.
   *
   * @param message - The warning message to display.
   * @param onConfirm - Optional callback executed after the user confirms.
   */
  const warningToast = (message: string, onConfirm?: () => void) => {
    toast(
      ({ closeToast }: ToastContentProps) => (
        <div>
          <div>{message}</div>
          {onConfirm && (
            <>
              <button
                className='btn-danger'
                style={{ marginTop: '8px', marginRight: '10px' }}
                onClick={() => {
                  onConfirm();
                  closeToast();
                }}
              >
                Confirm
              </button>
              <button className='btn-primary' onClick={() => closeToast()}>
                Cancel
              </button>
            </>
          )}
        </div>
      ),
      {
        ...options,
        type: 'warning' as TypeOptions,
        autoClose: onConfirm ? false : 3000,
      }
    );
  };

  return { errorToast, succesToast, warningToast };
}
