import { openSans, robotoSlab } from "@/lib/fonts";
import ReduxProvider from "@/lib/redux/provider";
import Toast from "@/components/shared/Toast";
import { PersistAuth } from "@/utils";

export const metadata = {
  title: "Home | Vet Management",
  description: "Welcome home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning style={{ height: "100%" }}>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          backgroundColor: "#f0f0f0",
        }}
      >
        <ReduxProvider>
          <PersistAuth />
          <main>
            <Toast />
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
