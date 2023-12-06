import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import { NewForm } from '../../components/form'
import { process_json } from '../../components/components'
import * as RB from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { NavBar } from '../../components/mynavbar';
import { Cookies } from 'react-cookie';
import { Tabs } from '@geist-ui/core';
// import keyIndex from 'react-key-index'
const cookies=new Cookies()
const alert = <RB.Alert key={'danger'} variant={'danger'}>Failed created new data!</RB.Alert>
const success = <RB.Alert key={'success'} variant={'success'}>Success created new data!</RB.Alert>

export default function insert(props){
    const router = useRouter()
    const [tab, setTab]=useState("delete_pokemon")
    const [isMaster, setmaster]=useState(false)
    const [bearer, setbearer]=useState('')
    useEffect(() =>{
        if(!cookies.get('user')) router.push('/list/login')
        else{
            if(cookies.get('user').role == 'pokemon watcher')router.push('/list/pokemon')
            if(cookies.get('user').role == 'pokemon master')setmaster(true)
            setbearer('Bearer '+cookies.get('user').jwt)
        window.alert(bearer)
    }
        
    },[])
    const tabs_insert_content=<Tabs.Item label={'Insert'} value={1}>
                                    <RB.Tabs
                                        activeKey={tab}
                                        id="insert-tab-example"
                                        onSelect={(k) => setTab(k)}
                                        className='mb-3'
                                        fill
                                    >
                                        <RB.Tab eventKey="pokemon" title="Pokemon">
                                            <Pokemon names={props.data.names} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                        <RB.Tab eventKey="type" title="Type">
                                            <Type types={props.data.types} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                        <RB.Tab eventKey="ability" title="Ability">
                                            <Ability abilities={props.data.abilities} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                        <RB.Tab eventKey="detail" title="Pokemon Detail">
                                            <Detail names={props.data.restNames} types={props.data.types} abilities={props.data.abilities} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                    </RB.Tabs>
                                    {/* <ViewTable user={props.user} columns={props.columns} data={props.data} pageCount={props.pageCount}></ViewTable> */}
                                </Tabs.Item>
    const tabs_update_content=<><Tabs.Item label={'Update'} value={2}>
                                    <RB.Tabs
                                        activeKey={tab}
                                        id="update-tab-example"
                                        onSelect={(k) => setTab(k)}
                                        className='mb-3'
                                        fill
                                    >
                                        <RB.Tab eventKey="update_pokemon" title="Pokemon">
                                            <UpdateName names={props.data.update[0]} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                        <RB.Tab eventKey="update_type" title="Type">
                                            <UpdateType types={props.data.update[1]} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                        <RB.Tab eventKey="update_ability" title="Ability">
                                            <UpdateAbility abilities={props.data.update[2]} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                    </RB.Tabs>
                                </Tabs.Item></>
    const tabs_delete_content=<><Tabs.Item label={'Delete'} value={3} disabled={!isMaster}>
                                    <RB.Tabs
                                        activeKey={tab}
                                        id="delete-tab-example"
                                        onSelect={(k) => setTab(k)}
                                        className='mb-3'
                                        fill
                                    >
                                        <RB.Tab eventKey="delete_pokemon" title="Pokemon">
                                            <DeleteName names={props.data.update[0]} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                        <RB.Tab eventKey="delete_type" title="Type">
                                            <DeleteType types={props.data.update[1]} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                        <RB.Tab eventKey="delete_ability" title="Ability">
                                            <DeleteAbility abilities={props.data.update[2]} bearer={bearer?bearer:''}/>
                                        </RB.Tab>
                                    </RB.Tabs>
                                </Tabs.Item></>
	// var props =JSON.parse(router.query.property)
    // console.log(props.data)
    return(
        <div className={styles.container}>
            <Head>
                <title>Create</title>
                <meta name="insert mode" content="Generated by simple pokedex" />
                <link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
					integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
					crossOrigin="anonymous"
				/>
            </Head>
            <main className={styles.main}>
                <NavBar data={['Home ', 'Pokemon ']} />
                <Tabs initialValue={3} activeClassName="TabsActive">
                    {tabs_insert_content}
                    {tabs_update_content}
                    {tabs_delete_content}
                </Tabs>
                
            </main>
        </div>
    )
}

export const Pokemon=(props)=>{
    // console.log(cookies.get('user'))
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            name:e.target[0].value,
            hp:e.target[2].value,
            atk:e.target[3].value,
            def:e.target[4].value,
            satk:e.target[5].value,
            sdef:e.target[6].value,
            speed:e.target[7].value,
            img:e.target[1].value
        }
        // console.log('names',props.names)
        
        if (!checkIfExist(props.names, temp.name)) {
            console.log('current data',temp)
            var res=Fetch('pokemon-names',props.bearer,{data:temp}, 'POST')
            if (res){
                // for (let index = 0; index < e.target.length; index++) {
                //     e.target[index].value=null
                // }
                    window.alert('success!')
                    router.reload()
            }
            else if (!res)window.alert('failed!')
        }
        
    }
    return(
        <RB.Form onSubmit={handleSubmit} onReset={null}>

            <RB.Form.Group className="mb-3" controlId="form_pokemonname">
                <RB.Form.Label>Pokemon Name</RB.Form.Label>
                <RB.Form.Control type="text"
                // value={data.name} onChange={(e)=>setData(prev=>({...prev,name:e.value}))}
                // defaultValue={data.name}
                name="name" required
                placeholder="New Pokemon Name"></RB.Form.Control>
            </RB.Form.Group>

            <RB.Form.Group className="mb-3" controlId="form_img">
                <RB.Form.Label>Image address from raw.githubusercontent.com/PokeAPI</RB.Form.Label>
                <RB.Form.Control 
                    placeholder="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/example.png"
                    // defaultValue={data.img}
                    defaultValue={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png'}
                    name="img"
                />
            </RB.Form.Group>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_hp">
                    <RB.Form.Label>HP</RB.Form.Label>
                    <RB.Form.Control type="number" required 
                    // defaultValue={data.hp} 
                    defaultValue={1}
                    name="hp" min={0}
                placeholder="HP"/>
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_atk">
                    <RB.Form.Label>Attack</RB.Form.Label>
                    <RB.Form.Control type="number" required 
                    // defaultValue={data.atk}
                    defaultValue={1} 
                    name="atk" min={0}
                placeholder="Attack"/>
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_def">
                    <RB.Form.Label>Defense</RB.Form.Label>
                    <RB.Form.Control type="number" required 
                    // defaultValue={data.def} 
                    defaultValue={1}
                    name="def" min={0}
                placeholder="Defense" />
                </RB.Form.Group>
            </RB.Row>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_satk">
                    <RB.Form.Label>Special Attack</RB.Form.Label>
                    <RB.Form.Control type="number" required 
                    // defaultValue={data.satk}
                    defaultValue={1}
                    name="satk" min={0}
                placeholder="Special Attack" />
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_sdef">
                    <RB.Form.Label>Special Defense</RB.Form.Label>
                    <RB.Form.Control type="number" required 
                    // defaultValue={data.sdef}
                    defaultValue={1}
                    name="sdef" min={0}
                placeholder="Special Defense" />
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_speed">
                    <RB.Form.Label>Speed</RB.Form.Label>
                    <RB.Form.Control type="number" required 
                    // defaultValue={data.speed} 
                    defaultValue={1}
                    name="speed" min={0}
                placeholder="Speed" />
                </RB.Form.Group>
            </RB.Row>

            <RB.ButtonToolbar aria-label="Toolbar btngroup">
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="submit" name="submit">Submit</RB.Button>
                </RB.ButtonGroup >
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                </RB.ButtonGroup >
            </RB.ButtonToolbar>
        </RB.Form>
    )
}

export const Type=(props)=>{
    const router = useRouter()
    const [name, setName]=useState('')
    // const [bearer, setbearer]=useState('')
    // useEffect(()=>{
    //     if(cookies.get('user'))setbearer(`Bearer ${cookies.get('user').jwt}`)
    // },[])
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            name:e.target[0].value
        }
        if (!checkIfExist(props.types, temp.name)) {
            console.log('data from type',temp)
            var res=Fetch('types',props.bearer,{data:temp}, 'POST')
            console.log('result from res',res)
            if (res){
                // for (let index = 0; index < e.target.length; index++) {
                //     e.target[index].value=null
                // }
                    window.alert('success!')
                    router.reload()
            }
            else if (!res)window.alert('failed!')
        }
        
    }
    return(
        <RB.Form onSubmit={handleSubmit} onReset={null}>

            <RB.Form.Group className="mb-3" controlId="form_type">
                <RB.Form.Label>Type</RB.Form.Label>
                <RB.Form.Control type="text"
                defaultValue={name}
                name="name" required
                placeholder="Example fire, water or grass"></RB.Form.Control>
            </RB.Form.Group>

            <RB.ButtonToolbar aria-label="Toolbar btngroup">
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="submit" name="submit">Submit</RB.Button>
                </RB.ButtonGroup >
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                </RB.ButtonGroup >
            </RB.ButtonToolbar>
        </RB.Form>
    )
}
export const Ability=(props)=>{
    const router = useRouter()
    const [data, setData]=useState({
        name:'',
        flavor_text:''
    })
    const [bearer, setbearer]=useState('')
    useEffect(()=>{
        if(cookies.get('user'))setbearer(`Bearer ${cookies.get('user').jwt}`)
    },[])
    const handleSubmit=e=>{
        // e.preventDefault()
        
        var temp={
            name:e.target[0].value,
            flavor_text:e.target[1].value?e.target[1].value:'-',
        }
        
        if (!checkIfExist(props.abilities, temp.name, 'POST')) {
            console.log('data from ability',temp)
            var res=Fetch('pokemon-abilities',props.bearer,{data:temp},'POST')
            if (res){
                // for (let index = 0; index < e.target.length; index++) {
                //     e.target[index].value=null
                // }
                    window.alert('success!')
                    router.reload()
            }
            else if (!res)window.alert('failed!')
        }
    }
    return(
        <RB.Form onSubmit={handleSubmit} onReset={null}>

            <RB.Form.Group className="mb-3" controlId="form_ability">
                <RB.Form.Label>Ability</RB.Form.Label>
                <RB.Form.Control type="text"
                defaultValue={data.name} placeholder='New Ability Name' required
                name="name"></RB.Form.Control>
            </RB.Form.Group>
            <RB.Form.Group className="mb-3" controlId="form_flavortext">
                <RB.Form.Label>Flavor Text</RB.Form.Label>
                <RB.Form.Control type="text" placeholder='This ability can do something'
                defaultValue={data.flavor_text}
                name="flavor_text"></RB.Form.Control>
            </RB.Form.Group>

            <RB.ButtonToolbar aria-label="Toolbar btngroup">
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="submit" name="submit">Submit</RB.Button>
                </RB.ButtonGroup >
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                </RB.ButtonGroup >
            </RB.ButtonToolbar>
        </RB.Form>
    )
}

export const Detail=props=>{
    const router = useRouter()
    // console.log("detail",props.data.names)
    const [data, setData]=useState({
        newdata:{
            pokemonID:1,
            type:[1,props.types.length],
            ability:[0,0,0]
        },
        db:{
            flavor_text:[
                "","",""
            ],
            names:props.names,
            types:[props.types.slice(0,props.types.length-1),props.types],
            abilities:props.abilities
        }
    })
    const [bearer, setbearer]=useState('')
    useEffect(()=>{
        if(cookies.get('user'))setbearer(`Bearer ${cookies.get('user').jwt}`)
    },[])
    
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            pokemon_name:e.target[0].value,
            types:[e.target[1].value,e.target[2].value],
            pokemon_abilities:[e.target[3].value,e.target[4].value,e.target[5].value]
        }
        // if(data.newdata.type[0]==data.newdata.type[1]) return (<>window.alert('pokemon type should different each other or only one')</>)
        // for (let index = 0; index < e.target.length; index++) {
        //     console.log(e.target[index].name,e.target[index].value)
        // }
        console.log('data from detail',temp)
        var res=Fetch('c3s',props.bearer,{data:temp}, 'POST')
        if (res){
            // for (let index = 0; index < e.target.length; index++) {
            //     e.target[index].value=null
            // }
                window.alert('success!')
                router.reload()
        }
        else if (!res)window.alert('failed!')
    }

    const handleChange=(e)=>{
        const {name, value}=e.target
        // setState
        
        if(name == "abilities1" || name == "abilities2" || name == "abilities3"){
            // alert(e.target.name + " - " + e.target.value)
            var temp=data.newdata.ability
            var temp1=data.db.flavor_text
            if(name == "abilities1") {
                // e.target.name="f1"
                temp[0]=value
                temp1[0]=data.db.abilities[value-1].flavor_text
            }
            if(name == "abilities2") {
                // e.target.name="f2"
                temp[1]=value
                temp1[1]=data.db.abilities[value-1].flavor_text
            }
            if(name == "abilities3") {
                // e.target.name="f3"
                temp[2]=value
                temp1[2]=data.db.abilities[value-1].flavor_text
            }
            // console.log(e)
            setData(prev => ({...prev,
                db:{...prev.db,
                    ['flavor_text']:temp1
                },
                newdata:{...prev.newdata,
                    ['ability']:temp
                }
            }))
        }
    }

    const handleReset=(e)=>{
        setData(prev=>({...prev,
            db:{
                ...prev.db,flavor_text:["","",""]
            },
            newdata:{
                pokemonID:1,
                type:[1,props.types.length],
                ability:[0,0,0]
            }
        }))
    }
    // const example =[keyIndex(data.db.abilities,1),keyIndex(data.db.abilities,2),keyIndex(data.db.abilities,3)]
    // console.log("newdata", example[0])
    // console.log(example[0][0]._idId)
    return(
        <RB.Form onSubmit={handleSubmit} onReset={handleReset}>
            <RB.Form.Group className="mb-3" controlId="form_pokemonname">
                <RB.Form.Label>Pokemon Name</RB.Form.Label>
                <RB.Form.Select value={data.newdata.pokemonID} 
                onChange={(e) => setData(prev=>({...prev,newdata:{...prev.newdata,pokemonID : e.target.value}}))} name="pokemonID">
                    {data.db.names.map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                </RB.Form.Select>
            </RB.Form.Group>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_type1">
                    <RB.Form.Label>Type 1</RB.Form.Label>
                    <RB.Form.Select value={data.newdata.type[0]} 
                    onChange={(e) => setData(prev=>({...prev,newdata:{...prev.newdata,type : [e.target.value, data.newdata.type[1]]}}))} name="type1" >
                        {data.db.types[0].map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                    </RB.Form.Select>
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_type2">
                    <RB.Form.Label>Type 2</RB.Form.Label>
                    <RB.Form.Select value={data.newdata.type[1]} 
                    onChange={(e) => setData(prev=>({...prev,newdata:{...prev.newdata,type : [data.newdata.type[0], e.target.value]}}))} name="type2" >
                        {data.db.types[1].map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                        
                    </RB.Form.Select>
                </RB.Form.Group>
            </RB.Row>

            <RB.Row className="mb-3">
                
                {
                    [...Array(3)].map((e, i) => (
                        <RB.Form.Group as={RB.Col} controlId={"a"+i}>
                            <RB.Form.Label>Ability {i+1}</RB.Form.Label>
                            
                            <RB.Form.Select 
                                        value={data.newdata.ability[i]}
                                        onChange={handleChange}
                                        name={"abilities"+(i + 1)}
                                        
                                    >
                                
                                {data.db.abilities.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                                <option value={0}>-</option>
                                
                            </RB.Form.Select>
                            <RB.Form.Label >{data.db.flavor_text[i]}</RB.Form.Label>
                        </RB.Form.Group>
                    ))
                }
                
            </RB.Row>
            <RB.ButtonToolbar aria-label="Toolbar btngroup">
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="submit" name="submit">Submit</RB.Button>
                </RB.ButtonGroup >
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                </RB.ButtonGroup >
            </RB.ButtonToolbar>
        </RB.Form>
    )
}

export const UpdateName=props=>{
    // console.log(props.names)
    const router=useRouter()
    const [executeFetch, setDo]=useState(false)
    const [data, setData]=useState({
        name:'',
        img:'',
        hp:0,
        atk:0,
        def:0,
        satk:0,
        sdef:0,
        speed:0
    })
    const [id, setSelect]=useState(1)
    const handleReset=e=>{
        setSelect(1)
        setData({
            name:'',
            img:'',
            hp:0,
            atk:0,
            def:0,
            satk:0,
            sdef:0,
            speed:0
        })
    }
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            name:e.target[1].value,
            hp:e.target[3].value,
            atk:e.target[4].value,
            def:e.target[5].value,
            satk:e.target[6].value,
            sdef:e.target[7].value,
            speed:e.target[8].value,
            img:e.target[2].value
        }
        // console.log('names',props.names)
        
        // if (!checkIfExist(props.names, temp.name)) {
            // console.log('current data',temp)
            console.log('update')
            console.log('bearer',props.bearer)
            console.log('data1', temp)
            console.log('data2',data)
            console.log('id', id)
            // setDo(true)
            const res=Fetch('pokemon-names',props.bearer,{data: temp}, 'PUT',id)
            console.log('result of fetch', res)
            if (res) {
                window.alert('success!')
                router.reload()
            }
            else window.alert('failed!')
        // }
    }
    const handleChangePokemon=e=>{
        const c=e.target.value-1
        setData({
            name:props.names[c].name,
            img:props.names[c].img,
            hp:props.names[c].hp,
            atk:props.names[c].atk,
            def:props.names[c].def,
            satk:props.names[c].satk,
            sdef:props.names[c].sdef,
            speed:props.names[c].speed
        })
        setSelect(c+1)
        console.log('handle change',e.target.value)
        console.log('data',data)
    }
    const form=<RB.Form onSubmit={handleSubmit} onReset={handleReset}>
                    <RB.Form.Group className="mb-3" controlId="form_selectpokemon">
                        <RB.Form.Select value={id} 
                            onChange={handleChangePokemon} name="pokemonID">
                                {props.names.map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                            </RB.Form.Select>
                    </RB.Form.Group>
                    <RB.Form.Group className="mb-3" controlId="form_pokemonname">
                        <RB.Form.Label>Pokemon Name</RB.Form.Label>
                        <RB.Form.Control type="text"
                        value={data.name} onChange={(e)=>{setData(prev=>({...prev,name:e.target.value}))}}
                        // defaultValue={data.name}
                        name="name" required
                        placeholder="New Pokemon Name"></RB.Form.Control>
                    </RB.Form.Group>

                    <RB.Form.Group className="mb-3" controlId="form_img">
                        <RB.Form.Label>Image address from raw.githubusercontent.com/PokeAPI</RB.Form.Label>
                        <RB.Form.Control 
                            placeholder="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/example.png"
                            // defaultValue={data.img}
                            // defaultValue={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png'}
                            value={data.img} onChange={(e)=>setData(prev=>({...prev,img:e.target.value}))}
                            name="img"
                        />
                    </RB.Form.Group>

                    <RB.Row className="mb-3">
                        <RB.Form.Group as={RB.Col} controlId="form_hp">
                            <RB.Form.Label>HP</RB.Form.Label>
                            <RB.Form.Control type="number" required 
                            // defaultValue={data.hp} 
                            // defaultValue={1}
                            value={data.hp} onChange={(e)=>setData(prev=>({...prev,hp:e.target.value}))}
                            name="hp" min={0}
                        placeholder="HP"/>
                        </RB.Form.Group>

                        <RB.Form.Group as={RB.Col} controlId="form_atk">
                            <RB.Form.Label>Attack</RB.Form.Label>
                            <RB.Form.Control type="number" required 
                            // defaultValue={data.atk}
                            // defaultValue={1} 
                            value={data.atk} onChange={(e)=>setData(prev=>({...prev,atk:e.target.value}))}
                            name="atk" min={0}
                        placeholder="Attack"/>
                        </RB.Form.Group>

                        <RB.Form.Group as={RB.Col} controlId="form_def">
                            <RB.Form.Label>Defense</RB.Form.Label>
                            <RB.Form.Control type="number" required 
                            // defaultValue={data.def} 
                            // defaultValue={1}
                            value={data.def} onChange={(e)=>setData(prev=>({...prev,def:e.target.value}))}
                            name="def" min={0}
                        placeholder="Defense" />
                        </RB.Form.Group>
                    </RB.Row>

                    <RB.Row className="mb-3">
                        <RB.Form.Group as={RB.Col} controlId="form_satk">
                            <RB.Form.Label>Special Attack</RB.Form.Label>
                            <RB.Form.Control type="number" required 
                            // defaultValue={data.satk}
                            // defaultValue={1}
                            value={data.satk} onChange={(e)=>setData(prev=>({...prev,satk:e.target.value}))}
                            name="satk" min={0}
                        placeholder="Special Attack" />
                        </RB.Form.Group>

                        <RB.Form.Group as={RB.Col} controlId="form_sdef">
                            <RB.Form.Label>Special Defense</RB.Form.Label>
                            <RB.Form.Control type="number" required 
                            // defaultValue={data.sdef}
                            // defaultValue={1}
                            value={data.sdef} onChange={(e)=>setData(prev=>({...prev,sdef:e.target.value}))}
                            name="sdef" min={0}
                        placeholder="Special Defense" />
                        </RB.Form.Group>

                        <RB.Form.Group as={RB.Col} controlId="form_speed">
                            <RB.Form.Label>Speed</RB.Form.Label>
                            <RB.Form.Control type="number" required 
                            // defaultValue={data.speed} 
                            // defaultValue={1}
                            value={data.speed} onChange={(e)=>setData(prev=>({...prev,speed:e.target.value}))}
                            name="speed" min={0}
                        placeholder="Speed" />
                        </RB.Form.Group>
                    </RB.Row>

                    <RB.ButtonToolbar aria-label="Toolbar btngroup">
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="submit" name="submit">Update</RB.Button>
                        </RB.ButtonGroup >
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                        </RB.ButtonGroup >
                    </RB.ButtonToolbar>
                </RB.Form>
    return (<>{form}</>)
}

export const UpdateType=props=>{
    const router=useRouter()
    const [executeFetch, setDo]=useState(false)
    const [data, setData]=useState('')
    const [id, setSelect]=useState()
    const handleReset=e=>{
        setSelect(1)
        setData('')
    }
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={name:e.target[1].value}
        // console.log('names',props.names)
        
        // if (!checkIfExist(props.types, temp.name)) {
            // console.log('current data',temp)
            console.log('update')
            console.log('bearer',props.bearer)
            console.log('data1', temp)
            console.log('data2',data)
            console.log('id', id)
            // setDo(true)
            const res=Fetch('types',props.bearer,{data: temp}, 'PUT',id)
            console.log('result of fetch', res)
            if (res) {
                window.alert('success!')
                router.reload()
            }
            else window.alert('failed!')
        // }
    }
    const handleChangePokemon=e=>{
        const c=e.target.value-1
        setData(props.types[c].name)
        setSelect(c+1)
        console.log('handle change',e.target.value)
        console.log('data',data)
    }
    const form=<RB.Form onSubmit={handleSubmit} onReset={handleReset}>
                    <RB.Form.Group className="mb-3" controlId="form_selectpokemon">
                        <RB.Form.Select value={id} 
                            onChange={handleChangePokemon} name="typeID">
                            {props.types.map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                        </RB.Form.Select>
                    </RB.Form.Group>
                    <RB.Form.Group className="mb-3" controlId="form_pokemontype">
                        <RB.Form.Label>Pokemon Type</RB.Form.Label>
                        <RB.Form.Control type="text"
                        value={data} onChange={(e)=>{setData(e.target.value)}}
                        // defaultValue={data.name}
                        name="name" required
                        placeholder="New Pokemon Type"></RB.Form.Control>
                    </RB.Form.Group>

                    <RB.ButtonToolbar aria-label="Toolbar btngroup">
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="submit" name="submit">Update</RB.Button>
                        </RB.ButtonGroup >
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                        </RB.ButtonGroup >
                    </RB.ButtonToolbar>
                </RB.Form>
    return (<>{form}</>)
}

export const UpdateAbility=props=>{
    const router=useRouter()
    const [executeFetch, setDo]=useState(false)
    const [data, setData]=useState({
        name:'',flavor_text:''
    })
    const [id, setSelect]=useState()
    const handleReset=e=>{
        setSelect(1)
        setData({
            name:'',flavor_text:''
        })
    }
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            name:e.target[1].value,
            flavor_text:e.target[2].value
        }
        // console.log('names',props.names)
        
        // if (!checkIfExist(props.abilities, temp.name)) {
        //     // console.log('current data',temp)
            
        // }
        console.log('update')
        console.log('bearer',props.bearer)
        console.log('data1', temp)
        console.log('data2',data)
        console.log('id', id)
        // setDo(true)
        const res=Fetch('pokemon-abilities',props.bearer,{data: temp}, 'PUT',id)
        console.log('result of fetch', res)
        if (res) {
            window.alert('success!')
            router.reload()
        }
        else window.alert('failed!')
    }
    const handleChangePokemon=e=>{
        const c=e.target.value-1
        setData({name:props.abilities[c].name, flavor_text:props.abilities[c].flavor_text})
        setSelect(c+1)
        console.log('handle change',e.target.value)
        console.log('data',data)
    }
    const form=<RB.Form onSubmit={handleSubmit} onReset={handleReset}>
                    <RB.Form.Group className="mb-3" controlId="form_selectpokemon">
                        <RB.Form.Select value={id} 
                            onChange={handleChangePokemon} name="abilityID">
                            {props.abilities.map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                        </RB.Form.Select>
                    </RB.Form.Group>
                    <RB.Form.Group className="mb-3" controlId="form_pokemonability">
                        <RB.Form.Label>Pokemon Ability</RB.Form.Label>
                        <RB.Form.Control type="text"
                        value={data.name} onChange={(e)=>{setData(prev=>({...prev,name:e.target.value}))}}
                        // defaultValue={data.name}
                        name="name" required
                        placeholder="New Pokemon Type"></RB.Form.Control>
                    </RB.Form.Group>
                    <RB.Form.Group className="mb-3" controlId="form_pokemonability_flavortext">
                        <RB.Form.Label>Flavor Text</RB.Form.Label>
                        <RB.Form.Control type="text"
                        value={data.flavor_text} onChange={(e)=>{setData(prev=>({...prev,flavor_text:e.target.value}))}}
                        // defaultValue={data.name}
                        name="flavor_text"
                        placeholder="New Pokemon Type"></RB.Form.Control>
                    </RB.Form.Group>

                    <RB.ButtonToolbar aria-label="Toolbar btngroup">
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="submit" name="submit">Update</RB.Button>
                        </RB.ButtonGroup >
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                        </RB.ButtonGroup >
                    </RB.ButtonToolbar>
                </RB.Form>
    return (<>{form}</>)
}

export const DeleteName=props=>{
    // console.log(props.names)
    const router=useRouter()
    const [executeFetch, setDo]=useState(false)
    const [data, setData]=useState({
        name:'', img:'',
        hp:0, atk:0, def:0, satk:0, sdef:0, speed:0
    })
    const [id, setSelect]=useState(1)
    const handleReset=e=>{
        setSelect(1)
        setData({
            name:'',
            img:'',
            hp:0,
            atk:0,
            def:0,
            satk:0,
            sdef:0,
            speed:0
        })
    }
    const handleSubmit=e=>{
        e.preventDefault()
        // var temp={
        //     name:e.target[1].value
        // }
        // console.log('names',props.names)
        
        // if (!checkIfExist(props.names, temp.name)) {
            // console.log('current data',temp)
            console.log('delete')
            console.log('bearer',props.bearer)
            // console.log('data1', temp)
            // console.log('data2',data)
            console.log('id', id)
            // setDo(true)
            // const res=Fetch('pokemon-names',props.bearer,{data: temp}, 'DELETE',id)
            const res=FetchDel('pokemon-names',props.bearer,id)
            console.log('result of fetch', res)
            if (res) {
                window.alert('success!')
                router.reload()
            }
            else window.alert('failed!')
        // }
    }
    const handleChangePokemon=e=>{
        const c=e.target.value-1
        setData({
            name:props.names[c].name,
            img:props.names[c].img,
            hp:props.names[c].hp,
            atk:props.names[c].atk,
            def:props.names[c].def,
            satk:props.names[c].satk,
            sdef:props.names[c].sdef,
            speed:props.names[c].speed
        })
        setSelect(c+1)
        console.log('handle change',e.target.value)
        console.log('data',data)
    }
    const form=<RB.Form onSubmit={handleSubmit} onReset={handleReset}>
                    <RB.Form.Group className="mb-3" controlId="form_selectpokemon">
                        <RB.Form.Select value={id} 
                            onChange={handleChangePokemon} name="pokemonID">
                                {props.names.map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                            </RB.Form.Select>
                    </RB.Form.Group>
                <RB.Form.Group className="mb-3" controlId="form_pokemonname">
                    <RB.Form.Label>Pokemon Name</RB.Form.Label>
                    <RB.Form.Control type="text"
                    value={data.name} onChange={(e)=>{setData(prev=>({...prev,name:e.target.value}))}}
                    // defaultValue={data.name}
                    name="name" readOnly
                    placeholder="New Pokemon Name"></RB.Form.Control>
                </RB.Form.Group>

                <RB.Form.Group className="mb-3" controlId="form_img">
                    <RB.Form.Label>Image address from raw.githubusercontent.com/PokeAPI</RB.Form.Label>
                    <RB.Form.Control 
                        placeholder="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/example.png"
                        // defaultValue={data.img}
                        defaultValue={data.img}
                        name="img" readOnly
                    />
                </RB.Form.Group>

                <RB.Row className="mb-3">
                    <RB.Form.Group as={RB.Col} controlId="form_hp">
                        <RB.Form.Label>HP</RB.Form.Label>
                        <RB.Form.Control type="number" readOnly 
                        defaultValue={data.hp} 
                        // defaultValue={1}
                        name="hp" min={0}
                    placeholder="HP"/>
                    </RB.Form.Group>

                    <RB.Form.Group as={RB.Col} controlId="form_atk">
                        <RB.Form.Label>Attack</RB.Form.Label>
                        <RB.Form.Control type="number" readOnly 
                        defaultValue={data.atk}
                        // defaultValue={1} 
                        name="atk" min={0}
                    placeholder="Attack"/>
                    </RB.Form.Group>

                    <RB.Form.Group as={RB.Col} controlId="form_def">
                        <RB.Form.Label>Defense</RB.Form.Label>
                        <RB.Form.Control type="number" readOnly
                        defaultValue={data.def} 
                        // defaultValue={1}
                        name="def" min={0}
                        placeholder="Defense" />
                        </RB.Form.Group>
                    </RB.Row>

                    <RB.Row className="mb-3">
                        <RB.Form.Group as={RB.Col} controlId="form_satk">
                        <RB.Form.Label>Special Attack</RB.Form.Label>
                        <RB.Form.Control type="number" readOnly
                        defaultValue={data.satk}
                        // defaultValue={1}
                        name="satk" min={0}
                    placeholder="Special Attack" />
                    </RB.Form.Group>

                    <RB.Form.Group as={RB.Col} controlId="form_sdef">
                        <RB.Form.Label>Special Defense</RB.Form.Label>
                        <RB.Form.Control type="number" readOnly
                        defaultValue={data.sdef}
                        // defaultValue={1}
                        name="sdef" min={0}
                    placeholder="Special Defense" />
                    </RB.Form.Group>

                    <RB.Form.Group as={RB.Col} controlId="form_speed">
                        <RB.Form.Label>Speed</RB.Form.Label>
                        <RB.Form.Control type="number" readOnly
                        defaultValue={data.speed} 
                        // defaultValue={1}
                        name="speed" min={0}
                        placeholder="Speed" />
                        </RB.Form.Group>
                    </RB.Row>

                    <RB.ButtonToolbar aria-label="Toolbar btngroup">
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="submit" name="submit">Delete</RB.Button>
                        </RB.ButtonGroup >
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                        </RB.ButtonGroup >
                    </RB.ButtonToolbar>
                </RB.Form>
    return (<>{form}</>)
}

export const DeleteType=props=>{
    const router=useRouter()
    const [executeFetch, setDo]=useState(false)
    const [data, setData]=useState('')
    const [id, setSelect]=useState()
    const handleReset=e=>{
        setSelect(1)
        setData('')
    }
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={name:e.target[1].value}
        // console.log('names',props.names)
        
        // if (!checkIfExist(props.types, temp.name)) {
            // console.log('current data',temp)
            console.log('update')
            console.log('bearer',props.bearer)
            console.log('data1', temp)
            console.log('data2',data)
            console.log('id', id)
            // setDo(true)
            const res=FetchDel('types',props.bearer, id)
            console.log('result of fetch', res)
            if (res) {
                window.alert('success!')
                router.reload()
            }
            else window.alert('failed!')
        // }
    }
    const handleChangePokemon=e=>{
        const c=e.target.value-1
        setData(props.types[c].name)
        setSelect(c+1)
        console.log('handle change',e.target.value)
        console.log('data',data)
    }
    const form=<RB.Form onSubmit={handleSubmit} onReset={handleReset}>
                    <RB.Form.Group className="mb-3" controlId="form_selectpokemon">
                        <RB.Form.Select value={id} 
                            onChange={handleChangePokemon} name="typeID">
                            {props.types.map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                        </RB.Form.Select>
                    </RB.Form.Group>
                    <RB.Form.Group className="mb-3" controlId="form_pokemontype">
                        <RB.Form.Label>Pokemon Type</RB.Form.Label>
                        <RB.Form.Control type="text"
                        value={data} onChange={(e)=>{setData(e.target.value)}}
                        // defaultValue={data.name}
                        name="name" readOnly
                        placeholder="New Pokemon Type"></RB.Form.Control>
                    </RB.Form.Group>

                    <RB.ButtonToolbar aria-label="Toolbar btngroup">
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="submit" name="submit">Delete</RB.Button>
                        </RB.ButtonGroup >
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                        </RB.ButtonGroup >
                    </RB.ButtonToolbar>
                </RB.Form>
    return (<>{form}</>)
}

export const DeleteAbility=props=>{
    const router=useRouter()
    // const [executeFetch, setDo]=useState(false)
    const [data, setData]=useState({
        name:'',flavor_text:''
    })
    const [id, setSelect]=useState()
    const handleReset=e=>{
        setSelect(1)
        setData({
            name:'',flavor_text:''
        })
    }
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            name:e.target[1].value,
            flavor_text:e.target[2].value
        }
        console.log('update')
        console.log('bearer',props.bearer)
        console.log('data1', temp)
        console.log('data2',data)
        console.log('id', id)
        // setDo(true)
        const res=FetchDel('pokemon-abilities',props.bearer,id)
        console.log('result of fetch', res)
        if (res) {
            window.alert('success!')
            router.reload()
        }
        else window.alert('failed!')
    }
    const handleChangePokemon=e=>{
        const c=e.target.value-1
        setData({name:props.abilities[c].name, flavor_text:props.abilities[c].flavor_text})
        setSelect(c+1)
        console.log('handle change',e.target.value)
        console.log('data',data)
    }
    const form=<RB.Form onSubmit={handleSubmit} onReset={handleReset}>
                    <RB.Form.Group className="mb-3" controlId="form_selectpokemon">
                        <RB.Form.Select value={id} 
                            onChange={handleChangePokemon} name="abilityID">
                            {props.abilities.map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                        </RB.Form.Select>
                    </RB.Form.Group>
                    <RB.Form.Group className="mb-3" controlId="form_pokemonability">
                        <RB.Form.Label>Pokemon Ability</RB.Form.Label>
                        <RB.Form.Control type="text"
                        value={data.name} onChange={(e)=>{setData(prev=>({...prev,name:e.target.value}))}}
                        // defaultValue={data.name}
                        name="name" readOnly
                        placeholder="New Pokemon Type"></RB.Form.Control>
                    </RB.Form.Group>
                    <RB.Form.Group className="mb-3" controlId="form_pokemonability_flavortext">
                        <RB.Form.Label>Flavor Text</RB.Form.Label>
                        <RB.Form.Control type="text"
                        value={data.flavor_text} onChange={(e)=>{setData(prev=>({...prev,flavor_text:e.target.value}))}}
                        // defaultValue={data.name}
                        name="flavor_text" readOnly
                        placeholder="New Pokemon Type"></RB.Form.Control>
                    </RB.Form.Group>

                    <RB.ButtonToolbar aria-label="Toolbar btngroup">
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="submit" name="submit">Delete</RB.Button>
                        </RB.ButtonGroup >
                        <RB.ButtonGroup className="me-2">
                            <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                        </RB.ButtonGroup >
                    </RB.ButtonToolbar>
                </RB.Form>
    return (<>{form}</>)
}

export const UpdateDetail=props=>{
    const router = useRouter()
    // console.log("detail",props.data.names)
    const [data, setData]=useState({
        newdata:{
            pokemonID:1,
            type:[1,props.detail.types.length],
            ability:[0,0,0]
        },
        db:{
            flavor_text:[
                "","",""
            ],
            names:props.detail.names,
            types:[props.detail.types.slice(0,props.detail.types.length-1),props.detail.types],
            abilities:props.detail.abilities
        }
    })
    const [bearer, setbearer]=useState('')
    useEffect(()=>{
        if(cookies.get('user'))setbearer(`Bearer ${cookies.get('user').jwt}`)
    },[])
    
    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            pokemon_name:e.target[0].value,
            types:[e.target[1].value,e.target[2].value],
            pokemon_abilities:[e.target[3].value,e.target[4].value,e.target[5].value]
        }
        // if(data.newdata.type[0]==data.newdata.type[1]) return (<>window.alert('pokemon type should different each other or only one')</>)
        // for (let index = 0; index < e.target.length; index++) {
        //     console.log(e.target[index].name,e.target[index].value)
        // }
        console.log('data from detail',temp)
        var res=Fetch('c3s',props.bearer,{data:temp}, 'PUT')
        if (res){
            // for (let index = 0; index < e.target.length; index++) {
            //     e.target[index].value=null
            // }
                window.alert('success!')
                router.reload()
        }
        else if (!res)window.alert('failed!')
    }

    const handleChange=(e)=>{
        const {name, value}=e.target
        // setState
        
        if(name == "abilities1" || name == "abilities2" || name == "abilities3"){
            // alert(e.target.name + " - " + e.target.value)
            var temp=data.newdata.ability
            var temp1=data.db.flavor_text
            if(name == "abilities1") {
                // e.target.name="f1"
                temp[0]=value
                temp1[0]=data.db.abilities[value-1].flavor_text
            }
            if(name == "abilities2") {
                // e.target.name="f2"
                temp[1]=value
                temp1[1]=data.db.abilities[value-1].flavor_text
            }
            if(name == "abilities3") {
                // e.target.name="f3"
                temp[2]=value
                temp1[2]=data.db.abilities[value-1].flavor_text
            }
            // console.log(e)
            setData(prev => ({...prev,
                db:{...prev.db,
                    ['flavor_text']:temp1
                },
                newdata:{...prev.newdata,
                    ['ability']:temp
                }
            }))
        }
    }

    const handleReset=(e)=>{
        setData(prev=>({...prev,
            db:{
                ...prev.db,flavor_text:["","",""]
            },
            newdata:{
                pokemonID:1,
                type:[1,props.detail.types.length],
                ability:[0,0,0]
            }
        }))
    }
    // const example =[keyIndex(data.db.abilities,1),keyIndex(data.db.abilities,2),keyIndex(data.db.abilities,3)]
    // console.log("newdata", example[0])
    // console.log(example[0][0]._idId)
    return(
        <RB.Form onSubmit={handleSubmit} onReset={handleReset}>
            <RB.Form.Group className="mb-3" controlId="form_pokemonname">
                <RB.Form.Label>Pokemon Name</RB.Form.Label>
                <RB.Form.Select value={data.newdata.pokemonID} 
                onChange={(e) => setData(prev=>({...prev,newdata:{...prev.newdata,pokemonID : e.target.value}}))} name="pokemonID">
                    {data.db.names.map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                </RB.Form.Select>
            </RB.Form.Group>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_type1">
                    <RB.Form.Label>Type 1</RB.Form.Label>
                    <RB.Form.Select value={data.newdata.type[0]} 
                    onChange={(e) => setData(prev=>({...prev,newdata:{...prev.newdata,type : [e.target.value, data.newdata.type[1]]}}))} name="type1" >
                        {data.db.types[0].map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                    </RB.Form.Select>
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_type2">
                    <RB.Form.Label>Type 2</RB.Form.Label>
                    <RB.Form.Select value={data.newdata.type[1]} 
                    onChange={(e) => setData(prev=>({...prev,newdata:{...prev.newdata,type : [data.newdata.type[0], e.target.value]}}))} name="type2" >
                        {data.db.types[1].map((a)=> <option value={a.id} key={a.id + "-" + a.name}>{a.name}</option> )}
                        
                    </RB.Form.Select>
                </RB.Form.Group>
            </RB.Row>

            <RB.Row className="mb-3">
                
                {
                    [...Array(3)].map((e, i) => (
                        <RB.Form.Group as={RB.Col} controlId={"a"+i}>
                            <RB.Form.Label>Ability {i+1}</RB.Form.Label>
                            
                            <RB.Form.Select 
                                        value={data.newdata.ability[i]}
                                        onChange={handleChange}
                                        name={"abilities"+(i + 1)}
                                        
                                    >
                                
                                {data.db.abilities.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                                <option value={0}>-</option>
                                
                            </RB.Form.Select>
                            <RB.Form.Label >{data.db.flavor_text[i]}</RB.Form.Label>
                        </RB.Form.Group>
                    ))
                }
                
            </RB.Row>
            <RB.ButtonToolbar aria-label="Toolbar btngroup">
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="submit" name="submit">Submit</RB.Button>
                </RB.ButtonGroup >
                <RB.ButtonGroup className="me-2">
                    <RB.Button variant="primary" type="reset" name="reset">Reset</RB.Button>
                </RB.ButtonGroup >
            </RB.ButtonToolbar>
        </RB.Form>
    )
}

export async function getServerSideProps(context) {
    // const res = await fetch('http://127.0.0.1:1337/api/pokemoncount').catch((err) => console.log(err));
    // let d = await res.json()
    // const pokemoncount = d.data.attributes.count
    console.log('im enter server')
    const populate=`populate[0]=detail.types&populate[2]=detail.pokemon_name&populate[3]=detail.pokemon_abilities&pagination[limit]=300`
    const filter=`&filters[status][$eq]=true`
    const base=`http://127.0.0.1:1337/api/`
    var collection=`c3s`
    const restemp = await fetch(base+collection+'?'+populate+filter).catch((err) => console.log(err));
    let dtemp = await restemp.json()
    let c3s = dtemp.data.map((i)=>({
        id:i.attributes.detail.pokemon_name.data.id,
        name:i.attributes.detail.pokemon_name.data.attributes.name
    }))
    var results=[]
    collection=`pokemon-names?pagination[limit]=300`
    const names=await fetch(base+collection).catch((err)=> console.log("name is failed", err))
    const res1=await names.json()
    results.push(res1.data.map((i)=>({
        id:i.id,
        name:i.attributes.name
    })))
    const namesAll=res1.data.map((i)=>({
        id:i.id,
        name:i.attributes.name,
        img:i.attributes.img,
        hp:i.attributes.hp,
        atk:i.attributes.atk,
        def:i.attributes.def,
        satk:i.attributes.satk,
        sdef:i.attributes.sdef,
        speed:i.attributes.speed
    }))
    collection=`types?pagination[limit]=100`
    const types=await fetch(base+collection).catch((err)=> console.log("name is failed", err))
    const res2=await types.json()
    results.push(res2.data.map((i)=>({
        id:i.id,
        name:i.attributes.name
    })))
    collection=`pokemon-abilities?pagination[limit]=500`
    const abilities=await fetch(base+collection).catch((err)=> console.log("name is failed", err))
    const res3=await abilities.json()
    results.push(res3.data.map((i)=>({
        id:i.id,
        name:i.attributes.name,
        flavor_text:i.attributes.flavor_text
    })))
    // const arr_name=results[0]
    // const isSame=(a,b)=>a.id===b.id&&a.name===b.name
    // const getOnlyLeft=(l,r,compare)=>l.filter(lValue=>!r.some(rValue=>compare(lValue,rValue)))
    // const resL=getOnlyLeft(c3s,results[0],isSame)
    // const resR=getOnlyLeft(results[0],c3s,isSame)
    // const endResult=[...resL,...resR]
    // const anotherres=arr_name.filter(({}))
    
    const validNameToAdd=GetRestCompare(c3s,results[0],(a,b)=>a.id===b.id&&a.name===b.name)
    
    // console.log('c3s',c3s)
    // console.log('name',results[0])
    // console.log('the rest',validNameToAdd)

    // console.log(results)
    
    console.log('im leave')
    // console.log('my current context',context)
    return {
        props: {
            data:{
                names:results[0],
                types:results[1],
                abilities:results[2],
                restNames:validNameToAdd,
                namesAll:namesAll,
                update:[namesAll, results[1], results[2]]
            }
        }
    }
}

const Fetch = async (collection, bearer, data, mode, id=0) => {
    var b=false
    if (bearer == '') {
        return null
    }
    const req=`http://127.0.0.1:1337/api/${mode=='POST'?collection:collection+'/'+id}`
    const reqOpt={
                    method:mode,
                    headers:{ 
                        "Content-Type":"application/json",
                        "Authorization":bearer
                    },
                    body:JSON.stringify(data)
                }
    console.log('req',req)
    console.log('mode',mode)
    // console.log('id',id)
    console.log('data in fetch currently', JSON.stringify(data))
    
    const response = await fetch(req,reqOpt)
    // .then((data) => {
    //     console.log('this is data after res', data)
    //     window.alert('hey i almost here!2')
    //     if (data.status == 200) {
    //         window.alert('200!')
    //         console.log(mode + ', '+collection,data)
    //         // props.cookies.set("user",{username:d.user.username, jwt:d.jwt, role:"pokemon "+d.user.pokemon.toLowerCase()})
    //         // props.cookies.set("cookies",d)
    //         b= true
    //         // window.location.assign('/list/pokemon')
    //     }
    // })
    .then(res=>{
        if(!res.ok)throw new Error(`HTTP error ${res.status}`)
        return res.json()
    })
    .then(data=>{
        console.log('new data',data)
        b=true
    })
    .catch(e => {
        if (e instanceof Error) console.log(`fetch ${mode + ', '+collection} error`,e.message)
    })
    // const d = await response.json()
    // console.log('this is data in res', d)
    // window.alert('hey i almost here!')
    // if (d) {
    //     console.log('response',response)
    //     window.alert('check my data!')
    //     b=true
    // }
    console.log('fetch return',b)
    window.alert('wait!')
    return b
}

const FetchDel=async(collection='', bearer='', id=0)=>{
    var b=false
    if (collection==''||bearer==''||id==0) {
        console.log('Fetch Delete', `collection(${collection}), bearer(${bearer}) or id(${id}) is null`)
        return b
    }
    const req=`http://127.0.0.1:1337/api/${collection+'/'+id}`
    const reqOpt={
                    method:'DELETE',
                    headers:{ 
                        "Content-Type":"application/json",
                        "Authorization":bearer
                    }
                }
    console.log('req',req)
    
    const response = await fetch(req,reqOpt)
    .then(res=>{
        if(!res.ok)throw new Error(`HTTP error ${res.status}`)
        return res.json()
    })
    .then(data=>{
        console.log('delete data',data)
        b=true
    })
    .catch(e => {
        if (e instanceof Error) console.log(`fetch ${collection} error`,e.message)
    })
    // const d = await response.json()
    // console.log('this is data in res', d)
    // window.alert('hey i almost here!')
    // if (d) {
    //     console.log('response',response)
    //     window.alert('check my data!')
    //     b=true
    // }
    console.log('fetch return',b)
    window.alert('wait!')
    return b
}

function GetRestCompare(arr1, arr2, compare_func=(a,b)=>a.id===b.id){
    // const compare_func=(l,r,compare)=>l.filter(lValue=>!r.some(rValue=>compare(lValue,rValue)))
    const getLeft=(a1,a2)=>a1.filter(a1_value=>!a2.some(a2_value=>compare_func(a1_value,a2_value)))
    const resLeft=getLeft(arr1,arr2,compare_func)
    const resRight=getLeft(arr2,arr1,compare_func)
    return [...resLeft,...resRight]
}

function checkIfExist(arr_src, comparator_arg) {
    if (arr_src.filter((v)=>v.name.toLowerCase()==comparator_arg.toLowerCase()).length!=0) {
        window.alert(`This arg (${comparator_arg}) Already Exist!`)
        return true
    }
    return false
}