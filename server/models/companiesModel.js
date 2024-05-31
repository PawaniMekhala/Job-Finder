import mongoose, {Schema} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Company Name is required"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: true,
    },
    contact:{
        type: String,
    },
    location:{
        type: String,
    },
    about:{
        type: String,
    },
    profileUrl:{
        type: String,
    },
    jobPosts:
         [{type:Schema.Type.ObjectId, ref: "Jobs"}]
    
    
});

companySchema.pre("save", async function(){

    if(!this.isModified) return;

    const salt = await bcrypt.getSalt(10)

    this.password = await bcrypt.hash(this.password, salt);
});

//Compare Passwords
userSchema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password);

    return isMatch;
};

//JWT TOKEN
userSchema.methods.createToken = async function (){
    return JWT.sign(
        {userId: this._id},
        process.env.JWT_SECRET_KEY, {
            expiresIn: "Id",
        }
    );
};

const Companies = mongoose.model("Companies", companySchema);

export default Companies;