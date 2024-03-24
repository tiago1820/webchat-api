const { default: mongoose } = require("mongoose");
const bycrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    profile_image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png"
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    mobile: {
        type: Number, require: false
    }
},
    { timestamps: true }
)

userSchema.pre("save", function (next) {
    if (!this.isDirectModified("password")) return next();
    this.password = bycrypt.hashSync(this.password, 8);
    this.username = this.username.toLowerCase();
    return next();
});

userSchema.methods.comparePassword = function (password) {
    return bycrypt.compareSync(password, this.password);
}

const User = mongoose.model("user", userSchema);
module.exports = User;
















