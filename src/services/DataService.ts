import { Observable } from "rxjs";
import { ajax } from 'rxjs/observable/dom/ajax';

export class DataService {

    private baseUrl = "http://localhost:4001/graphql";

    fetchDebtsLists(): Observable<DebtsList[]> {
        let query: string = `{
                                debtsLists {
                                    members {
                                        firstName,
                                        lastName,
                                        photoUrl
                                    },
                                    _id,
                                    totalAmount,
                                    lastTimestamp
                                }
                                }`;
        return ajax.getJSON<DebtsList[]>(this.baseUrl + "?query=" + encodeURIComponent(query));
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
        return ajax.getJSON<Debt[]>(this.baseUrl + "?query=" + encodeURIComponent(query));
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