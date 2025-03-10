const ApiError = require("../error/apiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Task_progress, Test_progress, Statistics} = require('../modules/modules')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest("Некорректный email или password"));
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return next(ApiError.badRequest("Пользователь с таким email уже зарегистрирован"));
            }

            const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

            const user = await User.create({ email, role, password: hashPassword });

            // Создание прогресса асинхронно, чтобы не блокировать пользователя
            await Promise.all([
                Task_progress.create({ userId: user.id }),
                Test_progress.create({ userId: user.id }),
                Statistics.create({ userId: user.id })
            ]);

            if (!process.env.SECRET_KEY) {
                return next(ApiError.internal("SECRET_KEY не задан в .env"));
            }

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({ token });
        }catch (error) {
                console.error("Ошибка в регистрации:", error); 
                next(error);
            }
            
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user) {
            return next(ApiError.internal("Пользователь не найден"))
        } 
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal("Неверный пароль"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role) 
        return res.json({token})
    }
}

module.exports = new UserController()