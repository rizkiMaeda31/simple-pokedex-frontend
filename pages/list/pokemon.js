import Head from 'next/head'
import Image from 'next/image'
// import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { CustomTabs, process_json } from '../../components/components'
import { NavBar } from '../../components/mynavbar'
import { Cookies } from 'react-cookie'

export default function list(props) {
    const cookies=new Cookies()
    const data=props.data
    
    var pageCount=null
    try{
        pageCount=props.pagination.pageCount
    }catch(e){

    }

    const columns = [
        // { key: "id", label:"ID" },
        { key: "sprite", label:"Sprite" },
        { key: "pokemon", label:"Pokemon" },{ key: "t1", label:"Type" },
        { key: "t2", label:"Type" },{ key: "hp", label:"HP" },
        { key: "atk", label:"Attack" },{ key: "def", label:"Defense" },
        { key: "satk", label:"Special Attack" },{ key: "sdef", label:"Special Defense" },
        { key: "s1", label:"Speed" },{ key: "detail", label:"" }
        // ,
        // { key: "edit", label:"" },{ key: "delete", label:"" }
    ]

    const [userinformation, setUserInformation]=useState('')
    useEffect(()=>{
        try {
            setUserInformation(<h4>You are a {cookies.get('user')?cookies.get('user').role:'Guest'}!</h4>)
        } catch (error) {
            console.log('setrole error', error)
        }
        
    },[])
    //const rows = props.data


  return (
            <div className={styles.container}>
            <Head>
                <title>Pokemon List</title>
                <meta name="description" content="Generated by simple pokedex" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <NavBar data={['Home ', 'Pokemon ', 'Insert']}/>
                <h1 className={styles.title}>
                    My <a href="/">PokeDex!</a>
                </h1>
                {userinformation}
                <CustomTabs initial="1" columns={columns} data={data} pageCount={pageCount} 
                // user={user}
                 />

                <div className={styles.grid} >

                        {
                        // loading ? (
                        //     loadingComponent
                        // ) : error ? (
                        //     errorComponent
                        // ) : (
                        //     <div>
                        //         <p>Loading complete and no errors. Displaying data...</p>
                        //         {/* <ViewTable columns={columns} data={data} /> */}
                                        

                        //                 {/*<ReactPaginate*/}
                        //                 {/*    previousLabel={'previous'}*/}
                        //                 {/*    nextLabel={'next'}*/}
                        //                 {/*    breakLabel={'...'}*/}
                        //                 {/*    breakClassName={'break-me'}*/}
                        //                 {/*    activeClassName={'active'}*/}
                        //                 {/*    containerClassName={'pagination'}*/}
                        //                 {/*    subContainerClassName={'pages pagination'}*/}

                        //                 {/*    initialPage={props.currentPage}*/}
                        //                 {/*    pageCount={props.pagination.pageCount}*/}
                        //                 {/*    marginPagesDisplayed={2}*/}
                        //                 {/*    pageRangeDisplayed={5}*/}
                        //                 {/*    onPageChange={pagginationHandler}*/}
                        //                 {/*/>*/}

                        //                 <p>Table with normal html</p>

                        //                 {/*<table className={styles.card} aria-label="simple table with html">*/}
                        //                 {/*    <thead>*/}
                        //                 {/*    <tr>*/}
                        //                 {/*    <th>Sprite</th>*/}
                        //                 {/*    <th>Pokemon</th>*/}
                        //                 {/*    <th>Type</th>*/}
                        //                 {/*    <th>Type</th>*/}
                        //                 {/*    <th>HP</th>*/}
                        //                 {/*    <th>Attack</th>*/}
                        //                 {/*    <th>Defense</th>*/}
                        //                 {/*    <th>Special Attack</th>*/}
                        //                 {/*    <th>Special Defense</th>*/}
                        //                 {/*    <th>Speed</th>*/}
                        //                 {/*    <th></th>*/}
                        //                 {/*    <th></th>*/}
                        //                 {/*    </tr>*/}
                        //                 {/*    </thead>*/}
                        //                 {/*    <tbody >*/}
                        //                 {/*        {*/}
                        //                 {/*            props.data.map((d) => {*/}
                        //                 {/*            return (*/}
                        //                 {/*                <tr key={d.id}>*/}
                        //                 {/*                    <td><Image src={d.pokemon.img} alt="" width={50} height={50}></Image></td>*/}
                        //                 {/*                    <td key={d.pokemon.id}>{d.pokemon.name}</td>*/}
                        //                 {/*                {d.types.map((t) => {*/}
                        //                 {/*                    return (*/}
                        //                 {/*                        <td key={t.id }>{t.name}</td>*/}
                        //                 {/*                    )*/}
                        //                 {/*                })}*/}
                        //                 {/*                    <td>{d.stats.hp}</td>*/}
                        //                 {/*                    <td>{d.stats.atk}</td>*/}
                        //                 {/*                    <td>{d.stats.def}</td>*/}
                        //                 {/*                    <td>{d.stats.satk}</td>*/}
                        //                 {/*                    <td>{d.stats.sdef}</td>*/}
                        //                 {/*                    <td>{d.stats.speed}</td>*/}
                        //                 {/*                    <td><button type="button" onClick={()=>window.alert('edit')}>Edit</button></td>*/}
                        //                 {/*                    <td><button type="button" onClick={()=>window.alert('delete')} disabled>Delete</button></td>*/}
                        //                 {/*                </tr>*/}
                        //                 {/*            )*/}
                        //                 {/*        })}*/}
                        //                 {/*        {(row) => (*/}
                        //                 {/*            <tablerow key={row.id}>*/}
                        //                 {/*              <tablecell></tablecell>*/}
                        //                 {/*            </tablerow>*/}
                        //                 {/*        ) }*/}
                        //                 {/*    </tbody>*/}
                        //                 {/*</table>*/}
                        //                 {/*<Pagination*/}
                        //                 {/*    items={props.data} // 100*/}
                        //                 {/*    currentPage={currentPage} // 1*/}
                        //                 {/*    pageSize={pageSize} // 10*/}
                        //                 {/*    onPageChange={onPageChange}*/}
                        //                 {/*    count={props.pagination.pageCount}*/}
                        //                 {/*/>*/}

                        //     </div>
                        // )
                        }
                        
                </div>
                    {/* {props.data != null? props.data.length:"" } */}
            </main>

            <footer className={styles.footer}>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                Powered by{' '}
                <span className={styles.logo}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
                </a>
            </footer>
            </div>
  )
}

export async function getServerSideProps() {
    const res = await fetch('http://127.0.0.1:1337/api/pokemoncount').catch((err) => console.log(err));
    let d = await res.json()
    const pokemoncount = d.data.attributes.count
    const populate=`populate[0]=detail.types&populate[2]=detail.pokemon_name&populate[3]=detail.pokemon_abilities&pagination[page]=1&pagination[pageSize]=25`
    const filter=`&filters[status][$eq]=true`
    const res1 = await fetch('http://127.0.0.1:1337/api/c3s?'+populate+filter).catch((err) => console.log(err));
    let d1 = await res1.json()
    let arr = process_json(d1.data)
    let pagination=null
    try{
        pagination=d1.meta.pagination
    }
    catch(e){
        console.log("pagination",e)
    }
    return {
        props: {
            count: pokemoncount||null,
            data: arr||null,
            pagination: pagination||null,
            currentPage:1
            //count: pokemoncount,
            //data: null,
            //pagination: null,
            //currentPage:1
        }
    }
}

