import type { ReactNode } from "react";
import TopHeader from "./TopHeader";
import Footer from "./Footer";

interface MasterLayoutProps {
  children: ReactNode;
}

const MasterLayout = ({ children }: MasterLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1">
        <TopHeader />
        <main className="center-container">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MasterLayout;
