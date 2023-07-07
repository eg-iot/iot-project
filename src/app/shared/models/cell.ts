export interface IData {
  headerColor: string;
  rightCellName?: string;
  leftCellName?: string;
  cellSymbol?: string;
  multipleCols?: boolean;
  sampleFiles: {
    performance: string;
    satisfaction: string;
  };
  leftCol?: CellData[][];
  rightCol?: CellData[][];
}
interface CellData {
  code: string;
  label: string;
  values: any[];
  tempWebsite: string;
}
