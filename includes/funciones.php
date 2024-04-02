<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}


// Iniciar la sesion
function iniciarSesion() {
    // Verifica si la sesión no está iniciada
    if (!isset($_SESSION)) {
        // Inicia la sesión
        session_start();
    }
}