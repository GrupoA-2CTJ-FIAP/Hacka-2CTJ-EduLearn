import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}