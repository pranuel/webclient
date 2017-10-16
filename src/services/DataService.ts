import { getAccessToken } from './AuthService';

export class DataService {

    private baseUrl = "http://localhost:5000/api/";
    private get headers() {
        return  { Authorization: `Bearer ${getAccessToken()}` };
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
        return response.json() as Promise<User>;
    }

    async createMe(me: User): Promise<User> {
        let response = await this.getPostRequest(this.baseUrl + "users/me", JSON.stringify(me));
        return response.json() as Promise<User>;
    }

    private getPostRequest(url: string, jsonBody: string): Promise<Response> {
        return fetch(url,
        {
            headers: this.headers,
            method: "POST",
            body: jsonBody
        });
    }
}