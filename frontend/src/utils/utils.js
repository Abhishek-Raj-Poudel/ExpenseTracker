import { toast } from "react-toastify";

export const success = (msg) => {
  toast.success(msg);
};

export const error = (msg) => {
  toast.error(msg);
};

export const warning = (msg) => {
  toast.warning(msg);
};

export const info = (msg) => {
  toast.info(msg);
};
