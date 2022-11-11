import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import calculateResults, { pointsPerTransaction } from './calculateResults';
import Container from 'react-bootstrap/Container';
import CustomerTableComponent from './CustomerTable';
import _ from 'lodash'

function App() {
  const [transactionData, setTransactionData] = useState(null);

  const columns = [
    {
      title: 'ID',
    },
    {
      title: 'Name',
    },
    {
      title: "Amount ($)",
    },
    {
      title: 'Date',
    },
    {
      title: 'Reward Points',
    }
  ];

  const allCustomers = gql`
  {
    allCustomers {
      id
      name
      amount
      transactionDt
    }
  }
`;

  const TitleComponent = (props) => (
    <div className="row">
      <div className="col-10">
        <h2>{props.title}</h2>
      </div>
    </div>
  )

  const { data } = useQuery(allCustomers);

  useEffect(() => {
    if (data && data.allCustomers.length) {

      // copy transaction data to local variable for manipulation.
      // Note: this action sustainable nor best practice and should be moved to graphql mutation/background job
      const transactions = _.cloneDeep(data.allCustomers);

      // calculate and append points per transaction
      transactions.forEach(transaction => {
        const points = pointsPerTransaction(transaction)

        // append points or 0 per transaction row
        transaction['points'] = points || 0;
      })

      // set updated transactions to UI
      setTransactionData(transactions);
    }
  }, [data]);

  return !transactionData ?
    <div>Loading...</div>
    :
    <Container>
        <TitleComponent title="Points Rewards System Totals By Customer" />
        {columns && <CustomerTableComponent columns={columns} transactions={transactionData} />}
    </Container>
    ;
}

export default App;
