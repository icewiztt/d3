import {Table} from 'react-bootstrap'

const Prediction = () =>{
    return (
        <Table hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Label</th>
            <th>Probability</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>Drive Safe</td>
            <td>60%</td>
            </tr>
            <tr>
            <td>2</td>
            <td>Turn Right</td>
            <td>20%</td>
            </tr>
            <tr>
            <td>3</td>
            <td>Turn left</td>
            <td>10%</td>
            </tr>
        </tbody>
        </Table>
    )
};

export default Prediction;