import Link from 'next/link';
import { useState } from 'react';

export const NavBar1 = () => {
    const [isHover1, setIsHover1] = useState(false);   
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);
    const [isHover4, setIsHover4] = useState(false);
    
    const StyleNavBar = { margin: 10, border: "2px, dotted, #DDD" }
    const StyleLink1 = { marginRight: 10 , color: isHover1? '#adff2f':'white' }
    const StyleLink2 = { marginRight: 10, color: isHover2? '#adff2f':'white' }
    const StyleLink3 = { marginRight: 10, color: isHover3? '#adff2f':'white' }
    const StyleLink4 = { marginRight: 10, color: isHover4? '#adff2f':'white' }

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
            <Link href="/list/login" style={StyleLink4}
                  onMouseEnter={() => { setIsHover4(true); }} 
                  onMouseLeave={() => { setIsHover4(false); }}
                  
            >
            Login!
            </Link>
        </div>
        
    );
}

export const NavBar2 = () => {
    const [isHover1, setIsHover1] = useState(false);   
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);
    const [isHover4, setIsHover4] = useState(false);
    
    const StyleNavBar = { margin: 10, border: "2px, dotted, #DDD" }

    const handleMouseEnter1 = () => { setIsHover1(true); };
    const handleMouseLeave1 = () => { setIsHover1(false); };
    const handleMouseEnter2 = () => { setIsHover2(true); };
    const handleMouseLeave2 = () => { setIsHover2(false); };
    const handleMouseEnter3 = () => { setIsHover3(true); };
    const handleMouseLeave3 = () => { setIsHover3(false); };
    const handleMouseEnter4 = () => { setIsHover4(true); };
    const handleMouseLeave4 = () => { setIsHover4(false); };

    const StyleLink1 = { marginRight: 10 , color: isHover1? '#adff2f':'white' }
    const StyleLink2 = { marginRight: 10, color: isHover2? '#adff2f':'white' }
    const StyleLink3 = { marginRight: 10, color: isHover3? '#adff2f':'white' }
    const StyleLink4 = { marginRight: 10, color: isHover4? '#adff2f':'white' }

    return (
        <div style={StyleNavBar}>
            <Link href="/" style={StyleLink1}
                  onMouseEnter={handleMouseEnter1} 
                  onMouseLeave={handleMouseLeave1} className='linkhover'>
            Home
            </Link>
            <Link href="/list/pokemon" style={StyleLink2} 
                  onMouseEnter={handleMouseEnter2} 
                  onMouseLeave={handleMouseLeave2} className='linkhover'>
            Pokemon List
            </Link>
            {/* <Link href="/" style={StyleLink3}
                  onMouseEnter={handleMouseEnter3} 
                  onMouseLeave={handleMouseLeave3} className='linkhover'>
            Edit Mode
            </Link>
            <Link href="/" style={StyleLink4}
                  onMouseEnter={handleMouseEnter4} 
                  onMouseLeave={handleMouseLeave4} className='linkhover'>
            Delete Mode
            </Link> */}
        </div>
        
    );
}