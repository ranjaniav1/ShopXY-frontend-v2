// registerUtils.js
import i18n from "@/app/i18n";
import toast from "react-hot-toast";
import { Register } from "../Service/User";

export const handleChange = (setFormData) => (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handleFileChange = (setAvatar) => (e) => {
  setAvatar(e.target.files[0]);
};

export const handleSubmit = async (formData, avatar, setLoading, onClose) => {
  setLoading(true);

  const formDataToSubmit = new FormData();
  Object.entries(formData).forEach(([key, value]) =>
    formDataToSubmit.append(key, value)
  );
  if (avatar) formDataToSubmit.append("avatar", avatar);

  try {
    const res = await Register(formDataToSubmit); // Await backend call
    if (res?.success) {
      toast.success(res.message); // 🔥 Use message from backend
      onClose();
    } else {
      toast.error(res?.message);
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message;
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};


