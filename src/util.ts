export interface TabUrl {
    readonly origin: string;
    readonly hostname: string;
    readonly secure: boolean;
}

export function parseTabUrl(url: string | undefined): TabUrl | null {
    if (url === undefined) return null;

    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        return null;
    }

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;

    return {
        origin: parsed.origin,
        hostname: parsed.hostname,
        secure: parsed.protocol === "https:"
    };
}

export function isAllowedHost(hostname: string, baseDomain: string): boolean {
    return hostname === baseDomain || hostname.endsWith(`.${baseDomain}`);
}

export function describeError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

export async function showAlert(tabId: number, message: string): Promise<void> {
    try {
        await chrome.scripting.executeScript({
            target: { tabId },
            func: (text: string): void => {
                window.alert(text);
            },
            args: [message]
        });
    } catch (error) {
        console.warn("AniLink Skipper: could not display message", describeError(error));
    }
}