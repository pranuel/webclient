import { Observable } from "rxjs";
import { ajax } from 'rxjs/observable/dom/ajax';
import { getAccessToken } from './AuthService';

export class DataService {

    private baseUrl = "http://localhost:5000/api/";
    private get headers() {
        return  { Authorization: `Bearer ${getAccessToken()}` };
    }

    fetchDebtsLists(): Observable<DebtsList[]> {
        return ajax.getJSON<DebtsList[]>(this.baseUrl + "debtssummaries", this.headers);
    }

    fetchDebts(): Observable<Debt[]> {
        let query: string = `{ debts {
                                _id,
                                timestamp,
                                reason,
                                amount,
                                debtor {
                                    _id,
                                    firstName,
                                    lastName,
                                    photoUrl
                                },
                                creditor {
                                    _id,
                                    firstName,
                                    lastName,
                                    photoUrl
                                }
                                } }`;
        return ajax.getJSON<Debt[]>(this.baseUrl + "?query=" + encodeURIComponent(query), this.headers);
    }

    // updateExpense(expense: Expense): Observable<{}> {
    //     return ajax.put(`${this.baseUrl}/api/expenses/${expense.id}`, expense, this.headers).map(ajaxResponse => {
    //         return ajaxResponse.response as {};
    //     });
    // }

    // addExpense(expense: Expense): Observable<string> {
    //     return ajax.post(`${this.baseUrl}/api/expenses/${expense.id}`, expense, this.headers).map(ajaxResponse => {
    //         return ajaxResponse.response as string;
    //     });
    // }

    // deleteExpense(id: string): Observable<string> {
    //     return ajax.delete(`${this.baseUrl}/api/expenses/${id}`, this.headers).map(ajaxResponse => {
    //         return id;
    //     });
    // }
}