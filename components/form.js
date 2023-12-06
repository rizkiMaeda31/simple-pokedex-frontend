import * as RB from 'react-bootstrap'
import { useState } from 'react'
import { Cookies } from 'react-cookie'

const cookies=new Cookies()
export const EditForm=props=>{
    // const [data, setData]=useState(props.data)
    const abilities=props.abilities
    const types=props.types
    const names=props.names

    const [data, setData]=useState({
        rowID:props.data.id,
        pokemonID:props.data.pokemon.id,
        type1:props.data.types[0].id,
        type2:props.data.types[1].id,
        abilities:props.data.abilities.map((a)=>a.id),
        hp:props.data.stats.hp,
        atk:props.data.stats.atk,
        def:props.data.stats.def,
        satk:props.data.stats.satk,
        sdef:props.data.stats.sdef,
        speed:props.data.stats.speed,
        img:props.data.pokemon.img,
        flavor_text:[
            abilities[props.data.abilities[0].id-1].flavor_text,
            (props.data.abilities[1].id != 0)?abilities[props.data.abilities[1].id-1].flavor_text:"",
            (props.data.abilities[2].id != 0)?abilities[props.data.abilities[2].id-1].flavor_text:""
        ]
    })
    if(data.abilities.length == 1){
        var temp = data.abilities
        temp.push(0)
        temp.push(0)
        setData((prevdata) => ({...prevdata, abilities:temp}))
    }
    else if (data.abilities.length == 2){
        var temp = data.abilities
        temp.push(0)
        setData((prevdata) => ({...prevdata, abilities:temp}))
    }
        
    const handleChange=(e)=>{
        const {name, value}=e.target
        // setState
        console.log("enter")
        console.log("name",name)
        console.log("value",value)
        
        if(name == "abilities1" || name == "abilities2" || name == "abilities3"){
            // alert(e.target.name + " - " + e.target.value)
            var temp=data.abilities
            var temp1=data.flavor_text
            if(name == "abilities1") {
                // e.target.name="f1"
                temp[0]=value
                temp1[0]=abilities[value-1].flavor_text
            }
            if(name == "abilities2") {
                // e.target.name="f2"
                temp[1]=value
                temp1[1]=abilities[value-1].flavor_text
            }
            if(name == "abilities3") {
                // e.target.name="f3"
                temp[2]=value
                temp1[2]=abilities[value-1].flavor_text
            }
            // console.log(e)
            setData(prev => ({...prev, 
                ['abilities']: temp,
                ['flavor_text']:temp1
            }))
        }
    }

    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            rowID:e.target[0].value,
            pokemonID:e.target[1].value,
            types:[e.target[2].value,e.target[3].value],
            abilities:[e.target[11].value,e.target[12].value,e.target[13].value],
            hp:e.target[5].value,
            atk:e.target[6].value,
            def:e.target[7].value,
            satk:e.target[8].value,
            sdef:e.target[9].value,
            speed:e.target[10].value,
            img:e.target[4].value
        }
        console.log(temp)
        // for(let i=0;i<e.target.length;i++)
        //     console.log(i+" - "+e.target[i].name +" "+e.target[i].value)
        // doFetch(temp)
    }

    const reset=(e)=>{
        e.preventDefault()
        setData({
            rowID:props.data.id,
            pokemonID:props.data.pokemon.id,
            type1:props.data.types[0].id,
            type2:props.data.types[1].id,
            abilities:props.data.abilities.map((a)=>a.id),
            hp:props.data.stats.hp,
            atk:props.data.stats.atk,
            def:props.data.stats.def,
            satk:props.data.stats.satk,
            sdef:props.data.stats.sdef,
            speed:props.data.stats.speed,
            img:props.data.pokemon.img,
            flavor_text:[
                abilities[props.data.abilities[0].id-1].flavor_text,
                (props.data.abilities[1].id != 0)?abilities[props.data.abilities[1].id-1].flavor_text:"",
                (props.data.abilities[2].id != 0)?abilities[props.data.abilities[2].id-1].flavor_text:""
            ]
        })
        console.log("data",data)
        
        // for(let i=0;i<e.target.length;i++)
        //     console.log(i+" - "+e.target[i].name +" "+e.target[i].value)
    }

    const doFetch=(data)=>{
        console.log(data.pokemonID)
    }
    
    return(
        <RB.Form onSubmit={handleSubmit} onReset={reset}>
            <RB.Form.Group className="mb-3" controlId="form_pokemonID">
                <RB.Form.Label visuallyHidden={true}>ID</RB.Form.Label>
                {/* <RB.Form.Control type="number" defaultValue={data.id} readOnly name="id" /> */}
                <RB.Form.Control type="number" defaultValue={data.rowID} readOnly hidden name="rowID" />
            </RB.Form.Group>

            <RB.Form.Group className="mb-3" controlId="form_pokemonname">
                <RB.Form.Label>Pokemon Name</RB.Form.Label>
                {/* <RB.Form.Select defaultValue={data.pokemon.id} name="name"> */}
                <RB.Form.Select defaultValue={data.pokemonID} name="pokemonID">
                    {names.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                </RB.Form.Select>
            </RB.Form.Group>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_type1">
                    <RB.Form.Label>Type 1</RB.Form.Label>
                    {/* <RB.Form.Select defaultValue={data.types[0].id} name="type1" > */}
                    <RB.Form.Select defaultValue={data.type1} name="type1" >
                        {types.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                    </RB.Form.Select>
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_type2">
                    <RB.Form.Label>Type 2</RB.Form.Label>
                    {/* <RB.Form.Select defaultValue={data.types[1].id} name="type2" > */}
                    <RB.Form.Select defaultValue={data.type2} name="type2" >
                        {types.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                        <option value={0}>-</option>
                    </RB.Form.Select>
                </RB.Form.Group>
            </RB.Row>

            <RB.Form.Group className="mb-3" controlId="form_img">
                <RB.Form.Label>Image address from raw.githubusercontent.com/PokeAPI</RB.Form.Label>
                <RB.Form.Control 
                    placeholder="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/example.png"
                    defaultValue={data.img}
                    // value={data.img}
                    // onChange={(e)=>e.target.value}
                    name="img"
                />
            </RB.Form.Group>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_hp">
                    <RB.Form.Label>HP</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.hp} name="hp"/> */}
                    <RB.Form.Control type="number" defaultValue={data.hp} name="hp"/>
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_atk">
                    <RB.Form.Label>Attack</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.atk} name="atk" /> */}
                    <RB.Form.Control type="number" defaultValue={data.atk} name="atk" />
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_def">
                    <RB.Form.Label>Defense</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.def} name="def" /> */}
                    <RB.Form.Control type="number" defaultValue={data.def} name="def" />
                </RB.Form.Group>
            </RB.Row>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_satk">
                    <RB.Form.Label>Special Attack</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.satk} name="satk" /> */}
                    <RB.Form.Control type="number" defaultValue={data.satk} name="satk" />
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_sdef">
                    <RB.Form.Label>Special Defense</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.sdef} name="sdef" /> */}
                    <RB.Form.Control type="number" defaultValue={data.sdef} name="sdef" />
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_speed">
                    <RB.Form.Label>Speed</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.speed} name="speed" /> */}
                    <RB.Form.Control type="number" defaultValue={data.speed} name="speed" />
                </RB.Form.Group>
            </RB.Row>

            <RB.Row className="mb-3">
                
                {
                    [...Array(3)].map((e, i) => (
                        <RB.Form.Group as={RB.Col} controlId={"a"+i}>
                            <RB.Form.Label>Ability {i+1}</RB.Form.Label>
                            
                            <RB.Form.Select 
                                        // defaultValue={data.abilities[i]}
                                        value={data.abilities[i]}
                                        onChange={handleChange}
                                        name={"abilities"+(i + 1)}
                                    >
                                {abilities.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                                <option value={0} key={0}>-</option>
                                
                            </RB.Form.Select>
                            <RB.Form.Label >{data.flavor_text[i]}</RB.Form.Label>
                        </RB.Form.Group>
                    ))
                }
                
            </RB.Row>

            {/* <RB.Form.Group className="mb-3" id="formGridCheckbox">
                <RB.Form.Check type="checkbox" label="Check me out" />
            </RB.Form.Group> */}

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
export const DeleteForm=props=>{
    const navbar=<h6>Place navbar in here!</h6>
    const body=<h1>This is Body!</h1>
    return(
        <>{navbar}
        {body}
        </>
    )
}
export const PokemonForm=()=>{
    // const [data, setData]=useState({
    //     rowID:props.data.id,
    //     pokemonID:props.data.pokemon.id,
    //     type1:props.data.types[0].id,
    //     type2:props.data.types[1].id,
    //     abilities:props.data.abilities.map((a)=>a.id),
    //     hp:props.data.stats.hp,
    //     atk:props.data.stats.atk,
    //     def:props.data.stats.def,
    //     satk:props.data.stats.satk,
    //     sdef:props.data.stats.sdef,
    //     speed:props.data.stats.speed,
    //     img:props.data.pokemon.img
    // })
    // if(data.abilities.length == 1){
    //     var temp = data.abilities
    //     temp.push(0)
    //     temp.push(0)
    //     setData((prevdata) => ({...prevdata, abilities:temp}))
    // }
    // else if (data.abilities.length == 2){
    //     var temp = data.abilities
    //     temp.push(0)
    //     setData((prevdata) => ({...prevdata, abilities:temp}))
    // }

    const abilities=props.abilities
    const types=props.types
    const names=props.names
    // abilities[data.abilities[0].id].flavor_text
    const [flavor_text, setFT]=useState(
        {f1:abilities[data.abilities[0]-1].flavor_text,
        f2:(data.abilities[1] != 0)?abilities[data.abilities[1]-1].flavor_text:"",
        f3:(data.abilities[2] != 0)?abilities[data.abilities[2]-1].flavor_text:""}
    )
    // console.log("abilities", props.abilities)
    // console.log("types", props.types)
    // console.log("names", props.names)
    const changeFT=(e)=>{
        var {name, value}=e.target
        if (name == "abilities1") name="f1"
        if (name == "abilities2") name="f2"
        if (name == "abilities3") name="f3"
        setFT(prevstate=>({
            ...prevstate,
            [name]:abilities[value-1].flavor_text
        }))
    }
    const handleChange=(e)=>{
        const {name, value}=e.target
        // setState
        // console.log("enter")
        // console.log("name",name)
        // console.log("value",value)
        if(name == "abilities1" || name == "abilities2" || name == "abilities3"){
            // alert(e.target.name + " - " + e.target.value)
            var temp=data.abilities
            if(name == "abilities1") {
                // e.target.name="f1"
                temp[0]=value
            }
            if(name == "abilities2") {
                // e.target.name="f2"
                temp[1]=value
            }
            if(name == "abilities3") {
                // e.target.name="f3"
                temp[2]=value
            }
            // console.log(e)
            setData(prev => ({...prev, [abilities]: temp}))
            changeFT(e)
        }
    }

    const handleSubmit=e=>{
        e.preventDefault()
        var temp={
            rowID:e.target[0].value,
            pokemonID:e.target[1].value,
            types:[e.target[2].value,e.target[3].value],
            abilities:[e.target[11].value,e.target[12].value,e.target[13].value],
            hp:e.target[5].value,
            atk:e.target[6].value,
            def:e.target[7].value,
            satk:e.target[8].value,
            sdef:e.target[9].value,
            speed:e.target[10].value,
            img:e.target[4].value
        }
        // console.log(temp)
        // for(let i=0;i<e.target.length;i++)
        //     console.log(i+" - "+e.target[i].name +" "+e.target[i].value)
        doFetch(temp)
    }

    const reset=(e)=>{
        
        setData({
            rowID:props.data.id,
            pokemonID:props.data.pokemon.id,
            type1:props.data.types[0].id,
            type2:props.data.types[1].id,
            abilities:props.data.abilities.map((a)=>a.id),
            hp:props.data.stats.hp,
            atk:props.data.stats.atk,
            def:props.data.stats.def,
            satk:props.data.stats.satk,
            sdef:props.data.stats.sdef,
            speed:props.data.stats.speed,
            img:props.data.pokemon.img
        })

        // for(let i=0;i<e.target.length;i++)
        //     console.log(i+" - "+e.target[i].name +" "+e.target[i].value)
    }

    const doFetch=(data)=>{
        console.log(data.pokemonID)
    }

    // console.log(data)
    return(
        <RB.Form onSubmit={handleSubmit} onReset={reset}>
            <RB.Form.Group className="mb-3" controlId="form_pokemonID">
                <RB.Form.Label visuallyHidden={true}>ID</RB.Form.Label>
                {/* <RB.Form.Control type="number" defaultValue={data.id} readOnly name="id" /> */}
                <RB.Form.Control type="number" defaultValue={data.rowID} readOnly hidden name="rowID" />
            </RB.Form.Group>

            <RB.Form.Group className="mb-3" controlId="form_pokemonname">
                <RB.Form.Label>Pokemon Name</RB.Form.Label>
                {/* <RB.Form.Select defaultValue={data.pokemon.id} name="name"> */}
                <RB.Form.Select defaultValue={data.pokemonID} name="pokemonID">
                    {names.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                </RB.Form.Select>
            </RB.Form.Group>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_type1">
                    <RB.Form.Label>Type 1</RB.Form.Label>
                    {/* <RB.Form.Select defaultValue={data.types[0].id} name="type1" > */}
                    <RB.Form.Select defaultValue={data.type1} name="type1" >
                        {types.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                    </RB.Form.Select>
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_type2">
                    <RB.Form.Label>Type 2</RB.Form.Label>
                    {/* <RB.Form.Select defaultValue={data.types[1].id} name="type2" > */}
                    <RB.Form.Select defaultValue={data.type2} name="type2" >
                        {types.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                        <option value={0}>-</option>
                    </RB.Form.Select>
                </RB.Form.Group>
            </RB.Row>

            <RB.Form.Group className="mb-3" controlId="form_img">
                <RB.Form.Label>Image address from raw.githubusercontent.com/PokeAPI</RB.Form.Label>
                <RB.Form.Control 
                    placeholder="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/example.png"
                    // defaultValue={data.pokemon.img}
                    value={data.img}
                    onChange={(e)=>e.target.value}
                    name="img"
                />
            </RB.Form.Group>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_hp">
                    <RB.Form.Label>HP</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.hp} name="hp"/> */}
                    <RB.Form.Control type="number" defaultValue={data.hp} name="hp"/>
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_atk">
                    <RB.Form.Label>Attack</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.atk} name="atk" /> */}
                    <RB.Form.Control type="number" defaultValue={data.atk} name="atk" />
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_def">
                    <RB.Form.Label>Defense</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.def} name="def" /> */}
                    <RB.Form.Control type="number" defaultValue={data.def} name="def" />
                </RB.Form.Group>
            </RB.Row>

            <RB.Row className="mb-3">
                <RB.Form.Group as={RB.Col} controlId="form_satk">
                    <RB.Form.Label>Special Attack</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.satk} name="satk" /> */}
                    <RB.Form.Control type="number" defaultValue={data.satk} name="satk" />
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_sdef">
                    <RB.Form.Label>Special Defense</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.sdef} name="sdef" /> */}
                    <RB.Form.Control type="number" defaultValue={data.sdef} name="sdef" />
                </RB.Form.Group>

                <RB.Form.Group as={RB.Col} controlId="form_speed">
                    <RB.Form.Label>Speed</RB.Form.Label>
                    {/* <RB.Form.Control type="number" defaultValue={data.stats.speed} name="speed" /> */}
                    <RB.Form.Control type="number" defaultValue={data.speed} name="speed" />
                </RB.Form.Group>
            </RB.Row>

            <RB.Row className="mb-3">
                
                {
                    [...Array(3)].map((e, i) => (
                        <RB.Form.Group as={RB.Col} controlId={"a"+i}>
                            <RB.Form.Label>Ability {i+1}</RB.Form.Label>
                            
                            <RB.Form.Select 
                                        defaultValue={data.abilities[i]}
                                        onChange={handleChange}
                                        name={"abilities"+(i + 1)}
                                    >
                                {abilities.map((a)=> <option value={a.id} key={a.id}>{a.name}</option> )}
                                <option value={0} key={0}>-</option>
                                
                            </RB.Form.Select>
                            <RB.Form.Label>{flavor_text["f"+(i + 1)]}</RB.Form.Label>
                        </RB.Form.Group>
                    ))
                }
                
            </RB.Row>

            {/* <RB.Form.Group className="mb-3" id="formGridCheckbox">
                <RB.Form.Check type="checkbox" label="Check me out" />
            </RB.Form.Group> */}

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