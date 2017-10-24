import { getAccessToken } from './AuthService';

export class DataService {

    private baseUrl = "http://localhost:5000/api/";
    private get headers() {
        return { Authorization: `Bearer ${getAccessToken()}` };
    }

    async getDebtsSummaries(): Promise<DebtsSummary[]> {
        return await this.getOrDefault<DebtsSummary[]>(this.baseUrl + "debtssummaries");
    }

    async getMe(): Promise<User> {
        return await this.getOrDefault<User>(this.baseUrl + "users/me");
    }

    async getUserByName(name: string): Promise<User> {
        return await this.getOrDefault<User>(`${this.baseUrl}users?name=${name}`);
    }

    async getUserById(id: string): Promise<User> {
        return await this.getOrDefault<User>(`${this.baseUrl}users/${id}`);
    }

    async createMe(me: User): Promise<User> {
        let response = await this.postFormBody(this.baseUrl + "users/me", me);
        return response.json() as Promise<User>;
    }

    async addDebt(debt: Debt): Promise<void> {
        await this.postJsonBody(this.baseUrl + "debts", debt);
    }

    async getDebtsForPartner(partnerId: string): Promise<Debt[]> {
        return await this.getOrDefault<Debt[]>(`${this.baseUrl}debts?partnerid=${partnerId}`);
    }

    async getDebtsSummaryById(id: string): Promise<DebtsSummary> {
        return await this.getOrDefault<DebtsSummary>(`${this.baseUrl}debtssummaries/${id}`);
    }

    private async getOrDefault<T>(url: string): Promise<T> {
        let response = await fetch(url, {
            headers: this.headers
        });
        if (response.ok) {
            return response.json() as Promise<T>;
        }
        return Promise.resolve(null);
    }

    /**
     * use this method if you want to post objects which contain null properties
     * @param url endpoint url
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
     * @param url endpoint url
     * @param jsonBody your object (must not contain null properties!) as JSON string
     */
    private postJsonBody(url: string, entity: Entity): Promise<Response> {
        entity.id = "0";
        let jsonBody = JSON.stringify(entity);
        let postHeaders = { ... this.headers, ...{ "Content-Type": "application/json" } };
        return fetch(url,
            {
                headers: postHeaders,
                method: "POST",
                body: jsonBody
            });
    }
}