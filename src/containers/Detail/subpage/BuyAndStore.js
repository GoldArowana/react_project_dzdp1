import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BuyAndStoreComponent from '../../../components/BuyAndStoreComponent/index'
import * as storeActionsFromFile from '../../../actions/store'

class BuyAndStore extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        }

    }

    render () {
        return (
            <div>
                <BuyAndStoreComponent isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)} {...this.props}/>
            </div>
        )
    }

    componentDidMount () {
        this.checkStoreState();
    }

    checkStoreState () {
        const id = this.props.id;
        const store = this.props.store;
        store.some(item => {
            if (item.id === id) {
                this.setState({
                    isStore: true
                });
                return true
            }
            return false
        })
    }

    loginCheck () {
        const id = this.props.id;
        const userinfo = this.props.userinfo;
        if (!userinfo.username) {
            // this.props.history.push('/login' + encodeURIComponent('/detail/' + id));
            this.props.history.push('/login/' + encodeURIComponent('/detail/' + id));
            return false
        }
        return true
    }

    buyHandle () {
        const loginFlag = this.loginCheck();
        if (!loginFlag){
            return null;
        }

        //模拟用户购买

        //购买后跳转
        this.props.history.push('/user')
    }

    storeHandle () {
        const loginFlag = this.loginCheck();
        if (!loginFlag){
            return null;
        }

        const id = this.props.id;
        const storeActions = this.props.storeActions;
        if (this.state.isStore){
            storeActions.rm({id: id})
        }else{
            storeActions.add({id: id})
        }

        this.setState({
            isStore: !this.state.isStore
        })
    }
}

function mapStateToProps (state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps (dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyAndStore)