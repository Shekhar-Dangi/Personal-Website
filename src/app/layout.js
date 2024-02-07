import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import "../../public/highlight/styles/default.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/provider/ThemeProvider";
import AuthProvider from "@/provider/AuthProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shekhar Dangi",
  description: "Delving deep into anything I find interesting!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />

                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
