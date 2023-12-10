import _ from 'lodash'

export type BasicJsonValue = boolean | number | string | null | undefined
export type JsonValue = BasicJsonValue | JsonArray | JsonMap
export interface JsonMap {
  [key: string]: JsonValue | undefined
}
export type JsonArray = JsonValue[]

export class JsonBuilder {
  public constructor(public readonly json: JsonMap = {}) {}

  public add(key: string, value: JsonValue, serializeEmpty = false): this {
    if ((_.isNil(value) || value === '') && !serializeEmpty) {
      return this
    }
    
    this.json[key] = value;
    
    if (Array.isArray(value)) {
      this.json['keys'] = getDistinctKeysFromAllArrayObjects(value as JsonValue[]);
      this.json['csvUrl'] = convertJsonToCsv(value as JsonValue[],this.json['keys'] as string[] );
      console.log(`CSV url is ${this.json['csvUrl']}`);
    }
    return this
  }

}

function getDistinctKeysFromAllArrayObjects(rows: any[]): string[] {

  const allDistinctKeys = rows.reduce((keys: any, obj:any) => {
    Object.keys(obj).forEach(key => {
      keys.add(key);
    });
    return keys;
  }, new Set());

  return Array.from(allDistinctKeys);
}


export function convertJsonToCsv(jsonData: any[], headers: string[]) {
  // Assuming jsonData is an array of objects
  if (jsonData.length === 0) {
    return '';
  }

  const csvRows = jsonData.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
  );

  csvRows.unshift(headers.join(',')); // Add header row
  const csv = csvRows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  return url ;

  function replacer(key: any, value: any) {
    // This function is for escaping values that might contain commas or line breaks
    return value;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recursiveDasherizeKeys(body: any) {
  let dasherized = _.mapKeys(body, (_value, key) => dasherize(key))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dasherized = _.mapValues(dasherized, (value: any) => {
    if (_.isPlainObject(value)) {
      return recursiveDasherizeKeys(value)
    }

    return value
  })

  return dasherized
}

export function dasherize(target: string): string {
  // prettier-ignore
  return target
    .replace(/([A-Z])/g, (_match, p1: string, _offset, _whole) => `-${p1.toLowerCase()}`)
    .replace(/\s/g, '-')
}
