import { BiTaskX } from "react-icons/bi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TiHome } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { format } from 'date-fns';

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = (user) => {
  const navigate = useNavigate();
  const { fetchUserProfile, userLoading } = useAuth();

  const logout = () => {
    localStorage.clear();
    Cookies.remove("token");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (!user.user) {
      const token = Cookies.get('token');
      if (token) {
        (async () => {
          try {
            await fetchUserProfile(token);
          } catch (error) {
            navigate('/login', { replace: true });
          }
        })();
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [user, fetchUserProfile, navigate]);
  

  return (
    <div className="flex flex-col w-full h-full items-center mt-20">
      <div>
        <Breadcrumb className="flex mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <div className="flex items-center">
                  <TiHome className="mr-2" />
                  Home
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-600">Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col w-[320px] xsm:w-[400px] sm:w-[600px] h-[250px] rounded-lg border shadow-lg py-10 p-4 xsm:p-10">
          <div className="flex justify-start items-center space-x-6 sm:space-x-10 mb-6">
            <img
              width="60"
              height="60"
              src="https://img.icons8.com/external-those-icons-fill-those-icons/96/external-User-users-those-icons-fill-those-icons-3.png"
              alt="external-User-users-those-icons-fill-those-icons-3"
              className="fill-gray-200"
            />
            {userLoading ? (
              <div className="flex flex-col w-full h-full space-y-2">
                <div className="flex w-full sm:w-[60%] h-[23px] animate-pulse bg-gray-200 rounded" />
                <div className="flex flex-row w-full sm:w-[60%] h-4">
                  <MdOutlineMailOutline className="flex mr-2" />
                  <div className="w-full sm:w-[60%] animate-pulse bg-gray-200 rounded" />
                </div>
                <div className="flex flex-row w-full sm:w-[60%] h-4">
                  <BiTaskX className="mr-2" />
                  <div className="w-full sm:w-[60%] animate-pulse bg-gray-200 rounded" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="font-bold text-lg xsm:text-2xl">{user.user?.username}</p>
                <p className="flex flex-row items-center text-[13px] line-clamp-1 w-full">
                  <MdOutlineMailOutline className="flex mr-2" />
                  {user.user?.email}
                </p>
                <p className="flex flex-row items-center text-[13px]">
                  <BiTaskX className="mr-2" />
                  {user.user?.createdAt ? format(new Date(user.user.createdAt), 'dd/MM/yyyy') : ''}
                </p>
              </div>
            )}
          </div>
          <hr className="w-full border" />
          <div className="flex justify-end items-end h-full space-x-10">
            <button
              onClick={() => logout()}
              className='flex items-center bg-zinc-900 text-white hover:bg-white hover:text-zinc-900 hover:border-zinc-900 border border-gray-50  py-1 px-4 rounded-lg'>
              <FiLogOut className='mr-2' />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile