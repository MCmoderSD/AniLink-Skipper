import {getDomainFromUrl, getProtocolFromUrl, showAlert} from "./util.js";

import SetDetails = chrome.cookies.SetDetails;
import Tab = chrome.tabs.Tab;

const cookieName: string = "modalads"
const cookieValue: string = "done";
const expirationDate: number = 400 * 24 * 60 * 60; // 400 days in seconds

const allowedDomains: string[] = [
    "anime-loads.org"
];

function isAllowedDomain(hostname: string): boolean {
    return allowedDomains.includes(hostname);
}

chrome.action.onClicked.addListener(async (tab: Tab): Promise<void> => {
    if (!tab.url || !tab.id) return;

    const protocol: string = getProtocolFromUrl(tab.url);
    const domain: string = getDomainFromUrl(tab.url);

    if (!isAllowedDomain(domain)) {
        await showAlert("This extension only works on anime-loads.org");
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