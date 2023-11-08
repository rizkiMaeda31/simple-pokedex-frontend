import Link from 'next/link';
import { useState } from 'react';
import { Tabs } from '@geist-ui/core'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { ViewTable } from './table'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
// import { Link } from "react-router-dom";



export const PokemonDataDetail = props => {
    return(
        <>
            {/* {console.log(props.obj)} */}
            <div className={styles.grid}>
                <Image
                    priority={true} src={props.obj.pokemon.img} alt="" width={100} height={100}
                    unoptimized={true }
                ></Image>
                <h1>{props.obj.pokemon.name}</h1>
            </div>
                    
            <Table aria-label="pokemon type">
                <TableHeader>
                    <TableColumn >Type</TableColumn>
                    <TableColumn ></TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell></TableCell>
                        <TableCell>{props.obj.types[0].name}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell></TableCell>
                        <TableCell>{props.obj.types[1].name}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <br></br>
            <Table aria-label="pokemon abilities" hidden={props.status == 0? true:false}>
                <TableHeader>
                    <TableColumn>Abilities</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody items={props.obj.abilities}>
            {
                (ability) => (
                    <TableRow key={ability.id}>
                        <TableCell>{ability.name}</TableCell>
                        <TableCell>{ability.flavor_text}</TableCell>
                    </TableRow>
                )
            }
                </TableBody>
            </Table>
            <br></br>
            <Table aria-label="pokemon stats">
                <TableHeader>
                    <TableColumn>Stats</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>HP</TableCell>
                        <TableCell>{props.obj.stats.hp}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Attack</TableCell>
                        <TableCell>{props.obj.stats.atk}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Defense</TableCell>
                        <TableCell>{props.obj.stats.def}</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>Special Attack</TableCell>
                        <TableCell>{props.obj.stats.satk}</TableCell>
                    </TableRow>
                    <TableRow key="5">
                        <TableCell>Special Defense</TableCell>
                        <TableCell>{props.obj.stats.sdef}</TableCell>
                    </TableRow>
                    <TableRow key="6">
                        <TableCell>Speed</TableCell>
                        <TableCell>{props.obj.stats.speed}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}

export const ClickedCellLink = props => {
    return (
        <>
            {/* this is Link from nextjs library */}
            <Link href={{
                pathname: props.path
                ,query: props.user
            }} as={props.alias}>
                <button>{props.desc}</button>
            </Link>

            {/* <Link
                to={{
                    pathname:'/',
                    state:props.query
                }}
            >
                <button>{props.desc}</button>
            </Link> */}

        </>
    )
}

export const CustomTabs = props => {
    //const [selected, setSelected] = useState()
    const items = [
        {label: "nextui-table", value: "1", content:"content1"},
        {label: "old table", value: "2", content:"content2"}
    ]
    return (
        <>
            {props.data?
                (<Tabs initialValue={props.initial} activeClassName="TabsActive">
                    <Tabs.Item label={items[0].label} value={items[0].value} hidden={true}>
                        <ViewTable user={props.user} columns={props.columns} data={props.data} pageCount={props.pageCount}></ViewTable>
                    </Tabs.Item>
                    <Tabs.Item label={items[1].label} value={items[1].value}>
                        no content
                    </Tabs.Item>
                </Tabs>):
                (
                    <>
                    <h1>Oopss!</h1>
                    <h2>Strapi is not connected!</h2>
                    </>
                )
                }
        </>
    )
}

export function process_json(data) {
    let temp = null
    if(data != null){
        temp = data.map((i) => ({
            //key:i.id,
            id: i.id,
            pokemon: {
                id: i.attributes.detail.pokemon_name.data.id,
                name: i.attributes.detail.pokemon_name.data.attributes.name,
                img: i.attributes.detail.pokemon_name.data.attributes.img
            },
            types: i.attributes.detail.types.data.map((type) => ({
                id: type.id,
                name: type.attributes.name
            })),
            stats: {
                hp: i.attributes.detail.pokemon_name.data.attributes.hp,
                atk: i.attributes.detail.pokemon_name.data.attributes.atk,
                def: i.attributes.detail.pokemon_name.data.attributes.def,
                satk: i.attributes.detail.pokemon_name.data.attributes.satk,
                sdef: i.attributes.detail.pokemon_name.data.attributes.sdef,
                speed: i.attributes.detail.pokemon_name.data.attributes.speed
            },
            abilities: i.attributes.detail.pokemon_abilities.data.map((ability) => ({
                id: ability.id,
                name: ability.attributes.name,
                flavor_text: ability.attributes.flavor_text
            }))
        }))
    }
    
    return temp
}
