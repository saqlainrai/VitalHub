import React from 'react'
import ExpensesMain from '../components/Expenses/ExpensesMain'
import ExpensesNav from '../components/Expenses/ExpensesNav'
const ExpensesDashboard = () => {
  return (
    <div>
        <ExpensesNav/>
        <ExpensesMain/>
    </div>
  )
}

export default ExpensesDashboard