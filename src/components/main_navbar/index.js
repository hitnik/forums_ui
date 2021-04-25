import React, { PureComponent } from "react";
import {Menu, Image, Grid} from 'semantic-ui-react';
import BtcImg from '../../images/btc.png';
import {Link} from 'react-router-dom';


class Navbar extends PureComponent{

    visible = true

    render(){
        return (
            <div>
                <Grid > 
                    <Grid.Row only='computer'>
                        <Grid.Column only='computer'>
                            <Menu inverted>
                                <Menu.Item>
                                    <Image src={BtcImg} avatar/>
                                    <span> <Link className='nav-item' to={`/`}>Отзывы о Белтелеком</Link></span>
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row only='mobile tablet'>
                        <Grid.Column only='mobile tablet'>
                            <Menu inverted>
                                <Menu.Menu position="left">
                                        <Menu.Item>
                                            <span> <Link className='nav-item' to={`/`}>Отзывы</Link></span>
                                        </Menu.Item>
                                    </Menu.Menu>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
  
        );
    }
}

export default Navbar;