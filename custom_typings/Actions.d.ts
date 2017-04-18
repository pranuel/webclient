interface Action {
    type: string;
    error?: boolean;
    meta?: any;
}

interface ActionWithPayload<T> extends Action {
    payload: T
}