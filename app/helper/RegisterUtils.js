import toast from "react-hot-toast";
import { Register, SignupWithGoogle } from "../Service/User";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/fireConfig";

export const handleChange = (setFormData) => (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handleFileChange = (setAvatar) => (e) => {
  setAvatar(e.target.files[0]);
};

export const handleSubmit = async (formData, avatar, setLoading, onClose) => {
  const { email, fullname, password, phone } = formData;
  // Validate full name
  if (!fullname?.trim()) {
    return toast.error("Please fill in the full name.");
  }
  if (fullname.trim().length < 3) {
    return toast.error("Full name must be at least 3 characters.");
  }
  // Validate email
  if (!email.trim()) {
    return toast.error("Please fill in the email.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return toast.error("Invalid email format.");
  }

  // Validate password (backend requires uppercase, lowercase, number, min 6)
  if (!password) {
    return toast.error("Please fill in the password.");
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    return toast.error(
      "Password must be at least 6 characters and include uppercase, lowercase, and a number."
    );
  }

  // Validate phone number
  if (!phone?.trim()) {
    return toast.error("Please fill in the phone number.");
  }

  const phoneRegex = /^\d{10}$/; // Adjust to match your backend rules
  if (!phoneRegex.test(phone)) {
    return toast.error("Phone number must be 10 digits.");
  }

  // If all validations pass, proceed to submit
  setLoading(true);
  const formDataToSubmit = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    formDataToSubmit.append(key, typeof value === "string" ? value.trim() : value);
  });
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
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error || // if backend uses `.error`
      error?.message ||
      "Something went wrong";

    toast.error(errorMessage);
  }
  finally {
    setLoading(false);
  }
};





export const GoogleSignupButton = async (setUser,onClose) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User info:", user);
    // You can now use the user object to store user info in your app
    const saveUserInfo = await SignupWithGoogle(user);
    console.log("User info saved", saveUserInfo);
   setUser({ user: saveUserInfo.data.user });
    toast.success(saveUserInfo.message);
    // close modal after google signup
    onClose()
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    toast.error("Google signup failed.");
  }

}