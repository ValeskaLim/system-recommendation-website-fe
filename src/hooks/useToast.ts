import { toast, Bounce } from 'react-toastify';

export const useToast = () => {
  const config = {
    position: 'top-right' as const,
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored" as const,
    transition: Bounce
  };

  const successToast = (msg = 'Success!') => {
    toast.success(msg, config);
  };

  const errorToast = (msg = 'Something went wrong!') => {
    toast.error(msg, config);
  };

  const warningToast = (msg = 'Warning!') => {
    toast.warn(msg, config);
  };

  const infoToast = (msg = 'FYI...') => {
    toast.info(msg, config);
  };

  const darkToast = (msg = 'Dark toast!') => {
    toast.dark(msg, config);
  };

  return {
    successToast,
    errorToast,
    warningToast,
    infoToast,
    darkToast
  };
};
