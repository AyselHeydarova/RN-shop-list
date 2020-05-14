import React, {Component} from 'react';
import {Text} from "react-native";
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
        store: store,
        isStoreLoading: true,
    };


    retrieveData = async () => {
        try {
            const retrievedValue = await AsyncStorage.getItem('completeStore');
            retrievedValue.then((value) => {
                if (value && value.length) {
                    let initialStore = JSON.parse(value);
                    this.setState({store: createStore(
                            allReducers, initialStore,
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                        ) })
                    this.setState({isStoreLoading: false})
                } else {
                    this.setState({store: store})
                    this.setState({isStoreLoading: false})
                }
            })} catch(error)  {
            console.log(error);
            this.setState({store:store})
            this.setState({isStoreLoading: false})

        }};

    storeData = async () => {
        let storingValue = JSON.stringify(this.state.store.getState());
        try {
            await AsyncStorage.setItem('completeStore', storingValue)
        } catch (error) {
            console.log(error)
        }
    };

    componentWillMount() {
        this.retrieveData();
    }

    componentWillUnmount() {
       this.storeData();
    };


    render() {



        if (!this.state.loaded ) {
            return (
                <AppLoading
                    startAsync={loadFonts}
                    onError={() => console.log("error")}
                    onFinish={() => this.setState({loaded: true})}
                />
            )
        } else if (this.state.isStoreLoading) {
            return (<Text>Loading Store ...</Text>)
        }
        else {
            return (<Provider store={this.state.store}>
                <Drawer/>
            </Provider>)
        }
    }
}

export default App;

