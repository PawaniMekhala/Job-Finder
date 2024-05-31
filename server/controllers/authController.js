import Users from "../models/userModel.js";





export const register = async(req, res, next) =>{

    const {firstName, lastName, email, password} = req.body;

    //Validate Fields
    if(!firstName){
        next("First Name is required");
    }
    if(!email){
        next("Email is required");
    }
    if(!lastName){
        next("Last Name is required");
    }
    if(!password){
        next("Password is required");
    }

    try {
        const userExist = await Users.findOne({ email });

        if(userExist){
            next("Email address already exists");
            return;
        }

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password,
        });

        // user token

        const token = user.createJWT();
        res.status(201).send({
            success: true,
            message: "Account created successfully",

        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accountType: user.accountType,
        },
        token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message: eroor.message});
        
    }
};



export const signIn = async(req, res, next) =>{

    const {email, password} = req.body;

    //validation
    try {

        if(!email || !password){
            next("Please provide email and password");
            return;
        }

        //find user by email
        const user = await user.findOne({ email }. select("+password"));

        if(!user){
            next("Invalid email or password");
            return;
        }

    //compare password
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        next("Invalid email or password");
        return;
    }

    user.password = undefined;

    const token = user.createJWT();

    res.status(201).json({
        success: true,
        message: "Login successfully",
        user,
        token,
    });



        
    } catch (error) {
        console.log(error);
        res.status(404).json({message: eroor.message});
        
    }






};