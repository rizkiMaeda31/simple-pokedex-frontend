import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import * as RB from 'react-bootstrap'

const cookies=new Cookies()


export const NavBar1 = () => {
    const [role, setRole]=useState('')
    const [isHover1, setIsHover1] = useState(false);   
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);
    const [isHover4, setIsHover4] = useState(false);
    const [isHover5, setIsHover5] = useState(false);
    useEffect(()=>{
            try {
                  setRole(cookies.get('user').role)
            } catch (error) {
                  console.log('navbar1 err',error)
                  setRole('')
            }
    },[])
    const StyleNavBar = { margin: 10, border: "2px, dotted, #DDD" }
    const StyleLink1 = { marginRight: 10 , color: isHover1? '#adff2f':'white' }
    const StyleLink2 = { marginRight: 10, color: isHover2? '#adff2f':'white' }
    const StyleLink3 = { marginRight: 10, color: isHover3? '#adff2f':'white' }
    const StyleLink4 = { marginRight: 10, color: isHover4? '#adff2f':'white' }
    const StyleLink5 = { marginRight: 10, color: isHover5? '#adff2f':'white' }
    const logout=<a href="/list/pokemon" style={StyleLink5} 
                        onMouseEnter={() => { setIsHover5(true) }} 
                        onMouseLeave={() => { setIsHover5(false) }} className='linkhover'
                        onClick={()=>{cookies.remove('user')}}
                  >
                  Logout
                  </a>
    return (
        <div style={StyleNavBar}>
            <Link href="/" style={StyleLink1}
                  onMouseEnter={() => { setIsHover1(true); }} 
                  onMouseLeave={() => { setIsHover1(false); }}>
            Home
            </Link>
            <Link href="/list/pokemon" style={StyleLink2} 
                  onMouseEnter={() => { setIsHover2(true); }} 
                  onMouseLeave={() => { setIsHover2(false); }}>
            Pokemon List
            </Link>
            <Link href="/list/insert" style={StyleLink3}
                  onMouseEnter={() => { setIsHover3(true); }} 
                  onMouseLeave={() => { setIsHover3(false); }}
                  
            >
            New Pokemon
            </Link>
            {role != ''?(<Link href="/list/login" style={StyleLink4}
                  onMouseEnter={() => { setIsHover4(true); }} 
                  onMouseLeave={() => { setIsHover4(false); }}
            >
            Login!
            </Link>):logout}
            
        </div>
        
    );
}

export const NavBar = (props) => {
      
    const [role, setRole]=useState('')
    useEffect(()=>{
            if (cookies.get('user')) {
                  try {
                        setRole(cookies.get('user').role)
                  } catch (error) {
                        console.log('navbar2 err',error)
                        setRole('')
                  }
            }
      },[])
      const newLogout=<RB.Nav.Link eventKey={props.data.length+1} href='/list/pokemon' onClick={()=>cookies.remove('user')}>Logout</RB.Nav.Link>
      const newLogin=<RB.Nav.Link eventKey={props.data.length+1} href='/list/login'>Login</RB.Nav.Link>
      const newNavs=<><RB.Navbar bg='dark' data-bs-theme='dark'>
                        <RB.Container >
                              <RB.Navbar.Brand href='/'>Brand</RB.Navbar.Brand>
                              <RB.Navbar.Collapse id='basic-navbar-nav'>
                                    <RB.Nav className='me-auto'>
                                          {
                                                props.data.map((text)=> <RB.Nav.Link href={text.toLowerCase() == 'home'?'/':text.toLowerCase()}>{text.toLowerCase() == 'insert'?'Create ':text}</RB.Nav.Link>)
                                          }
                                          {/* <RB.Nav.Link eventKey={1} href='/'>Home</RB.Nav.Link>
                                          <RB.Nav.Link eventKey={2} href='/list/pokemon'>Pokemon</RB.Nav.Link>
                                          <RB.Nav.Link eventKey={3} href='/list/insert'>Insert Pokemon</RB.Nav.Link> */}
                                          {role==''?newLogin:newLogout}
                                    </RB.Nav>
                              </RB.Navbar.Collapse>
                        </RB.Container>
                  </RB.Navbar><br /></>
    return (
        <>
            {/* {nextLink} */}
            {newNavs}
        </>
    )
}

export const NavBar3 = () => {
    const [isHover1, setIsHover1] = useState(false);   
    const [isHover2, setIsHover2] = useState(false);
    const StyleNavBar = { margin: 10, border: "2px, dotted, #DDD" }

    const StyleLink1 = { marginRight: 10 , color: isHover1? '#adff2f':'white' }
    const StyleLink2 = { marginRight: 10, color: isHover2? '#adff2f':'white' }
    return (
        <div style={StyleNavBar}>
            <Link href="/" style={StyleLink1}
                  onMouseEnter={() => { setIsHover1(true) }} 
                  onMouseLeave={() => { setIsHover1(false) }} className='linkhover'>
            Home
            </Link>
            <Link href="/list/pokemon" style={StyleLink2} 
                  onMouseEnter={() => { setIsHover2(true) }} 
                  onMouseLeave={() => { setIsHover2(false) }} className='linkhover'>
            Pokemon List
            </Link>
        </div>
        
    );
}