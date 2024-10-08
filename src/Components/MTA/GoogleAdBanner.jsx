import React, { useEffect } from 'react';

const GoogleAdBanner = ({ adUnitPath, sizes, divId, targeting }) => {
  useEffect(() => {
    // Load the GPT script if not already present
    const loadGPTScript = () => {
      const gptScript = document.createElement('script');
      gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
      gptScript.async = true;
      document.body.appendChild(gptScript);
    };

    if (!window.googletag) {
      loadGPTScript();
    }

    window.googletag = window.googletag || { cmd: [] };

    // Initialize the ad slot
    window.googletag.cmd.push(() => {
      const slot = window.googletag
        .defineSlot(adUnitPath, sizes, divId)
        .addService(window.googletag.pubads());
        
      // Set optional targeting
      if (targeting) {
        for (const key in targeting) {
          slot.setTargeting(key, targeting[key]);
        }
      }

      window.googletag.pubads().enableSingleRequest();
      window.googletag.pubads().collapseEmptyDivs();
      window.googletag.enableServices();
    });

    // Display the ad slot
    if (window?.adsbygoogle) {
      console.log('window?.adsbygoogle loaded', window?.adsbygoogle);
      window.googletag.cmd.push(() => {
        window.googletag.display(divId);
      });
    }
  }, [divId]);

  return <div id={divId} style={{ minWidth: sizes[0][0], minHeight: sizes[0][1] }} />;
};

export default GoogleAdBanner;
