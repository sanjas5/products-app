import { Snackbar } from "@mui/material";
import { useSnackbarStore } from "../store/useSnackbarStore";

const SnackbarComponent = () => {
  const { open, message, hideSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <div className="bg-[#4caf50] text-white p-2.5 rounded-sm">{message}</div>
    </Snackbar>
  );
};

export default SnackbarComponent;
