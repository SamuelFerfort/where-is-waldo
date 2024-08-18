import { Toaster } from "react-hot-toast";

const StyledToaster = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "",
        style: {
          background: "#333",
          color: "#fff",
        },
        success: {
          className: "border-t-4 border-green-500",
          style: {
            background: "#333",
          },
        },
        error: {
          className: "border-t-4 border-red-500",
          style: {
            background: "#333",
          },
        },
      }}
    />
  );
};

export default StyledToaster