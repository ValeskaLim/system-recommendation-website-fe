import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

interface MasterLayoutProps {
    children: ReactNode;
}

const MasterLayout = ({ children }: MasterLayoutProps) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <TopHeader />
                <main className="p-6 flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MasterLayout;