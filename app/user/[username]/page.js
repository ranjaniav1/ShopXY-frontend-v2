import UserLayout from "@/app/Components/profile/UserLayout";

export default function UserProfilePage() {
  useEffect(() => {
    document.title = "ShopXY - User Profile";
  }, []);
  
  return <UserLayout />
}