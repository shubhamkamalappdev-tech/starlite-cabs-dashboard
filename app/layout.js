export const metadata = {
  title: "Starlite Cabs Dashboard",
  description: "Taxi business dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
