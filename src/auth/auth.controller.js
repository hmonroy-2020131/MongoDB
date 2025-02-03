import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';
 
export const login = async (req, res) => {
 
    const { correo, password } = req.body;
 
    try {
        const usuario = await Usuario.findOne({ correo })
 
        if(!usuario){
            res.status(400).json({
                msg: "Credenciales incorrectas, Correo no existe en la base de datos"
            });
        }
 
        if(!usuario.estado){
            res.status(400).json({
                msg: "Usuario no existe en la base de datos"
            });
        }
 
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            res.status(400).json({
                msg: "Contraseña incorrecta"
            });
        }
 
        const token = await generarJWT(usuario.id);
 
        res.status(200).json({
            msg: "Login Ok",
            usuario,
            token
        })
 
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    }
}
 
export const register = async (req,res) =>{
 
    const { nombre, correo, password, role, phone } = req.body;
    const user = new Usuario({nombre , correo, password, role, phone});
 
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
 
    await user.save();
 
    res.status(200).json({
        user,
    });
}