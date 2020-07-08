import { bindActionCreators } from 'redux';
import { subscribe, unsubscribe}  from './actionCreaters';


function mapDispatchToProps(component) { 
    switch(component) {
        case "SubscribeContainer": return function(dispatch) {
            return {
                unsubscribe: bindActionCreators(unsubscribe, dispatch),
                subscribe : bindActionCreators(subscribe, dispatch)
            };
        };
       
        default: return undefined;
    }
}

export default mapDispatchToProps;