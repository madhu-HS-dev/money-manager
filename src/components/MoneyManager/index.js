import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].optionId,
    historyList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTypeInput = event => {
    this.setState({typeInput: event.target.value})
  }

  onDeleteTransaction = id => {
    const {historyList} = this.state
    const filteredList = historyList.filter(each => each.id !== id)

    this.setState({historyList: filteredList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state

    const typeOption = transactionTypeOptions.find(
      each => each.optionId === typeInput,
    )

    const {displayText} = typeOption

    const newListItem = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newListItem],
      titleInput: '',
      amountInput: '',
      typeInput: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {historyList} = this.state
    let expensesAmount = 0

    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0

    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {historyList} = this.state
    let balanceAmount = 0
    let expensesAmount = 0
    let incomeAmount = 0

    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, typeInput, historyList} = this.state

    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="money-manager-container">
        <div className="welcome-container">
          <h1 className="name-heading">Hai, Richard</h1>
          <p className="welcome-description">
            Welcome back to your{' '}
            <span className="span-element">Money Manager</span>{' '}
          </p>
        </div>
        <ul className="money-details-container">
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
        </ul>
        <div className="transaction-history-container">
          <form
            className="add-transaction-container"
            onSubmit={this.onAddTransaction}
          >
            <h1 className="add-transaction-heading">Add Transaction</h1>
            <div className="label-container">
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                placeholder="TITLE"
                className="input"
                onChange={this.onChangeTitle}
                value={titleInput}
              />
            </div>
            <div className="label-container">
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <br />
              <input
                type="text"
                id="amount"
                placeholder="AMOUNT"
                className="input"
                onChange={this.onChangeAmount}
                value={amountInput}
              />
            </div>
            <div className="label-container">
              <label htmlFor="select" className="label">
                Type
              </label>
              <br />
              <select
                id="select"
                className="input"
                value={typeInput}
                onChange={this.onChangeTypeInput}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="add-transaction-heading">History</h1>
            <div className="content-main-container">
              <div className="contents">
                <p className="content-heading">Title</p>
                <p className="content-heading">Amount</p>
                <p className="content-heading">Type</p>
              </div>
            </div>
            <ul className="history-list-container">
              {historyList.map(eachItem => (
                <TransactionItem
                  key={eachItem.id}
                  transactionItemDetails={eachItem}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
