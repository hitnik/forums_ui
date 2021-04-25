import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Segment, Header, Grid} from 'semantic-ui-react';
import MenuForumsComponent from '../dummy/forums/menuForumcomponent';
import ErrorComponent from '../dummy/errorComponent';
import {fetchSiteData, fetchForums, fetchTopics,
        setForumsMenuActiveIndex, setSitesMenuActiveIndex,
        setDate, setInitial,
        } from '../../store/slices/forumsSlice';
import TopicsContainer from '../dummy/forums/topicContainer';
import {dateDecrement, dateIncrement, isYearPassed,
        isTommorow
        } from '../../utils';

const ForumsComponent = (props) => {

       

    const [isMount, setIsMount] = useState(true);

    useEffect( () =>{
        props.setForumInitial();
    },[isMount]);


    useEffect(() => {
        props.fetchSiteData();
      }, [props.date]);

    useEffect(() =>{
        props.siteMenuActiveIndex != null && props.fetchForums();
    }, [props.siteMenuActiveIndex]);

    useEffect(() =>{
        props.forumsMenuActiveIndex != null && props.fetchTopics();
    }, [props.forumsMenuActiveIndex]);



    const handleForumMenuItemClick = (e) =>{
        const regex = /forum_/;
        const index = parseInt(e.target.id.replace(regex, ''));
        props.setForumsMenuActiveIndex(index)
    }

    const handleSiteMenuItemClick = (e) =>{
        const regex = /site_/;
        const index = parseInt(e.target.id.replace(regex, ''));
        props.setSitesMenuActiveIndex(index)
    }

    const handleClickDateLeft = () =>{
        const date = dateDecrement(props.date);
        if (isYearPassed(date)){return}
        props.setDate(dateDecrement(props.date));
    }

    const handleClickDateRight = () =>{
        const date = dateIncrement(props.date)
        if (isTommorow(date)){return}
        props.setDate(dateIncrement(props.date));
    }

    return (
        <Container>
            {props.error === null ?
                <Segment.Group>
                    <MenuForumsComponent siteData={props.siteData.data}
                                        activeIndex = {props.siteMenuActiveIndex}
                                        date = {props.date}
                                        onMenuClick = {handleSiteMenuItemClick}
                                        handleClickLeft = {handleClickDateLeft}
                                        handleClickRight = {handleClickDateRight}
                                        handleDateChange = {props.setDate}
                    />
                    {props.siteMenuActiveIndex != null
                        ? 
                        <TopicsContainer forums={props.forums}
                                     activeIndex={props.forumsMenuActiveIndex}
                                     topics = {props.topics}  
                                     onMenuClick = {handleForumMenuItemClick}
                        />
                        :
                        <Segment>
                             <Grid >
                                <Grid.Column textAlign="center">
                                    <Header as='h4'>Здесь пусто</Header>
                                </Grid.Column>
                             </Grid>
                        </Segment>
                    }    
                </Segment.Group>
            : <ErrorComponent/>
        } 
        </Container>
    )
}



const mapStateToProps = (state) => {
    return {
        siteData: state.forumsSlice.siteData,
        error: state.forumsSlice.error,
        date: state.forumsSlice.date,
        siteMenuActiveIndex: state.forumsSlice.siteMenuActiveIndex,
        forumsMenuActiveIndex: state.forumsSlice.forumsMenuActiveIndex,
        forums: state.forumsSlice.forums,
        topics: state.forumsSlice.topics,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSiteData, fetchForums, fetchTopics,
        setForumsMenuActiveIndex, setSitesMenuActiveIndex,
        setDate,  setForumInitial: setInitial,
      
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForumsComponent));
