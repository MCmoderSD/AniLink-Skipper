# [AniLink Skipper](https://chromewebstore.google.com/detail/anilink-skipper/cohhlekeocnodlohgbfhkmhpjjpccpkb)

*A Chrome extension to skip the [ouo.io](https://www.ouo.io) redirect on [anime-loads.org](https://www.anime-loads.org) by injecting a cookie.*


## Overview

AniLink Skipper is a lightweight, privacy-first Chrome extension that automatically bypasses the annoying [ouo.io](https://www.ouo.io) redirect on [anime-loads.org](https://www.anime-loads.org). 
By injecting a cookie directly into your browser, it allows you to go straight to the content without waiting or clicking through ads.


## Features

* **One-Click Bypass**: Click the extension icon to inject the cookie and skip the redirect immediately.
* **Privacy‑First**: All operations happen locally in your browser. No data is sent to external servers.
* **Lightweight & Fast**: Minimal footprint, no unnecessary scripts or tracking.


## Installation

### From Chrome Web Store

1. Navigate to the [AniLink Skipper page on the Chrome Web Store](https://chromewebstore.google.com/detail/anilink-skipper/cohhlekeocnodlohgbfhkmhpjjpccpkb).
2. Click **Add to Chrome**, then **Add extension**.
3. Pin the extension to your toolbar by clicking the puzzle-piece icon and selecting **AniLink Skipper**.

### From Release (GitHub)
1. Go to the AniLink Skipper [releases page](https://github.com/MCmoderSD/AniLink-Skipper/releases/latest).
2. Download the latest `AniLink-Skipper.zip` file.
3. Extract the contents to a folder on your computer.
4. Load into Chrome:
   * Open `chrome://extensions/` in your browser.
   * Enable **Developer mode** (toggle in top-right).
   * Click **Load unpacked**, then select the extracted **AniLink-Skipper** folder.

### From Source (Development)

1. Clone this repository:

   ```bash
   git clone https://github.com/MCmoderSD/AniLink-Skipper.git
   cd AniLink-Skipper
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the extension:

   ```bash
   npm run build
   ```

4. Load into Chrome:

    * Open `chrome://extensions/` in your browser.
    * Enable **Developer mode** (toggle in top-right).
    * Click **Load unpacked**, then select the **AniLink-Skipper** folder.


## Usage

1. Visit any link on [anime-loads.org](https://www.anime-loads.org) that redirects through [ouo.io](https://www.ouo.io).
2. Click the AniLink Skipper icon in the toolbar.
3. The extension will inject the cookie, and the redirect will be bypassed instantly.


## Permissions

* `activeTab`: Access the tab you click the extension icon on, to read its URL and reload it.
* `cookies`: Inject the bypass cookie.
* `scripting`: Show an alert if the extension is used on an unsupported site.
* `host_permissions` (`*://*.anime-loads.org/*`): Required so the cookie can actually be set on anime-loads.org and its subdomains — the extension has no access to any other site.


## Privacy & Security

AniLink Skipper runs entirely within your browser. 
No URLs, data, or browsing information is sent outside your device. 
You control all activity locally.


## Contributing

Contributions, bug reports, and suggestions are welcome! 
Feel free to open [issues](https://github.com/MCmoderSD/AniLink-Skipper/issues) or submit pull requests.


## License

AniLink Skipper is licensed under the [BSD 3-Clause License](LICENSE).