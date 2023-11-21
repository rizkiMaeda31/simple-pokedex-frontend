"use client"
// import * as Auth from '../../components/authentication'
import { useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import * as RB from 'react-bootstrap'

export default function login(){
    const cookies=new Cookies()

    // const [userdata, setdata]=useState({
    //     username:'',
    //     jwt:''
    // })
    // const [username, setuser]=useState()
    // const [jwt, setjwt]=useState()
    // if(cookies.get('user') && cookies.get('user').jwt!='') {
    //     // console.log("cookies",cookies.get('user'))
    //     // setuser(cookies.get('user').username)
    //     // setjwt(cookies.get('user').jwt)
    //     // console.log(userdata)
    // }
    const [isCookies, setIsCookies]=useState(false)
    const [showCookies, setDebug]=useState("")
    useEffect(()=>{
        if(cookies.get('user')){
            setIsCookies(true)
            setDebug(<p>
                my name is {cookies.get('user').username} <br /> currently i have jwt: {cookies.get('user').jwt}
                <br />my role is {cookies.get('user').role}
            </p>)
            window.location.assign('/list/pokemon')
        }
    },[])
    
    // if(cookies.get('user') && !isCookies)setIsCookies(true)
    return(
        <div className={styles.container}>
            <Head>
                <title>Login</title>
                <meta name="description" content="Generated by simple pokedex" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                    crossOrigin="anonymous"
                />
            </Head>
            <main className={styles.main}>
                
                {
                isCookies 
                // cookies.get('user')
                ?(showCookies):
                (<Loginform cookies={cookies}/>)}
                {/* {cookies.get('user').jwt} */}
                {/* <Loginform /> */}
            </main> 
        </div>
    )
}

const Loginform=(props)=>{
    const handleSubmit=e=>{
        e.preventDefault()
        fetch(`http://127.0.0.1:1337/api/auth/local`,{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({identifier:e.target[0].value,password:e.target[1].value})
            })
            .then(async res => {
                if (res.status == 200) {
                    let d = await res.json()
                    console.log("user auth",d)
                    props.cookies.set("user",{username:d.user.username, jwt:d.jwt, role:"pokemon "+d.user.pokemon.toLowerCase()})
                    // props.cookies.set("cookies",d)
                    e.target[0].value=null
                    e.target[1].value=null
                    window.alert(props.cookies.get('user').role)
                }
            })
            .catch(e => {
                if (e instanceof Error) console.log("fetch error",e.message)
            })
    }
    
    return(
        <>
            <RB.Form onSubmit={handleSubmit} onReset={null}>
                <RB.Row>
                    <RB.Form.Group className="mb-3">
                        <RB.Form.Label>username</RB.Form.Label>
                        <RB.Form.Control placeholder='Enter username' aria-label='username' required/>
                    </RB.Form.Group>
                    <RB.Form.Group className="mb-3">
                        <RB.Form.Label>password</RB.Form.Label>
                        <RB.Form.Control placeholder='Enter password' aria-label='password' required/>
                    </RB.Form.Group>
                </RB.Row>
                <RB.ButtonToolbar aria-label="Toolbar btngroup">
                    <RB.ButtonGroup className="me-2">
                        <RB.Button variant="primary" type="submit" aria-label="submit">Submit</RB.Button>
                    </RB.ButtonGroup >
                    <RB.ButtonGroup className="me-2">
                        <RB.Button variant="primary" type="reset" aria-label="reset">Reset</RB.Button>
                    </RB.ButtonGroup >
                </RB.ButtonToolbar>
            </RB.Form>
                    
        </>
    )
}
