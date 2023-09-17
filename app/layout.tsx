"use client";
import "./globals.css";
import { Helmet } from "react-helmet";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";
import ToastNotificationComp from "@/components/ToastNotificationComp";
const inter = Inter({ subsets: ["latin"] });
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const specialPaths = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];
  const pathname = usePathname();
  const isSpecial = specialPaths.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider store={store}>
          <Helmet>
            <title>Fu-Dever Space</title>
            <meta name="description" content="FU-Dever Admin" />
          </Helmet>
          {!isSpecial && <Header />}
          {!isSpecial && <Sidebar />}
          {children}
          <ToastNotificationComp />
        </Provider>
      </body>
    </html>
  );
}
