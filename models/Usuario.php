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
        $this->admin = $args['admin'] ?? null;
        $this->confirmado = $args['confirmado'] ?? null;
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
}
