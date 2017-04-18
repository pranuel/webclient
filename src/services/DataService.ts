import { Observable } from "rxjs";
import { ajax } from 'rxjs/observable/dom/ajax';

export class DataService {

    private baseUrl = "http://localhost:5000";
    private headers = { 'Content-Type': 'application/json' };

    fetchDebts(): Observable<Debt[]> {
        return ajax.getJSON<Debt[]>(this.baseUrl + "/api/debts", this.headers);
    }
}