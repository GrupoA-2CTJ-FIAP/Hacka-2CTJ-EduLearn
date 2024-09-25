import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <Header />
                {children}
                <Footer />
            </div >
        </>
    );
}