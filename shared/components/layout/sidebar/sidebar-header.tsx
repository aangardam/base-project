/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/shared/components/ui/badge';
import { useUserStore } from '@/shared/store/user.store';

import Image from 'next/image';

type Props = {
    props: boolean;
};
const SidebarHeader = ({ props }: Props) => {
    const { user, role } = useUserStore();
    return (
        <div className="flex flex-col items-center w-full my-4 md:mt-5 mb-5 justify-center gap-3 border-b border-gray-300 pb-5">
            <div className="flex flex-col  gap-1 items-center">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden border border-gray-300 p-1">
                    <a href="/">
                        <Image
                            src="/logo.png"
                            alt="avatar"
                            width={100}
                            height={100}
                            className="object-contain w-full h-full "
                        />
                    </a>
                    
                </div>
                <div
                    className={
                        props ? 'flex flex-col ml-1 items-center' : 'hidden'
                    }
                >
                    <p className="font-bold text-2xl text-foreground">
                        Settler Web App
                    </p>

                    {user?.roles
                        ?.filter((item: any) => item.id === role)
                        .map((item: any) => (
                            <div
                                className="text-xs 
                               rounded-md items"
                                key={item.id}
                            >
                                <Badge variant={'secondary'}>
                                    {item.name} - {''}
                                    {user?.fullName}
                                </Badge>
                            </div>
                        ))}

                    {!role && (
                        <div
                            className="text-xs 
                               rounded-md "
                        >
                            <Badge variant={'secondary'}>
                                {user?.fullName} - {user?.roles[0]?.name}
                            </Badge>
                        </div>
                    )}
                    {/* <p className="text-xs unde">{user?.email}</p> */}
                </div>
            </div>
        </div>
    );
};

export default SidebarHeader;
