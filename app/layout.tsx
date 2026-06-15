import "./globals.css";

export const metadata = {
  title: "AI Trading Journal",
  description: "AI Powered Trading Journal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}