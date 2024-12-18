import React from "react";
import './globals.css'
import StyledComponentsRegistry from "@/contexts/css.context";
import Script from "next/script";
export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
      <html lang="ru" suppressHydrationWarning={true}>
      <Script async id="adv-counter" strategy="afterInteractive">
          window.yaContextCb=window.yaContextCb||[]
      </Script>
      <Script src="https://yandex.ru/ads/system/context.js" async></Script>
      <body suppressHydrationWarning={true}>
      <StyledComponentsRegistry>
          {children}
      </StyledComponentsRegistry>
      </body>
      <Script async id="metrika-counter" strategy="afterInteractive">
          {`   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(98706527, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });`
          }
      </Script>
      </html>
  )
}