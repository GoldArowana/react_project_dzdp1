import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home'
import ListCompoent from '../../../components/ProductListCompoent'
import LoadMore from '../../../components/LoadMore'
import './style.css'

class LikeList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length
                        ? <ListCompoent data={this.state.data}/>
                        : <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore
                        ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                        : ''
                }
            </div>
        )
    }
    componentDidMount() {
        // 获取首页数据
        this.loadFirstPageData()
    }
    // 获取首页数据
    loadFirstPageData() {
        const cityName = this.props.cityName;
        const result = getListData(cityName, 0);
        this.resultHandle(result);
        const page = this.state.page;
        // 增加 page 计数
        this.setState({
            page: page + 1,
            isLoadingMore: false
        })
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore: true
        });

        const cityName = this.props.cityName;
        const page = this.state.page;
        const result = getListData(cityName, page);
        this.resultHandle(result);

        // 增加 page 计数
        this.setState({
            page: page + 1,
            isLoadingMore: false
        })
    }
    // 处理数据
    resultHandle(result) {
        result.then(res => {
            return res.json()
        }).then(json => {
            const hasMore = json.hasMore;
            const data = json.data;

            this.setState({
                hasMore: hasMore,
                // 这里将最新获取的数据，使用concat函数 拼接到原数据之后，
                data: this.state.data.concat(data)
            })
        }).catch(ex => {

        })
    }
}

export default LikeList
