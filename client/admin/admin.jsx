require('./admin.less');
const React = require('react');
const createClass = require('create-react-class');


const BrewCleanup = require('./brewCleanup/brewCleanup.jsx');
const BrewLookup = require('./brewLookup/brewLookup.jsx');
const BrewCompress = require ('./brewCompress/brewCompress.jsx');
const Stats = require('./stats/stats.jsx');

const Message = require('./message/message.jsx');

const Admin = createClass({
	getDefaultProps : function() {
		return {};
	},

	render : function(){
		return <div className='admin'>

			<header>
				<div className='container'>
					<i className='fas fa-rocket' />
					homebrewery admin
				</div>
			</header>
			<div className='container'>
				<Stats />
				<hr />
				<BrewLookup />
				<hr />
				<BrewCleanup />
				<hr />
				<BrewCompress />
				<hr />
				<Message />
			</div>
		</div>;
	}
});

module.exports = Admin;
