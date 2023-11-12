import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShrimp,faUserPlus,faLayerGroup,faFilePen,faTruck,faTruckRampBox ,faPlaneSlash,faTv} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import home from '../../Assets/icons/home.png';
import cartList from '../../Assets/icons/placed.png';
import complete from '../../Assets/icons/complete.png';
import transit from '../../Assets/icons/transit.png';
import bus from '../../Assets/icons/bus.png';
import cancelled from '../../Assets/icons/cancelled.png';
import AddGoods from "../ProfileComponents/AddGoods/AddGoods";
import AddUsers from "../ProfileComponents/AddUsers/AddUsers";
import UpdateDetails from "../ProfileComponents/UpdateDetails/UpdateDetails";
import DashBoard from '../ProfileComponents/DashBoard/DashBoard';
import Transit from '../ProfileComponents/Transit/Transit';
import Arrived from '../ProfileComponents/Arrived/Arrived';
import Cancelled from '../ProfileComponents/Cancelled/Cancelled';
import './Profile.css'



function Profile({ spares ,setSpares}){
    const [selectedSection,setSelectedSection] = useState('')

    const[arrived,setArrived]= useState([])
    const[inTransit,setInTransit]= useState([])
    const[cancelled,setCancelled]= useState([])

    
    function SidebarList({icon, text,link}){
        return(
            <li className="row" id={selectedSection === link? 'active': ''}  onClick={()=>setSelectedSection(link)}>
                <div className="col-3 text-center">{icon}</div>
                <div className="col-9 text-left p-0">{text}</div>
            </li>
        )
    }


    let contentToDisplay;
    switch (selectedSection) {
        case 'addUsers':
            contentToDisplay = <AddUsers />;
            break;
        case 'addGoods':
            contentToDisplay = <AddGoods spares={spares} setSpares={setSpares}/>;
            break;
        case 'updateDetails':
            contentToDisplay = <UpdateDetails  spares={spares} setSpares={setSpares}/>
            break;
        case 'transit':
            contentToDisplay = <Transit inTransit={inTransit}/>;
            break;
        case 'arrived':
            contentToDisplay = <Arrived arrived={arrived}/>;
            break;
        case 'cancelled':
            contentToDisplay = <Cancelled  cancelled={cancelled}/>;
            break;
        default:
            contentToDisplay = <DashBoard arrived={arrived} inTransit={inTransit} cancelled={cancelled} spares={spares}/>;
        }
    
        const collapseSidebar = ()=>{
                document.querySelector('#sidebar').classList.toggle('none')
        }
        useEffect(() => {
            setArrived(spares.filter((spare) => spare.status === 'arrived'));
            setInTransit(spares.filter((spare) => spare.status === 'inTransit'));
            setCancelled(spares.filter((spare) => spare.status === 'cancelled'));
        }, [spares]);
        
        useEffect(() => {
            console.log('arrived', arrived);
        }, [arrived]);
        
        useEffect(() => {
            console.log('inTransit', inTransit);
        }, [inTransit]);
        
        useEffect(() => {
            console.log('cancelled', cancelled);
        }, [cancelled]);
        
    return(
        <>
    <div className="profile-container profile-wrapper container p-0">
        <aside id="sidebar" className='sidebar'>
            <div className="h-100">
                <div className="sidebar-logo">
                    <a href="#">Spares and Parts</a>
                </div>
                <ul className="sidebar-nav">

                <li className="sidebar-header">
                        <div className="sidebar-link">
                            <SidebarList icon={<FontAwesomeIcon icon={faTv} style={{color: "#ffffff",}} />} text={'Dashboard'} link={''}/>
                        </div>
                    </li>
                    <li className="sidebar-items">
                        <div className="sidebar-link">
                            <SidebarList icon={<FontAwesomeIcon icon={faUserPlus} style={{color: "#ffffff",}} />} text={'Add Users'} link={'addUsers'}/>
                        </div>
                    </li>
                    <li className="sidebar-items">
                        <div className="sidebar-link">
                        <SidebarList icon={<FontAwesomeIcon icon={faLayerGroup} style={{color: "#ffffff",}} />} text={'Add Goods'} link={'addGoods'}/>
                        </div>
                    </li>
                    <li className="sidebar-items">
                        <div className="sidebar-link">
                        <SidebarList icon={<FontAwesomeIcon icon={faFilePen} style={{color: "#ffffff",}} />} text={'Update item details'} link={'updateDetails'}/>
                        </div>
                    </li>
                    <li className="sidebar-items">
                        <div className="sidebar-link">
                        <SidebarList icon={<FontAwesomeIcon icon={faTruck} style={{color: "#ffffff",}} />} text={'Goods in Transit'} link={'transit'}/>
                        </div>
                    </li>
                    <li className="sidebar-items">
                        <div className="sidebar-link">
                        <SidebarList icon={<FontAwesomeIcon icon={faTruckRampBox} style={{color: "#ffffff",}} />} text={'Goods Arrived'} link={'arrived'}/>
                        </div>
                    </li>
                    <li className="sidebar-items">
                        <div className="sidebar-link">
                        <SidebarList icon={<FontAwesomeIcon icon={faPlaneSlash} style={{color: "#ffffff",}} />} text={'Cancelled Goods'} link={'cancelled'}/>
                        </div>
                    </li>
                    <li className="sidebar-items">
                    <p  className=" sidebar-linkcollapsed sidebar-link" data-bs-target='#multi' data-bs-toggle='collapse' aria-expanded='false'>
                        <FontAwesomeIcon icon={faShrimp} style={{color: "#ffffff",}} />
                            <span>Posts</span>
                        </p>
                        <ul id='multi' className="sidebar-dropdown list-unstyled collapse">
                        <li className="sidebar-item">
                                <p  className=" sidebar-linkcollapsed sidebar-link" data-bs-target='#level-1' data-bs-toggle='collapse' aria-expanded='false'>
                                <FontAwesomeIcon icon={faShrimp} style={{color: "#ffffff",}} />
                                    <span>Posts</span>
                                </p>
                                <ul id='level-1' className="sidebar-dropdown list-unstyled collapse">
                                    <li className="sidebar-item">
                                            <a href="#" className="sidebar-link">level-1-1</a>
                                    </li>
                                    <li className="sidebar-item">
                                            <a href="#" className="sidebar-link">level-1-2</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Post-2</a>
                            </li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
        </aside>
        <div className="main">
            <nav className="navbar navbar-expand px-3 border-bottom">
                <button onClick={()=>collapseSidebar()} className="btn" id='sidebar-toggle' type='button'>
                <span class="navbar-toggler-icon "></span>
                </button>
                
            </nav>
            <div className="border border-success">
                {contentToDisplay}
            </div>
        </div>  
     </div>
    </>
    )
}

export default Profile

