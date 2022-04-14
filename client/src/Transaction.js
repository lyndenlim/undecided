import React, { useEffect, useState } from 'react'

function Transaction({ transaction }) {
    const [formattedTransactions, setFormattedTransactions] = useState([])

    useEffect(() => {
        function splitTransaction() {
            const splitItems = transaction.split("_")
            setFormattedTransactions(splitItems.map(item => `${item.slice(0, 1).toUpperCase()}${item.slice(1, item.length)}`))
        }

        splitTransaction()
    }, [])

    return (
        <>
            {formattedTransactions.map(transaction => <p key={transaction}><strong>{transaction}</strong></p>)}
        </>
    )
}

export default Transaction