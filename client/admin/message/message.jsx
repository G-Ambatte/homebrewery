require('./brewLookup.less');
const React = require('react');
const createClass = require('create-react-class');
const cx    = require('classnames');

const request = require('superagent');
const Moment = require('moment');


const Message = createClass({
	getDefaultProps() {
		return {};
	},
	getInitialState() {
		return {
			query     : '',
			foundMessage : null,
			searching : false,
			error     : null
		};
	},
	handleChange(e){
		this.setState({ query: e.target.value });
	},
	lookup(){
		this.setState({ searching: true, error: null });

		request.get(`/admin/lookup/${this.state.query}`)
			.then((res)=>this.setState({ foundBrew: res.body }))
			.catch((err)=>this.setState({ error: err }))
			.finally(()=>this.setState({ searching: false }));
	},

	renderFoundBrew(){
		const message = this.state.foundMessage;
		return <div className='foundMessage'>
			<dl>
				<dt>Created at:</dt>
				<dd>{message.createdAt}</dd>
			
				<dt>To:</dt>
				<dd>{message.target}</dd>

				<dt>From:</dt>
				<dd>{message.author}</dd>

				<dt>Body</dt>
				<dd>{message.text}</dd>
			</dl>
		</div>;
	},

	render(){
		return <div className='brewLookup'>
			<h2>Brew Lookup</h2>
			<input type='text' value={this.state.query} onChange={this.handleChange} placeholder='edit or share id' />
			<button onClick={this.lookup}>
				<i className={cx('fas', {
					'fa-search'          : !this.state.searching,
					'fa-spin fa-spinner' : this.state.searching,
				})} />
			</button>

			{this.state.error
				&& <div className='error'>{this.state.error.toString()}</div>
			}

			{this.state.foundBrew
				? this.renderFoundBrew()
				: <div className='noBrew'>No brew found.</div>
			}
		</div>;
	}
});

module.exports = Message;
