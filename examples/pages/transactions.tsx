import React, {useContext} from 'react'
import { AppContext } from '../contexts/context';
import UseHttpRequest from '../components/use-http-request';
import _ from 'lodash'
import CustomTable, { RenderTableRow } from '../components/custom-table';

export default function Transactions() {
    const context = useContext(AppContext);

    const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async () => (
        context.tastytradeApi.transactionsService.getAccountTransactions(context.accountNumbers![0])
      ), true)
    
    if (isLoading) {
      return <div>Loading...</div>
    }

    const transactions = (responseData ) ? context.tastytradeApi.httpClient.getJsonBuilder(responseData) : responseData;

    if (_.isNil(context.accountNumbers)) {
      return <p>Loading...</p>
    }

    if (_.isEmpty(transactions)) {
      return (
      <div>
        <h1>Transactions for {context.accountNumbers[0]}</h1>
        No Transactions
        </div>
      )
    }

    const renderTransactionRow = RenderTableRow;
    
    return (
      <div>
        <div className='text-lg font-bold mb-4'>Transactions for {context.accountNumbers[0]}</div>
        {errorMessage && <div>{errorMessage}</div>}
        <CustomTable name='Transactions'  rows={transactions.json['data'] as any[]} renderItem={renderTransactionRow} headerRow={transactions.json['keys'] as []}  csvUrl={transactions.json['csvUrl'] as string}/>
      </div>
    );
};
