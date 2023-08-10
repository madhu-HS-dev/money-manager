// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionItemDetails, onDeleteTransaction} = props
  const {id, title, amount, type} = transactionItemDetails

  const deleteTransaction = () => {
    onDeleteTransaction(id)
  }

  return (
    <li className="list-container">
      <div className="contents-container">
        <p>{title}</p>
        <p>{amount}</p>
        <p>{type}</p>
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={deleteTransaction}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
