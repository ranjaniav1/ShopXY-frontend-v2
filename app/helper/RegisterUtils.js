import toast from "react-hot-toast";
import { Register, SignupWithGoogle } from "../Service/User";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { auth, provider } from "../firebase/fireConfig";

/** Handle input change for form fields */
export const handleChange = (setFormData) => (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

/** Handle avatar upload */
export const handleFileChange = (setAvatar) => (e) => {
  setAvatar(e.target.files[0]);
};

/** Handle form submit */
export const handleSubmit = async (formData, avatar, setLoading, onClose, setUser) => {
  const { email, fullname, password, phone } = formData;

  // ✅ Basic validations
  if (!fullname?.trim()) return toast.error("Please fill in the full name.");
  if (fullname.trim().length < 3) return toast.error("Full name must be at least 3 characters.");

  if (!email?.trim()) return toast.error("Please fill in the email.");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return toast.error("Invalid email format.");

  if (!password) return toast.error("Please fill in the password.");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    return toast.error(
      "Password must be at least 6 characters and include uppercase, lowercase, and a number."
    );
  }

  if (!phone?.trim()) return toast.error("Please fill in the phone number.");
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) return toast.error("Phone number must be 10 digits.");

  // ✅ Submit data
  setLoading(true);
  const formDataToSubmit = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    formDataToSubmit.append(key, typeof value === "string" ? value.trim() : value);
  });
  if (avatar) formDataToSubmit.append("avatar", avatar);

  try {
    const res = await Register(formDataToSubmit);
    if (res?.success) {
      toast.success(res.message);
      if (res?.data?.user) {
        setUser(res.data.user); // ✅ Set user in context
      }
      onClose();
    } else {
      toast.error(res?.message || "Registration failed.");
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

/** Google Signup */
export const GoogleSignupButton = async (setUser, onClose) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const saveUserInfo = await SignupWithGoogle(user);
    if (saveUserInfo?.success) {
      setUser(saveUserInfo.data?.user); // ✅ Save to context
      toast.success(saveUserInfo.message);
      onClose();
    } else {
      toast.error(saveUserInfo.message || "Google signup failed.");
    }
  } catch (error) {
    console.error("Google signup error:", error);
    toast.error("Google signup failed.");
  }
};
