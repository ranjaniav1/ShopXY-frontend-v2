// registerUtils.js
import i18n from "@/app/i18n";
import { Register } from "@/app/Service/RegisterUser";
import toast from 'react-hot-toast';

export const handleChange = (setFormData) => (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handleFileChange = (setAvatar) => (e) => {
    setAvatar(e.target.files[0]);
};

export const handleSubmit = async (formData, avatar, setLoading, onClose) => {
    setLoading(true);
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataToSubmit.append(key, value));
    if (avatar) formDataToSubmit.append('avatar', avatar);

    try {
        await Register(formDataToSubmit);
        toast.success(i18n.t('User registered successfully'));
        onClose();
    } catch (error) {
        toast.error(error.response?.data?.message || i18n.t('Registration failed. Please try again.'));
    } finally {
        setLoading(false);
    }
};
