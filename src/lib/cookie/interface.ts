export interface CookieInterface{
    create(token: string): Promise<boolean>
    remove(): Promise<boolean>
    getCookie(): Promise<string | null>
}