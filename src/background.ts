import SetDetails = chrome.cookies.SetDetails;
import Tab = chrome.tabs.Tab;

const cookieName: string = "modalads"
const cookieValue: string = "done";
const expirationDate: number = 365 * 24 * 60 * 60; // 1 year in seconds

const allowedDomains: string[] = [
    "anime-loads.org"
];

function isAllowedDomain(hostname: string): boolean {
    return allowedDomains.includes(hostname);
}

function getDomainFromUrl(url: string): string {
    const hostname = new URL(url).hostname;
    return hostname.startsWith("www.") ? hostname.substring(4) : hostname;
}

function getProtocolFromUrl(url: string): string {
    if (url.startsWith("http://")) return "http://";
    if (url.startsWith("https://")) return "https://";
    return url;
}

async function showAlert(tab: Tab, message: string): Promise<void> {
    await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: (msg: string) => alert(msg),
        args: [message]
    });
}

chrome.action.onClicked.addListener(async (tab: Tab): Promise<void> => {
    if (!tab.url || !tab.id) return;

    const protocol = getProtocolFromUrl(tab.url);
    const domain = getDomainFromUrl(tab.url);

    if (!isAllowedDomain(domain)) {
        await showAlert(tab, "This extension only works on anime-loads.org");
        return;
    }

    const cookie: SetDetails = {
        url: protocol + domain,
        name: cookieName,
        value: cookieValue,
        domain: domain,
        path: "/",
        expirationDate: Math.floor(Date.now() / 1000) + expirationDate
    }

    await chrome.cookies.set(cookie);
    await chrome.tabs.reload(tab.id);
});