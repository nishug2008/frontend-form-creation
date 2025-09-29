import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = {
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: true,
      draggable: true,
    });
  },
  error: (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: true,
      draggable: true,
    });
  },
  info: (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: true,
      draggable: true,
    });
  },
  warning: (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: true,
      draggable: true,
    });
  },
};

export default Toaster;
