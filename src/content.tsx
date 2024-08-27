chrome.storage.local.get(
  ["formFields", "disabledDomains", "iconVisibility"],
  result => {
    const formFields = result.formFields || [];
    const disabledDomains = result.disabledDomains || [];
    const iconVisibility = result.iconVisibility || {};

    const currentDomain = window.location.hostname;

    // If the extension is disabled on this domain, exit
    if (disabledDomains.includes(currentDomain)) return;

    const isIconVisible = iconVisibility[currentDomain];

    document
      .querySelectorAll(
        'input[type="text"], input[type="email"], input[type="password"], textarea'
      )
      .forEach((input: any) => {
        if (isIconVisible) {
          input.style.position = "relative";
          const wrapper = document.createElement("div");
          wrapper.style.position = "absolute";
          wrapper.style.display = "inline-block";
          wrapper.style.width = input.offsetWidth + "px";
          wrapper.classList.add("input-wrapper");

          const icon = document.createElement("span");
          icon.textContent = "🔍";
          icon.style.cursor = "pointer";
          icon.style.position = "absolute";
          icon.style.right = "1px";
          icon.style.top = "1px";
          icon.style.fontSize = "16px";
          icon.style.color = "#888";
          icon.style.zIndex = "1000";

          input.parentNode.insertBefore(wrapper, input);
          wrapper.appendChild(input);
          wrapper.appendChild(icon);

          input.style.paddingRight = "30px";

          icon.addEventListener("click", () => {
            const popup = document.createElement("div");
            popup.style.position = "absolute";
            popup.style.zIndex = "10000";
            popup.style.backgroundColor = "#fff";
            popup.style.border = "1px solid #ccc";
            popup.style.padding = "10px";
            popup.style.maxHeight = "200px";
            popup.style.overflowY = "scroll";
            popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

            formFields.forEach((field: HTMLFormElement) => {
              const item = document.createElement("div");
              item.textContent = `${field.name}: ${field.value}`;
              item.style.cursor = "pointer";
              item.style.padding = "5px";

              item.addEventListener("click", () => {
                input.value = field.value;
                document.body.removeChild(popup);
              });

              popup.appendChild(item);
            });

            const rect = input.getBoundingClientRect();
            popup.style.top = `${rect.bottom + window.scrollY}px`;
            popup.style.left = `${rect.left + window.scrollX}px`;

            document.body.appendChild(popup);
          });
        }
      });

    // Listen for keyboard shortcuts
    document.addEventListener("keydown", event => {
      formFields.forEach((field: HTMLFormElement) => {
        const shortcut = field.shortcut.split("+");
        const keyPressed = event.key.toUpperCase();
        const isMatch =
          ((shortcut.includes("Ctrl") && event.ctrlKey) ||
            (shortcut.includes("Alt") && event.altKey) ||
            (shortcut.includes("SHIFT") && event.shiftKey)) &&
          keyPressed === shortcut[shortcut.length - 1];

        if (isMatch) {
          const activeElement: any = document.activeElement;
          if (
            activeElement &&
            (activeElement.tagName === "INPUT" ||
              activeElement.tagName === "TEXTAREA")
          ) {
            activeElement.value = field.value;
            event.preventDefault();
          }
        }
      });
    });
  }
);
