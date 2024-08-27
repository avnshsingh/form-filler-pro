import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import AboutMe from "./components/about-me";

const Popup: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isIconVisible, setIsIconVisible] = useState<boolean>(false);
  const [domain, setDomain] = useState<string>("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTabUrl = new URL(tabs[0].url!);
      const domainName = currentTabUrl.hostname;
      setDomain(domainName);
      chrome.storage.local.get(
        ["disabledDomains", "iconVisibility"],
        result => {
          const disabledDomains: string[] = result.disabledDomains || [];
          const iconVisibility = result.iconVisibility || {};

          setIsDisabled(disabledDomains.includes(domainName));
          setIsIconVisible(iconVisibility[domainName]);
        }
      );
    });
  }, []);

  const reloadTabAndClosePopup = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.reload(tabs[0].id!);
    });
    window.close();
  };

  const toggleEnableDisable = () => {
    chrome.storage.local.get(["disabledDomains"], result => {
      const disabledDomains: string[] = result.disabledDomains || [];
      const updatedDomains = isDisabled
        ? disabledDomains.filter(d => d !== domain)
        : [...disabledDomains, domain];

      chrome.storage.local.set({ disabledDomains: updatedDomains }, () => {
        reloadTabAndClosePopup();
      });
    });
  };

  const toggleIconVisibility = () => {
    chrome.storage.local.get(["iconVisibility"], result => {
      const iconVisibility = result.iconVisibility || {};
      iconVisibility[domain] =
        isIconVisible === undefined ? true : !isIconVisible;

      chrome.storage.local.set({ iconVisibility: iconVisibility }, () => {
        reloadTabAndClosePopup();
      });
    });
  };

  const openCustomizePage = () => {
    chrome.tabs.create({ url: "src/options.html" });
  };

  console.log("isIconVisible", isIconVisible);

  return (
    <div className="h-[450px] w-[300px] border-2 border-orange-200 flex flex-col gap-5 py-8 items-center">
      <Button variant={"default"} onClick={toggleEnableDisable}>
        {isDisabled ? "Enable on this page" : "Disable on this page"}
      </Button>
      <Button
        variant={"outline"}
        className="border-2 border-orange-500"
        onClick={toggleIconVisibility}
      >
        {isIconVisible
          ? "Hide icon in input fields"
          : "Show icon in input fields"}
      </Button>
      <Button
        variant="default"
        className="bg-orange-100 text-black hover:bg-orange-200"
        onClick={openCustomizePage}
      >
        Customize form fillings
      </Button>
      <div className="flex flex-col gap-1 justify-center">
        <p className="text-center font-semibold text-base">
          Check the video tutorial on how to use this properly
        </p>
        <Button variant="link" className="py-0">
          <a href="http://youtu.be" target="_blank">
            See Video
          </a>
        </Button>
        <AboutMe />
      </div>
    </div>
  );
};

export default Popup;
