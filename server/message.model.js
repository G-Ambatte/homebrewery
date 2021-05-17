const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const _ = require('lodash');
const zlib = require('zlib');

const MessageSchema = mongoose.Schema({
	messageId : { type: String, default: ()=>{return nanoid(12);}, index: { unique: true } },
	text      : { type: String, default: '' },
	author    : { type: String, default: '' },
	target    : { type: String, default: '' },

	createdAt : { type: Date, default: Date.now }
}, { versionKey: false });


MessageSchema.statics.get = function(query){
	return new Promise((resolve, reject)=>{
		Message.find(query, (err, messages)=>{
			if(err || !messages.length) return reject('Can not find message');
			return resolve(messages[0]);
		});
	});
};

MessageSchema.statics.getMessageById = function(messageId){
	return new Promise((resolve, reject)=>{
		const query = { messageId: messageId };
		Message.find(query, (err, messages)=>{
			if(err) return reject('Can not find message');
			return resolve(messages[0]);
		});
	});
};

MessageSchema.statics.getUserInbox = function(username){
	return new Promise((resolve, reject)=>{
		const query = { target: username };
		Message.find(query, (err, messages)=>{
			if(err) return reject('Can not find message');
			return resolve(_.map(messages, (message)=>{
				return message;
			}));
		});
	});
};

MessageSchema.statics.getUserSent = function(username){
	return new Promise((resolve, reject)=>{
		const query = { author: username };
		Message.find(query, (err, messages)=>{
			if(err) return reject('Can not find message');
			return resolve(_.map(messages, (message)=>{
				return message;
			}));
		});
	});
};

MessageSchema.statics.sendMessage = function(target, username, text){
	return new Promise((resolve, reject)=>{
		const message = new Message({ author: username, text: text, target: target });
		message.save(function (err){
			if(err) return reject('Unable to save message');
			return resolve(message);
		});
	});
};

const Message = mongoose.model('Message', MessageSchema);

module.exports = {
	schema : MessageSchema,
	model  : Message,
};
