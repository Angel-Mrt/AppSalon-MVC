<?php

namespace Controllers;

use MVC\Router;

class CitaController
{

    public static function index(Router $router)
    {
        // se manda a llamar la funcion inicarSesion que ejcuta session_start
        iniciarSesion();
        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'],
            'id' => $_SESSION['id']
        ]);
    }
}
