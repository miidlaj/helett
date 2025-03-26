"use client";

import Script from "next/script";
import React from "react";

const Document = () => {
  return (
    <>
      <Script id="chat-bot" strategy="afterInteractive" type="text/javascript">
        {`
  // Insert Tawk.to chat widget
  var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  (function(){
      var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/67a882ce825083258e126a7f/1ijl3ttqb';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1, s0);
  })();
  
        `}
      </Script>

      <Script
        id="remove-tawk-branding"
        strategy="afterInteractive"
        type="text/javascript"
      >
        {`
    var removeBranding = function() {
      try {
        var elements = document.querySelectorAll("div[class*='tawk-flex tawk-flex-center tawk-text-center tawk-padding-small']");
        
        elements.forEach(function(element) {
          if (element.querySelector("a[href*='tawk.to']")) {
            element.remove();
          }
        });
        
        var brandLinks = document.querySelectorAll("a[href*='tawk.to/?utm_source=tawk-messenger']");
        brandLinks.forEach(function(link) {
          var parentDiv = link.closest("div[class*='tawk-flex']");
          if (parentDiv) {
            parentDiv.remove();
          }
        });
      } catch (e) {
        console.log("Error removing Tawk branding:", e);
      }
    };
    
    removeBranding();
    var tick = 500;
    setInterval(removeBranding, tick);
  `}
      </Script>
    </>
  );
};

export default Document;
