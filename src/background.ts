import {describeError, isAllowedHost, parseTabUrl, showAlert, type TabUrl} from "./util.js";

const BASE_DOMAIN: string = "anime-loads.org";

const COOKIE_NAME: string = "modalads";
const COOKIE_VALUE: string = "done";

const COOKIE_MAX_AGE_SECONDS: number = 34560000; // 400 * 24 * 60 * 60

async function injectCookie(tabId: number, tab: chrome.tabs.Tab): Promise<void> {
    const url: TabUrl | null = parseTabUrl(tab.url);

    if (url === null || !isAllowedHost(url.hostname, BASE_DOMAIN)) {
        await showAlert(tabId, `AniLink Skipper only works on ${BASE_DOMAIN}.`);
        return;
    }

    try {
        await chrome.cookies.set({
            url: url.origin,
            name: COOKIE_NAME,
            value: COOKIE_VALUE,
            domain: BASE_DOMAIN,
            path: "/",
            secure: url.secure,
            expirationDate: Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE_SECONDS
        });
    } catch (error) {
        await showAlert(tabId, `AniLink Skipper could not set the cookie: ${describeError(error)}`);
        return;
    }

    await chrome.tabs.reload(tabId);
}

chrome.action.onClicked.addListener((tab: chrome.tabs.Tab): void => {
    const tabId: number | undefined = tab.id;
    if (tabId === undefined || tabId === chrome.tabs.TAB_ID_NONE) return;

    injectCookie(tabId, tab).catch((error: unknown): void => {
        console.error("AniLink Skipper: unexpected failure", describeError(error));
    });
});