import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

const CustomerTableComponent = (props) => {
  return (
    <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              {props.columns.map(({ title }) => (
                <th>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>

            {
              props.transactions.map(transaction => (
                <tr key={JSON.stringify(transaction.amount)+transaction.transactionDt}>
                  <td>{transaction.id}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.transactionDt}</td>
                  <td>{transaction.points}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
    </Row>
  );
}

export default CustomerTableComponent;