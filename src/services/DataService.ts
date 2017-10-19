import { getAccessToken } from './AuthService';

export class DataService {

    private baseUrl = "http://localhost:5000/api/";
    private get headers() {
        return { Authorization: `Bearer ${getAccessToken()}` };
    }

    async getDebtsSummaries(): Promise<DebtsSummary[]> {
        let response = await fetch(this.baseUrl + "debtssummaries", {
            headers: this.headers
        });
        return response.json() as Promise<DebtsSummary[]>;
    }

    async getMe(): Promise<User> {
        let response = await fetch(this.baseUrl + "users/me", {
            headers: this.headers
        });
        if (!response.ok) {
            return Promise.resolve(null);
        }
        return response.json() as Promise<User>;
    }

    async createMe(me: User): Promise<User> {
        let response = await this.postFormBody(this.baseUrl + "users/me", me);
        return response.json() as Promise<User>;
    }

    /**
     * use this method if you want to post objects which contain null properties
     * @param url endpoint url (without base url)
     * @param body the object you want to send (may contain properties which are null)
     */
    private postFormBody(url: string, body: Object): Promise<Response> {
        var formData = new FormData();
        for (var k in body) {
            formData.append(k, body[k]);
        }

        return fetch(url,
            {
                headers: this.headers,
                method: "POST",
                body: formData
            });
    }

    /**
     * use this method if all properties of your object are defined (not null)
     * @param url endpoint url (without base url)
     * @param jsonBody your object (must not contain null properties!) as JSON string
     */
    private postJsonBody(url: string, jsonBody: string): Promise<Response> {
        let postHeaders = { ... this.headers, ...{ "Content-Type": "application/json" } };
        return fetch(url,
            {
                headers: postHeaders,
                method: "POST",
                body: jsonBody
            });
    }
}