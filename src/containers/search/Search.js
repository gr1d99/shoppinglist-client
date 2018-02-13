import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

import { loginRequired } from "../auth/helpers";
import { searchShoppingLists } from "../../dispatchers";
import { backButton } from "../../components/common/BackButton";


class SearchShoppingLists extends React.Component {
    constructor (props) {
        super(props);

        this.state = {term: ''}
    }

    handleSearchTermChange = (e) => {
        const key = e.target.name;
        let value = e.target.value;
        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.searchShoppingLists(this.props.history, this.state.term)
    };

    handleClick = url => e => {
        e.preventDefault();
        this.props.searchShoppingLists(this.props.history, '', url)
    };

    pageMetaData = (location) => {
        if (this.props.search.results) {
            const {
                items_in_page,
                current_page,
                next_page,
                total_pages,
                next_page_url,
                previous_page_url
            } = this.props.search.results;


            switch (location) {
                case 'up':
                    return (
                        <div className="">
                            <h4 className="results-count">{!isNaN(items_in_page) ? `${items_in_page} Items found` : ''}</h4>
                        </div>
                    );

                case 'down':
                    if (next_page > 1 || current_page > 1) {
                        return (
                            <div>
                                <nav aria-label="">
                                    <ul className="pager">
                                        <li className="next pull-left"><Link to='/' onClick={this.handleClick(previous_page_url)} className="pull-left"><span aria-hidden="true">&larr;</span> Previous </Link></li>
                                        <span className="text-center page-info">Page {current_page} of {total_pages}</span>
                                        <li className="previous pull-right"><Link to='/' onClick={this.handleClick(next_page_url)}> <span aria-hidden="true">&rarr;</span> Next</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        )
                    } else {
                        return ''
                    }

                default:
                    return ''
            }
        }
    };
    renderSearchResults = () => {
        if (this.props.search.results) {
            if (this.props.search.results.items_in_page !== 0) {
                return this.props.search.results.shoppinglists.map(
                    shl => {
                        return (
                            <div key={shl.id} className="col-sm-3">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h6 className="text-center">
                                            <Link to={`/shoppinglists/${shl.id}`}>{shl.name.toUpperCase()}</Link>
                                        </h6>
                                    </div>
                                    <div className="panel-body shoppinglist-box">
                                        <p className="text-justified"><Truncate lines={2} ellipsis={
                                            <span>...</span>}>{shl.description}</Truncate></p>
                                    </div>
                                    <div className="panel-footer"></div>
                                </div>
                            </div>
                        )
                    }
                )
            }
        }
    };

    render () {
        return (
            <div className="row shopping-lists">
                <div className="col-lg-12 search">
                    <hr/>
                    <form className="navbar-form navbar-left pull-right" onSubmit={this.handleSearch}>
                        <div className="form-group">
                            <input type="text" name="term" onChange={this.handleSearchTermChange} className="form-control" placeholder="Search"/>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-default">
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-lg-12">
                    {this.pageMetaData('up')}
                </div>
                <div className="col-lg-12">
                    {this.renderSearchResults()}
                </div>
                <div className="col-lg-12">
                    {this.pageMetaData('down')}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({auth, search}) => {
    return {auth, search}
};

const mapDispatchToProps = dispatch => {
    return {
        searchShoppingLists: bindActionCreators(searchShoppingLists, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(SearchShoppingLists)));