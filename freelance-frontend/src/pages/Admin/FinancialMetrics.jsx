import React from 'react';
import Revenue from '../../components/Revenue';
import Transactions from '../../components/Transactions'
import AverageValue from '../../components/AverageValue';

function FinancialMetrix() {
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
    <div style={{ width: '80%' }}>  {/* Adjust width as needed */}
        <div>
            <h3 style={{ textAlign: 'center', marginTop: '110px' }}>Revenue</h3>
            <Revenue />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <div style={{ flex: '1', margin: '0 2%' }}>
                <h3 style={{ textAlign: 'center' }}>Transactions Of The Year</h3>
                <Transactions />
            </div>
            <div style={{ flex: '1', margin: '0 2%' }}>
                <h3 style={{ textAlign: 'center' }}>Average Project Value Per Month</h3>
                <AverageValue />
            </div>
        </div>
    </div>
</div>



  );
}

export default FinancialMetrix;

//{<h3 style={{ textAlign: 'center', margintop: '50px' }}>Payment Methods</h3>}