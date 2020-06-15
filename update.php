<?php

    require "src/config.php";

    $sql = $pdo->query("SELECT name, image FROM widgets_home ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);

    foreach($sql as $item => $value) {

        echo ".".$value['name']." { <br>";
        echo "background-image: url('../img/widgets/stickers/".$value['image']."'); <br>";
        echo "width: px; <br>";
        echo "height: px; <br>";
        echo "} <br><br>";

    }