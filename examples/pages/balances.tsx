import React, {useContext} from 'react'
import { AppContext } from '../contexts/context';
import _ from 'lodash'
import UseHttpRequest from '../components/use-http-request';
import { ObjectPropertiesTable } from '../components/custom-table';

export default function Balances() {
    const context = useContext(AppContext);

    const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async () => (
        context.tastytradeApi.balancesAndPositionsService.getAccountBalanceValues(context.accountNumbers![0])
      ), true)

    if (isLoading) {
        return <div>Loading...</div>
      }

    const balances = (responseData) ? context.tastytradeApi.httpClient.getJsonBuilder([responseData]) : responseData;

    if (_.isNil(context.accountNumbers)) {
      return <p>Loading...</p>
    }

    if (_.isEmpty(balances)) {
      return (
        <div>
          <h1>Transactions for {context.accountNumbers[0]}</h1>
          No Balances
          </div>
        )
      }
  
    const data = Array.isArray(balances.json['data']) ? balances.json['data'][0] : undefined;

    return (
    <>
        <div className='text-lg font-bold mb-4'>Balances for {context.accountNumbers[0]}</div>
        {errorMessage && <div>{errorMessage}</div>}
        <ObjectPropertiesTable name='Balances' item={data as object} csvUrl={balances.json['csvUrl'] as string} />
    </>
    );
};
