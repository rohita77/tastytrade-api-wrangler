import React, { useState, useEffect }  from 'react'
import _ from 'lodash'

interface Props {
  name : string,
  rows: any[],
  renderItem: (item: any, index: number, labels: string[]) => JSX.Element,
  headerRow: string[]
  csvUrl: string,
}

//Standardise display formatting
function formatValue(rawValue: any) {

  //Standardise number formatting to 2 decimals
  const value = _.round(rawValue, 2);

  if (!Number.isNaN(value)) {
    return value;
  }
  else
    return rawValue;
}


export function RenderTableRow(item: any, index: any, columnHeaders: string[]) {

  return (
    <tr key={index}>
      {columnHeaders.map((column: string, idx: number) => {
        const value = formatValue(item[column]);

        return (

          <td key={index + idx}>{value}</td>
        )
      })}
    </tr>
  );
}

export function RenderTableHeader(props : any) {
  return (
    <tr key={props.key}>
      {props.columnHeaders.map((column: string, idx: number) => (
        <th key={props.key + '-' + idx}>{column}</th>
      ))}
    </tr>
  );
}


export default function CustomTable(props: Props) {

  const columnHeaders = props.headerRow;

  const [csvUrl, setCsvUrl] = useState<string | null>(null);

  const handleExport = () => {
    console.log(props.csvUrl);
     setCsvUrl(props.csvUrl);
   };

  const renderRow = (row: any, index: number) => {
   
    //Injext keys as clolumn lablels
    return (
      <>
        {props.renderItem(row, index, columnHeaders)}
      </>
    )
  }


  console.log(`Keys in payload are : ${columnHeaders}`);

  useEffect(() => {
    return () => {
      if (csvUrl) {
        URL.revokeObjectURL(csvUrl);
      }
    };
  }, [csvUrl]);

  return (
    <div>
        <button onClick={handleExport}>Export as CSV</button>
      {csvUrl && (
        <a
          href={csvUrl}
          download={props.name + ".csv"}
          style={{ display: 'none' }}
          ref={(link) => {
            if (link) {
              link.click();
            }
          }}
        />
      )}

    <table className='custom-table'>
      <RenderTableHeader columnHeaders={columnHeaders} key={props.name}  />

      {props.rows.map(renderRow)}
    </table>
    </div>
  )
}

interface ObjectPropertiesTable {
  name : string,
  item: object
  csvUrl : string
}

export function ObjectPropertiesTable(props: ObjectPropertiesTable) {
  const keys = Object.keys(props.item)

  const renderRow = (key: string, index: number) => {
  const value = formatValue(_.get(props.item, key));

    return (
      <tr>
        <td>{key}</td>
        <td className='ml-5'>{value}</td>
      </tr>
    )
  }



  return (
    <CustomTable name={props.name}  rows={keys} renderItem={renderRow} headerRow={['Metric', 'Value']} csvUrl={props.csvUrl} />
  )
}