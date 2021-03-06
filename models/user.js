const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fname: {type: String, required: true},
        lname: {type: String, required: true},
        email: {type: String},
        password: {type: String},
        role: {type: String,
            default: 'employee',
            enum: ['lead', 'admin', 'manager','employee', 'department head']},
        leads: {type: Array, default: []},
        manager: {type: Array, default: []},
        employees: {type: Array, default: []},
        lastModified: {type: Date, default: new Date().getTime()},
        lastVisit: {type: Date},
        avatar: {type: String, default: `http://localhost:3020/images/avatar.jpg`},
        isEmailAuth: {type: String, default: 'false'}
    },
    {versionKey: false}
);

const commentSchema = new Schema({
    manager: {type: String},
    lead: {type: String},
    employee: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: String, required: true}
}, {versionKey: false});


const settingsSchema = new Schema({
    header: {type: String, required: true},
    footer: {type: String, required: true},
    date: {type: Date}
}, {versionKey: false});

const reviewSchema = new Schema({
    author : {type: Schema.Types.ObjectId, ref: global.userModel,  required:true},
    date: {type: Number, required: true},
    employee: {type: Schema.Types.ObjectId, required: true, ref: global.userModel}
})

const ReviewDoc = mongoose.model('Reviews', reviewSchema);
const SettingsDoc = mongoose.model('Settings', settingsSchema);
const UserDoc = mongoose.model(global.userModel, userSchema);
const CommentDoc = mongoose.model('Comment', commentSchema);

module.exports = {
    ReviewDoc,
    SettingsDoc,
    UserDoc,
    CommentDoc
}
