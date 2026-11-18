(() => {
  const styles = new Map((window.portraitStyles || []).map(style => [style.id, style]));
  const picker = document.getElementById("style-picker");
  const styleImage = document.getElementById("style-image");
  const liveStudio = document.getElementById("live-studio");
  const notice = document.getElementById("style-notice");
  const params = new URLSearchParams(location.search);
  const initialStyle = params.get("style");
  const liveOrigin = "https://luna.nodesk.tech";
  const initialChoice = "classical-festive-winter-snow";
  styleImage.addEventListener("error", () => {
    styleImage.hidden = true;
  });
  if (styles.size) {
    picker.replaceChildren(...Array.from(styles.values(), style => new Option(style.name, style.id)));
    picker.value = initialChoice;
  } else {
    picker.hidden = true;
    document.getElementById("style-title").textContent = "Portrait styles";
  }

  function renderStyle() {
    const style = picker.value;
    const artwork = styles.get(style);
    if (!artwork) {
      styleImage.hidden = true;
      liveStudio.href = liveOrigin + "/themes";
      liveStudio.textContent = "Choose a style on Add a Paw ↗";
      return;
    }
    styleImage.hidden = false;
    styleImage.src = artwork.image;
    styleImage.alt = artwork.name + " portrait style example";
    const url = new URL("/shop/custom-artwork", liveOrigin);
    url.search = new URLSearchParams({entry: "new", intent: "free", style});
    if (params.get("for") === "memory") url.searchParams.set("for", "memory");
    liveStudio.href = url.href;
    liveStudio.textContent = "Open live studio ↗";
  }

  if (initialStyle && styles.has(initialStyle)) {
    picker.value = initialStyle;
  } else if (initialStyle && styles.size) {
    picker.add(new Option("Choose a portrait style", ""), 0);
    picker.value = "";
    notice.textContent = "This style is unavailable here. Choose a style from the current collection.";
    notice.hidden = false;
  }
  renderStyle();
  liveStudio.addEventListener("click", () => {
    if (styles.has(picker.value)) window.portraitEvent?.("live_studio_opened", {style: picker.value});
  });
  picker.addEventListener("change", () => {
    if (!styles.has(picker.value)) return;
    const locationUrl = new URL(location.href);
    locationUrl.searchParams.set("style", picker.value);
    history.replaceState(null, "", locationUrl.href);
    notice.hidden = true;
    renderStyle();
    window.portraitEvent?.("style_selected", {style: picker.value, entry: "studio"});
  });

  const drop = document.getElementById("photo-drop");
  const input = document.getElementById("photo-file");
  const photo = document.getElementById("pet-photo");
  const preview = document.getElementById("file-preview");
  const error = document.getElementById("file-error");
  const status = document.getElementById("file-status");
  const chooseLabel = document.getElementById("pick-text");
  const maxBytes = 10 * 1024 * 1024;
  let objectUrl = "";
  let currentSelection = 0;
  function showFileError(message) {
    error.textContent = message;
    window.portraitEvent?.("photo_check_failed", {style: picker.value});
  }

  // Some phone pickers omit the MIME type. Read the image signature and decode
  // it in the browser so both an empty MIME and a misnamed file behave properly.
  async function isSupportedImage(file) {
    const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const starts = (...signature) => signature.every((byte, index) => header[index] === byte);
    if (starts(0xff, 0xd8, 0xff) || starts(137, 80, 78, 71, 13, 10, 26, 10)) return true;
    return starts(82, 73, 70, 70) && String.fromCharCode(...header.slice(8, 12)) === "WEBP";
  }

  async function inspectFile(files) {
    if (!files.length) return;
    const selection = ++currentSelection;
    const file = files[0];
    error.textContent = "";
    status.textContent = "";
    if (files.length !== 1 || file.size > maxBytes) {
      showFileError(files.length !== 1 ? "Choose one photo at a time." : "Choose a photo that is 10 MB or smaller.");
      return;
    }
    let candidateUrl = "";
    try {
      if (!(await isSupportedImage(file))) throw new Error("format");
      candidateUrl = URL.createObjectURL(file);
      const candidate = new Image();
      candidate.src = candidateUrl;
      await candidate.decode();
      if (selection !== currentSelection) return;
      const previousUrl = objectUrl;
      photo.src = candidateUrl;
      objectUrl = candidateUrl;
      candidateUrl = "";
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      document.getElementById("file-meta").textContent = file.name + " · " + candidate.naturalWidth + " × " + candidate.naturalHeight;
      preview.hidden = false;
      chooseLabel.textContent = "Choose another photo";
      status.textContent = "Photo ready to check on this device.";
      window.portraitEvent?.("photo_check_succeeded", {style: picker.value});
    } catch (reason) {
      if (selection === currentSelection) {
        showFileError(reason.message === "format" ? "Choose a JPG, PNG or WebP photo." : "This photo could not be opened. Try a different original file.");
      }
    } finally {
      if (candidateUrl) URL.revokeObjectURL(candidateUrl);
    }
  }

  input.addEventListener("change", () => {
    const files = Array.from(input.files);
    input.value = "";
    inspectFile(files);
  });
  drop.addEventListener("dragover", event => {
    event.preventDefault();
    drop.classList.add("is-dragging");
  });
  drop.addEventListener("dragleave", event => {
    if (!drop.contains(event.relatedTarget)) drop.classList.remove("is-dragging");
  });
  drop.addEventListener("drop", event => {
    event.preventDefault();
    drop.classList.remove("is-dragging");
    inspectFile(event.dataTransfer.files);
  });
  document.getElementById("remove-photo").addEventListener("click", () => {
    ++currentSelection;
    photo.removeAttribute("src");
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = "";
    preview.hidden = true;
    document.getElementById("file-meta").textContent = "";
    error.textContent = "";
    status.textContent = "Photo removed.";
    chooseLabel.textContent = "Choose a pet photo";
    input.focus();
  });
  document.getElementById("photo-check").hidden = false;
})();
