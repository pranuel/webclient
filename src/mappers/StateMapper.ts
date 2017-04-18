export const mapStateToDebtsProps = (state: Store.All): Store.DebtProps => {
    return {
        debts: state.debts,
        isFetchingDebts: state.isFetchingDebts
    }
};