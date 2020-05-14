import React, {Component} from 'react';
import {AppLoading} from "expo";
import {loadFonts} from "./styles/fonts";
import {Drawer} from "./navigation/Drawer";
import {Provider} from "react-redux";
// import store from "./Store/store";

import {createStore, combineReducers} from "redux";
import {listReducer, userReducer} from "./Store/lists";
import {AsyncStorage} from "react-native";


const allReducers = combineReducers({
    lists: listReducer,
    userSettings: userReducer,
});

let store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


class App extends Component {
    state = {
        loaded: false,
        store: store
    };

    componentWillMount () {
        const retrieveData = async () => {
            try {
                const retrievedValue = await AsyncStorage.getItem('completeStore');
                retrievedValue.then((value) => {
                    if (value && value.length) {
                        let initialStore = JSON.parse(value);
                        this.setState({store: createStore(
                                allReducers, initialStore,
                                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                            ) })
                    } else {
                        this.setState({store: store})
                    }
            })} catch(error)  {
                        console.log(error);
                        this.setState({store:store})

        }
        } ;
        return retrieveData
    }

    componentWillUnmount() {
        let storingValue = JSON.stringify(this.state.store.getState());

        const storeData = async () => {
            try {
                await AsyncStorage.setItem('completeStore', storingValue)
            } catch (error) {
                console.log(error)
            }
        };
        return storeData
    }



    render() {

        if (!this.state.loaded) {
            return (
                <AppLoading
                    startAsync={loadFonts}
                    onError={() => console.log("error")}
                    onFinish={() => this.setState({loaded: true})}
                />
            )
        } else {
            return (<Provider store={this.state.store}>
                <Drawer/>
            </Provider>)
        }
    }
}

export default App;

