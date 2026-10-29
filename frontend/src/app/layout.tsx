import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CanteenIQ — Campus Canteen Intelligence & Food-Waste Prevention",
  description: "Prepare Smarter. Waste Less. Serve Better. AI-powered campus canteen intelligence, menu optimization, demand forecasting, and food-waste prevention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="min-h-full flex flex-col text-slate-900 bg-[#f8faf8]">
        {children}
      </body>
    </html>
  );
}
