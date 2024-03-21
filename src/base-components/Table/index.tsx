import clsx from "clsx"
import { useEffect, useState } from "react"
import Button from "../Button"
import Pagination from "../Pagination"

type ColumnDefinitionType<T, K extends keyof T> = {
    key: K
    header: string
    rowClassName?: any | undefined
    width?: number
    display?: boolean | undefined
}

type TableHeaderProps<T, K extends keyof T> = {
    columns: Array<ColumnDefinitionType<T, K>>,
    style?: string | undefined
    loading?: boolean | undefined
}

const TableHeader = <T, K extends keyof T>({loading, columns, style }: TableHeaderProps<T, K>) => {
    const headers = columns.map((column, index) => {  
      return loading && column.display ? (
        <th 
          key={`headCell-${index}`}
          className={`text-left py-5 px-4 first:rounded-l-2xl last:rounded-r-2xl text-[#0D0D0D] bg-[#EFF8FF80] text-[12px] ${style} leading-1 font-semibold uppercase ${columns[columns.length-1] !== column ? 'mr-1':''}`}
        >
          {
            column.header !== "" && (
              <div role="status" className="max-w-sm animate-pulse flex flex-1 w-full">
                  <span className="bg-gray-200 rounded-xl dark:bg-gray-700 w-full h-4"></span>
              </div>
            )
          }
        </th>
      ): !loading && column.display && (
        <th
          key={`headCell-${index}`}
          className={`text-left py-5 px-4 first:rounded-l-2xl last:rounded-r-2xl font-caros text-[#0D0D0D] bg-[#EFF8FF80] text-[12px] ${style} leading-1 font-semibold uppercase ${columns[columns.length-1] !== column ? 'mr-1':''}`}
        >
          <span>{column.header}</span>
        </th>
      );
    });
  
    return (
      <thead>
        <tr>{headers}</tr>
      </thead>
    );
  };

type TableRowsProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>
    onRowClick?: React.EventHandler<any> | undefined
    loading?: boolean | undefined
}
  
  
  const TableRows = <T, K extends keyof T>({ loading, data, columns, onRowClick}: TableRowsProps<T, K>) => {
    const rows = data.map((row, index) => {
      return loading ? (
        <tr key={`row-${index}`} className={clsx([
          "border-b border-[rgba(0,0,0,.04)]",
          !loading && "hover:bg-primary/5 hover:cursor-pointer"
        ])}>
          {columns.map((column, index2) => {
            return column.display && (
              <td key={`cell-${index2}`} className={clsx([
                "px-4 py-4 text-[13px] font-regular text-[#241F17]",
                column.rowClassName && "leading-none"
              ])}>
                <div role="status" className="max-w-sm animate-pulse flex flex-1" style={{ width: `${Math.floor(Math.random() * (100 - 20 + 1)) + 20}%` }}>
                  <span className={clsx([
                    "bg-gray-200 rounded-xl dark:bg-gray-700 h-2 w-full",
                  ])}></span>
                </div>
              </td>
            )
          }
          )}
        </tr>
      ):(
        <tr key={`row-${index}`} className="border-b border-[rgba(0,0,0,.04)] hover:bg-primary/5 hover:cursor-pointer" onClick={()=> onRowClick!(row)}>
          {columns.map((column, index2) => {
            return column.display && (
              <td key={`cell-${index2}`} className={clsx([
                "px-4 text-[12px] font-regular text-[#241F17] whitespace-nowrap overflow-hidden text-ellipsis font-caros",
                column.rowClassName && "leading-none"
              ])}>
                {
                  column.rowClassName ? (column.rowClassName):(
                    <span className={clsx([
                      "flex mt-1 mr-1",
                      "py-3",
                    ])}>{row[column.key] as any}</span>
                  )
                }
              </td>
            );
          }
          )}
        </tr>
      );
    });
  
    return (
      <tbody>
        {rows}
      </tbody>
    )
  }

  type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>
    pages?: number
    currentPage?: number | undefined
    className?: string | undefined
    onPageChange?: React.EventHandler<any> | undefined
    onRowClick?: React.EventHandler<any> | undefined
    withFooter?:  boolean | undefined
    loading?: boolean | undefined
    loadingRows?: number | undefined
    emptyRecordText?: "No record found." | string | undefined
    onErrorOccured?: boolean | undefined
    errorText?: string | undefined
    onRefresh?: React.EventHandler<any> | undefined
  }
  
  
  const Table = <T, K extends keyof T>({emptyRecordText, loadingRows, onErrorOccured, onRefresh, errorText, loading, data, columns, currentPage, pages, className, onPageChange, onRowClick, withFooter = true }: TableProps<T, K>) => {
      
      const [records, setRecords] = useState<Array<T>>(Array(loadingRows))

      useEffect(()=> {
        if (loading){
          var tab: Array<T> = []
          for (var i=0;i<loadingRows!;i++){
            tab.push( i as any)
          }
          setRecords(tab)
        }
      },[])

      return (
          <div className="flex flex-1 flex-col ">
              <table className={`table-auto ${className}`}>
                  <TableHeader 
                      columns={columns as any[]}
                      loading={loading}
                  />
                  <TableRows
                      data={loading ? records:data}
                      columns={columns}
                      loading={loading}
                      onRowClick={(row)=> onRowClick!(row)}
                  />
              </table>
              {
                !loading && data.length <= 0 && !onErrorOccured  && (
                  <div className="flex flex-col justify-center items-center flex-1 p-10">
                      <i className="flex fi fi-rr-file text-5xl leading-3 text-center pt-10 text-dark opacity-30"></i>
                      <span className="mt-5 text-[#2C3031]">{emptyRecordText}</span>
                  </div>
                )
              }
              {
                !loading && onErrorOccured  && (
                  <div className="flex flex-col justify-center items-center flex-1 p-10 text-center">
                     <i className="flex fi fi-rr-wifi-slash text-5xl leading-3 text-center pt-10 text-dark opacity-30"></i>
                     <span className="max-w-[300px] mt-7">{ errorText }</span>
                     <Button as="a" onClick={onRefresh} className={clsx([
                        "rounded-lg bg-gradient-to-r text-[12px] select-none px-2 py-1 mt-5 flex items-center from-primary/20 to-green-200 shadow-none ring-0 border-none font-caros font-semibold",
                     ])}>
                        <i className={clsx([
                        "flex fi fi-br-refresh mr-1",
                        ])}></i>Refresh
                    </Button>
                  </div>
                )
              }
              {
                  withFooter && (
                    <div className="flex flex-wrap col-span-12 -intro-x flex-0 items-center justify-between py-3 px-0">
                      {
                        loading ? (
                          <div role="status" className="max-w-sm animate-pulse flex w-24">
                              <span className="bg-gray-200 rounded-xl dark:bg-gray-700 w-full h-4"></span>
                          </div>
                        ):(
                          <div className="flex flex-1 items-center px-0">
                              <span className="text-sm font-medium text-slate-400 leading-1">{ currentPage }</span>
                              <span className="text-sm leading-1 font-medium text-slate-400 mx-2">of</span>
                              <span className="text-sm leading-1 font-medium text-slate-400">{ pages }</span>
                          </div>
                        )
                      }
                    <Pagination className={clsx([
                      "flex",
                      loading && "py-2"
                    ])}>
                      {
                        loading ? (
                          <div role="status" className="max-w-sm animate-pulse flex w-24">
                              <span className="bg-gray-200 rounded-xl dark:bg-gray-700 w-full h-4"></span>
                          </div>
                        ):(
                          <Pagination.Link>
                          <div onClick={()=> {
                                onPageChange!('previous')
                            }} className={`flex items-center font-semibold rounded-full ${currentPage! <= 1 ?'pointer-events-none opacity-30':'text-primary cursor-pointer opacity-100 hover:opacity-100'}`}>
                                <i className="flex fi fi-sr-angle-left text-[.75rem] leading-3 text-center"></i>
                                <span className="ml-2">Previous</span>
                            </div>
                          </Pagination.Link>
                        )
                      }        
                      {
                        loading ? (
                          <div role="status" className="max-w-sm animate-pulse flex w-24 ml-3">
                              <span className="bg-gray-200 rounded-xl dark:bg-gray-700 w-full h-4"></span>
                          </div>
                        ):(
                          <Pagination.Link>
                          <div onClick={()=> {
                                onPageChange!('next')
                            }} className={`flex items-center font-semibold rounded-full ${currentPage! >= pages! ?'pointer-events-none opacity-30':'text-primary cursor-pointer opacity-100 hover:opacity-100'}`}>
                                <span className="mr-2">Next</span>
                                <i className="flex fi fi-sr-angle-right text-[.75rem] leading-3 text-center"></i>
                            </div>
                          </Pagination.Link>
                        )
                      }   
                      
                    </Pagination>
                  </div>
                  )
              }
          </div>
      )
  }
  
  export default Table