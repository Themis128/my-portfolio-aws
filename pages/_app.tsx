import { SiteLayout } from "@/components/layout/site-layout";
import { StoreProvider } from "@/components/store-provider";
import type { AppProps } from "next/app";
import ClientLayout from "./ClientLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ClientLayout>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </ClientLayout>
    </StoreProvider>
  );
}
