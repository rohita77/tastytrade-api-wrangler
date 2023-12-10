import React, {useContext} from 'react'
import { AppContext } from '../contexts/context';
import UseHttpRequest from '../components/use-http-request';
import _ from 'lodash'
import CustomTable, { RenderTableRow } from '../components/custom-table';
import TimeBackDropdown from '../components/time-back-dropdown';


export default function NetLiquidatingValueHistory() {
    const context = useContext(AppContext);

    //TODO: Add UI to allow selection of time-back
    const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async () => (
        context.tastytradeApi.netLiquidatingValueHistoryService.getNetLiquidatingValueHistory(context.accountNumbers![0],{'time-back': 'all'})
      ), true)
    
    if (isLoading) {
      return <div>Loading...</div>
    }



    if (_.isNil(context.accountNumbers)) {
      return <p>Loading...</p>
    }

    // const netLiquidatingValueHistory = responseData;
    const netLiquidatingValueHistory = (responseData ) ? context.tastytradeApi.httpClient.getJsonBuilder(responseData) : responseData;

    if (_.isEmpty(netLiquidatingValueHistory)) {
      return (
      <div>
        <h1>Net Liquidating Value History for {context.accountNumbers[0]}</h1>
        No History
        </div>
      )
    }
    const renderNetLiquidatingValueRow = RenderTableRow;

    //TODO: Table heading and name should have timestamp and query params to include in filenam
    return (
      <div>
        <div className='text-lg font-bold mb-4'>Net Liquidating Value History for {context.accountNumbers[0]}</div>
        {errorMessage && <div>{errorMessage}</div>}

        <CustomTable name='NetLiquidatingValueHistory' rows={netLiquidatingValueHistory.json['data'] as any[]} renderItem={renderNetLiquidatingValueRow} headerRow={netLiquidatingValueHistory.json['keys'] as []}  csvUrl={netLiquidatingValueHistory.json['csvUrl'] as string}/>
      </div>
    );
};
