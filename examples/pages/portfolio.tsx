import React, { useContext } from 'react'
import { AppContext } from '../contexts/context';
import _ from 'lodash'
import UseHttpRequest from '../components/use-http-request';
import CustomTable, { RenderTableHeader, RenderTableRow } from '../components/custom-table';
// import '../styles/global.css';

export default function Positions() {
  const context = useContext(AppContext);

  const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async () => (
    context.tastytradeApi.balancesAndPositionsService.getPositionsList(context.accountNumbers![0])
  ), true)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const positions = (responseData) ? context.tastytradeApi.httpClient.getJsonBuilder(responseData) : responseData;

  if (_.isNil(context.accountNumbers)) {
    return <p>Loading...</p>
  }

  if (_.isEmpty(positions)) {
    return (
      <div>
        <h1>Transactions for {context.accountNumbers[0]}</h1>
        No Positions
      </div>
    )
  }

  const renderPositionRow = RenderTableRow;

  return (
    <div>      
      <div className='text-lg font-bold mb-4'>Positions for {context.accountNumbers[0]}</div>

      {<CustomTable name='Positions' rows={positions.json['data'] as any[]} renderItem={renderPositionRow} headerRow={positions.json['keys'] as []}  csvUrl={positions.json['csvUrl'] as string} />}
    </div>
  );
};
