require('./inboxPage.less');
const React = require('react');
const createClass = require('create-react-class');
const _     = require('lodash');
const cx    = require('classnames');

const Nav = require('naturalcrit/nav/nav.jsx');
const Navbar = require('../../navbar/navbar.jsx');

const RecentNavItem = require('../../navbar/recent.navitem.jsx').both;
const Account = require('../../navbar/account.navitem.jsx');
const NewBrew = require('../../navbar/newbrew.navitem.jsx');
const BrewItem = require('./messageItem/messageItem.jsx');

// const brew = {
// 	title   : 'SUPER Long title woah now',
// 	authors : []
// };

//const BREWS = _.times(25, ()=>{ return brew;});


const InboxPage = createClass({
	getDefaultProps : function() {
		return {
			username : '',
			brews    : []
		};
	},
	getUsernameWithS : function() {
		if(this.props.username.endsWith('s'))
			return `${this.props.username}'`;
		return `${this.props.username}'s`;
	},

	renderMessages : function(messages){
		if(!messages || !messages.length) return <div className='noMessages'>No Messages.</div>;

		const sortedMessages = _.sortBy(messages, (brew)=>{ return message.createdAt; });

		return _.map(sortedMessages, (message, idx)=>{
			return <MessageItem message={message} key={idx}/>;
		});
	},

	render : function(){
		const brews = this.props.messages;

		return <div className='inboxPage page'>
			<Navbar>
				<Nav.section>
					<NewBrew />
					<RecentNavItem />
					<Account />
				</Nav.section>
			</Navbar>

			<div className='content V3'>
				<div className='phb'>
					<div>
						<h1>{this.getUsernameWithS()} brews</h1>
						{this.renderBrews(brews.published)}
					</div>
					<div>
						<h1>{this.getUsernameWithS()} unpublished brews</h1>
						{this.renderBrews(brews.private)}
					</div>
				</div>
			</div>
		</div>;
	}
});

module.exports = InboxPage;
