<h1 class="nombre-pagina">Nuevo Servicio</h1>
<div class="barra">
    <p>Hola: <span> <?php echo $nombre ?? ''; ?> </span></p>
    <a class="boton" href="/logout">Cerrar Sesión</a>
</div>
<div class="barra-servicios">
    <a class="boton" href="/admin">Regresar</a>
</div>
<p class="descripcion-pagina">Llena todos los campos para añadir un nuevo servicio</p>
<?php
//include_once __DIR__ . '/../templates/barra.php';
include_once __DIR__ . '/../templates/alertas.php';
?>
<form action="/servicios/crear" method="POST" class="formulario">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <input type="submit" class="boton" value="Guardar Servicio">
</form>