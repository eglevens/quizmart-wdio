//-------- browser local storage commands
export async function clearLocalStorage(): Promise<void> {
    await browser.execute(function () {
        this.localStorage.clear()
    })
}

export async function getLocalStorageValue(itemKey: string): Promise<string> {
    const val = await browser.execute(function (key) {
        return this.localStorage.getItem(key)
    }, itemKey)
    return val
}

export async function changeLocalStorageValue(itemKey: string, value: string): Promise<void> {
    await browser.execute(function (key, value) {
        this.localStorage.setItem(key, value)
    }, itemKey, value)
}

export async function removeLocalStorageKey(itemKey: string): Promise<void> {
    await browser.execute(function (key) {
        this.localStorage.removeItem(key)
    }, itemKey)
} 

