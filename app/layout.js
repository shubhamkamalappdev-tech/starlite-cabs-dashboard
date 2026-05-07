import AuthProvider from "../components/AuthProvider";

export const metadata = {
  title: "Starlite Cabs",
  description:
    "Fleet Management"
};

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background:
            "#050816"
        }}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}