const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:[true,'First name is required']
    },
    lastName:{
        type:String,
        required:[true,'Last name is required']
    },
    email:{
        type:String,
        match:[ /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;     :\s@\"]{2,})$/i,
            'Email is required'
        ],
        required:[true,'Email is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Email is required'],
        minLength:6
    },
    role:{
        type:String,
        enum:['user','manager'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    } catch (err) {
        return next(err)
    }
})

UserSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword,this.password)
}

UserSchema.methods.getToken = async function(){
    const payload ={
        _id: this._id
    }
    return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

const User = mongoose.model('User',UserSchema)

module.exports = User