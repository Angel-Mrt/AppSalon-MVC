<h1 class="nombre-pagina">Actualizar Servicio</h1>

<div class="barra">
    <p>Hola: <span> <?php echo $nombre ?? ''; ?> </span></p>
    <a class="boton" href="/logout">Cerrar Sesión</a>
</div>
<div class="barra-servicios">
    <a class="boton" href="/servicios">Regresar</a>
</div>

<p class="descripcion-pagina">Modifica los datos que necesites</p>

<?php
//include_once __DIR__ . '/../templates/barra.php';
include_once __DIR__ . '/../templates/alertas.php';
?>

<form method="POST" class="formulario">
    <?php include_once __DIR__ . '/formulario.php'; ?>

    <input type="submit" class="boton" value="Actualizar">
</form>