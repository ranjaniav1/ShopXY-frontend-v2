import toast from "react-hot-toast";
import { Register } from "../Service/User";

export const handleChange = (setFormData) => (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handleFileChange = (setAvatar) => (e) => {
  setAvatar(e.target.files[0]);
};

export const handleSubmit = async (formData, avatar, setLoading, onClose) => {
  const { email, fullname, password, phone } = formData;
  // Validate full name
  if (!fullname) {
    return toast.error("Please fill in the full name.");
  }
  if (fullname.trim().length < 3) {
    return toast.error("Full name must be at least 3 characters.");
  }
  // Validate email
  if (!email) {
    return toast.error("Please fill in the email.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return toast.error("Invalid email format.");
  }

  // Validate password
  if (!password) {
    return toast.error("Please fill in the password.");
  }
  if (password.length < 6) {
    return toast.error("Password must be at least 6 characters.");
  }

  // Validate phone number
  if (!phone) {
    return toast.error("Please fill in the phone number.");
  }

  const phoneRegex = /^\d{10}$/; // Adjust to match your backend rules
  if (!phoneRegex.test(phone)) {
    return toast.error("Phone number must be 10 digits.");
  }

  // If all validations pass, proceed to submit
  setLoading(true);

  const formDataToSubmit = new FormData();
  Object.entries(formData).forEach(([key, value]) =>
    formDataToSubmit.append(key, value)
  );
  if (avatar) formDataToSubmit.append("avatar", avatar);

  try {
    const res = await Register(formDataToSubmit); // Backend call
    if (res?.success) {
      toast.success(res.message); // 🔥 Use message from backend
      onClose();
    } else {
      toast.error(res?.message);
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};






