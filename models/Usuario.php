<?php

namespace Model;

class Usuario extends ActiveRecord
{

    // Base de Datos
    protected static $tabla = "usuarios";
    protected static $columnasDB = [
        'id', 'nombre', 'apellido', 'email', 'telefono',
        'password', 'admin', 'confirmado', 'token'
    ];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $telefono;
    public $password;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
    }

    //Mensajes de Validacion para la creacion de la cuenta
    public function validarNuevaCuenta()
    {
        if (!$this->nombre) {
            self::$alertas['error'][] =  'El Nombre es Obligatorio';
        }
        if (!$this->apellido) {
            self::$alertas['error'][] =  'El Apellido es Obligatorio';
        }
        if (!$this->email) {
            self::$alertas['error'][] =  'El Email es Obligatorio';
        }
        if (!$this->telefono) {
            self::$alertas['error'][] =  'El Telefono es Obligatorio';
        }
        if (!$this->password) {
            self::$alertas['error'][] =  'El Password es Obligatorio';
        }
        if (strlen($this->password) < 8) {
            self::$alertas['error'][] =  'El Password debe tener al menos 8 Caracteres';
        }
        // if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $this->password)) {
        //     self::$alertas['error'][] =  'El Password debe tener al menos una letra Minuscula y Mayuscula y un numero ';
        // }

        return self::$alertas;
    }

    public function validarLogin()
    {
        if (!$this->email) {
            self::$alertas['error'][] = 'El Email es Oblogatorio';
        }
        if (!$this->password) {
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }
        return self::$alertas;
    }
    public function validarPassword()
    {
        if (!$this->password) {
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }
        if (strlen($this->password) < 8) {
            self::$alertas['error'][] = 'El Password debe tener al menos 8 caracteres';
        }
        return self::$alertas;
    }

    public function validarEmail()
    {
        if (!$this->email) {
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }
        return self::$alertas;
    }

    // Revisa si el usuario ya existe 
    public function existeUsuario()
    {
        $query = " SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";

        $resultado = self::$db->query($query);

        if ($resultado->num_rows) {
            self::$alertas['error'][] = 'El Usuario ya esta registrado';
        }
        return $resultado;
    }
    public function hashPassword()
    {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function crearToken()
    {
        $this->token = uniqid();
    }
    public function comprobarPasswordAndVerificado($password)
    {
        //debuguear($this->password);
        $resultado = password_verify($password, $this->password);
        if (!$this->confirmado) {
            self::$alertas['error'][] = 'Cuenta no confirmada';
        } else if (!$resultado) {
            self::$alertas['error'][] = 'Contraseña Incorrecta';
        } else {
            return true;
        }
    }
}
