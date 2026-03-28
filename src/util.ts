import QueryInfo = chrome.tabs.QueryInfo;
import Tab = chrome.tabs.Tab;

const queryInfo: QueryInfo = {
    active: true,
    currentWindow: true
}

function isInjectAble(tab: Tab): boolean {
    if (!tab.url) return false;
    return tab.url?.startsWith("http://") || tab.url?.startsWith("https://");
}

export async function showAlert(message: string): Promise<void> {

    // Get Active Tab
    const [tab] = await chrome.tabs.query(queryInfo);
    if (!isInjectAble(tab)) return

    // Inject Alert Script
    await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: (msg: string) => alert(msg),
        args: [message]
    });
}

export function getDomainFromUrl(url: string): string {
    const hostname: string = new URL(url).hostname;
    return hostname.startsWith("www.") ? hostname.substring(4) : hostname;
}

export function getProtocolFromUrl(url: string): string {
    if (url.startsWith("http://")) return "http://";
    if (url.startsWith("https://")) return "https://";
    return url;
}