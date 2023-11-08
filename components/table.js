import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import React, { useMemo, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ClickedCellLink, process_json } from './components'

export const ViewTable=props=>{

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(props.data);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [pageCount, setPageCount] = useState(props.pageCount)
    const columns=props.columns
    // const data=props.data


    const doFetch = (n) => {
        // console.log("enter doFetch");
        const populate=`populate[0]=detail.types&populate[2]=detail.pokemon_name&populate[3]=detail.pokemon_abilities&pagination[page]=` + (currentPage+n) + `&pagination[pageSize]=` + 25
        const filter=`&filters[status][$eq]=true`
        setLoading(true)
        fetch(`http://127.0.0.1:1337/api/c3s?`+ populate + filter)
            .then(async res => {
                if (res.status == 200) {
                    // console.log("res in fetchtodo", res)
                    let d = await res.json()
                    // console.log("enter fetchtodo", d)
                    // console.log("props",props)
                    let cleanData = process_json(d.data)
                    // console.log("cleandata", cleanData)
                    //props.currentPage = currentPage
                    setData(cleanData)
                    setPageCount(d.meta.pagination.pageCount)
                    setCurrentPage(currentPage + n)
                }

            })
            .catch(e => {
                if (e instanceof Error) setError(e.message)
            })
            .finally(() => {
                setLoading(false)
                // console.log("end of doFetch");
            })
    }

    // console.log("currentPage / pageCount", currentPage + "/" + pageCount)
        
    // display for loading component
    const loadingComponent = <div>Loading...</div>;
    // display for error component
    const errorComponent = <div className="text-red-500">Error: {error}</div>

    const fetchToDo = (n) => {
        if (n == 1) {
            // console.log("before", currentPage)
            if (currentPage - 1 >= 1) {
                //setCurrentPage(currentPage - 1)
                
                doFetch(-1)
                // console.log("after", currentPage)
            }
            // else console.log("minus")
        }
        else {
            // console.log("before", currentPage)
            if (currentPage + 1 <= pageCount) {
                //setCurrentPage(currentPage + 1)
                //setLoading(true)
                doFetch(1)
                // console.log("after", currentPage)
            }
            // else console.log("out of bound")
        }
    }

    return(
        <>
        
            <div className={styles.grid}>
                {
                    currentPage==1?<button disabled>Previous Fetch!</button>:
                    <button onClick={() => fetchToDo(1)}>Previous Fetch!</button>
                }
                
                <p>{currentPage} of {pageCount}</p>
                {
                    currentPage==pageCount?<button disabled>Next Fetch!</button>:
                    <button onClick={() => fetchToDo(0)}   >Next Fetch!</button>
                }
                
            </div>
            <div className={styles.grid}>
                {
                    loading ? (
                        loadingComponent
                    ) : error ? (
                        errorComponent
                    ) : (
                        <Table
                            aria-label="simple pokedex table"
                            color={`primary`}
                            radius={`none`}
                            topContent={`Table with TableHeader`}
                        >
                            <TableHeader columns={columns} allowsSorting={`true` }>
                                {(column) => 
                                    <TableColumn key={column.key}>{column.label}</TableColumn>
                                }
                            </TableHeader>
                            <TableBody items={data}>
                                {(row) => (
                                    <TableRow 
                                        key={row.id }
                                    >
                                        {/* <TableCell hidden>{row.id}</TableCell> */}
                                        <TableCell>
                                            <Image
                                                priority={true} src={row.pokemon.img} alt="something wrong with img src" width={50} height={50}
                                                unoptimized={true }
                                            ></Image>
                                        </TableCell>
                                        <TableCell >{row.pokemon.name}</TableCell>
                                        <TableCell >{row.types[0].name}</TableCell>
                                        <TableCell >{row.types[1].name}</TableCell>
                                        <TableCell>{row.stats.hp}</TableCell>
                                        <TableCell>{row.stats.atk}</TableCell>
                                        <TableCell>{row.stats.def}</TableCell>
                                        <TableCell>{row.stats.satk}</TableCell>
                                        <TableCell>{row.stats.sdef}</TableCell>
                                        <TableCell>{row.stats.speed}</TableCell>
                                        <TableCell>
                                                <ClickedCellLink path={'/list/[id]'} user={props.user} alias={`/list/${row.id} ` } desc='Detail' />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )
                }
            </div>
            
        </>
    )
}

export const ViewOldTable=props=>{
    
    return(
        <>
        </>
    )
}