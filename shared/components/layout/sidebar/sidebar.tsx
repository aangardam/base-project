/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SidebarMenu from './sidebar-menu';
import useGetRoleAccess from '@/shared/hooks/use-get-role-access';
import { Separator } from '../../ui/separator';
import { useUserStore } from '@/shared/store/user.store';
import { useAuthentication } from '@/shared/store/logout.store';
import Image from 'next/image';
import { Skeleton } from '../../ui/skeleton';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const { logout } = useUserStore()
  const { setAuthenticated } = useAuthentication();
  const {
    // dataRoleAccess,
    // loadingRoleAccess,
    dataMenu,
    handleMouseEnter,
    handleMouseLeave,
    sidebarOpen, 
    setSidebarOpen
  } = useGetRoleAccess()

  // console.log(JSON.stringify(dataRoleAccess))

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    window.location.href = '/login';
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed inset-y-0 left-0 z-30 bg-gradient-to-r from-[#001a33] to-[#002b4d] overflow-y-auto scrollbar-hide text-white transform transition-all duration-300 ease-in-out lg:relative ${
          sidebarOpen ? "translate-x-0 w-80" : "-translate-x-full lg:translate-x-0 lg:w-24"
        }`}
      >
        <div className={`flex items-center gap-3 p-6 ${!sidebarOpen ? "justify-center" : ""} z-10`}>
          <div className="p-1 flex items-center justify-center">
            <Image 
              src="/base_project3.png"
              alt="logo" 
              width={34} 
              height={34} 
              className="object-contain"
            />
          </div>
          {sidebarOpen && (
            <h1 className="text-white font-semibold text-lg whitespace-nowrap">
              Base Project
            </h1>
          )}
        </div>
        <Separator className="bg-white/10 my-1"/>

        <div className="mt-2">
          <div className="flex flex-col">
            {dataMenu.map((item, index) => (
              <SidebarMenu key={index} menu={item} isOpen={sidebarOpen} />
            ))}
          </div>
          
        </div>
        
        {/* <div className="w-full">
          <Separator className="bg-white/10 my-1"/>
          <ul className="w-3/4 ml-2 mt-2">
            <li 
              className="flex items-center px-6 py-2 gap-3 hover:bg-blue-600 cursor-pointer rounded-md text-white transition-colors"
              onClick={handleLogout}
            >
              {sidebarOpen ? (
                <>
                  <FaSignOutAlt  className="h-4 w-4" />
                  <span className="text-sm md:text-lg font-medium cursor-pointer ml-2">Logout</span>
                </>
              ):<FaSignOutAlt  className="h-4 w-4" /> }
            </li>
          </ul>
        </div> */}
        
      </div>
    </>
  );
};

export default Sidebar;
