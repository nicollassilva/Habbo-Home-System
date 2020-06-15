<?php
    require_once "config.php";

    $ajax = $_GET['ajax'];

    if(isset($ajax) && $ajax != '') {

        if($ajax == 'ListItems') {

            $id = (int) $_POST['id'];

            $sql = $pdo->prepare("SELECT widget FROM widgets_users WHERE widget_cat = :c ORDER BY id DESC");
            $sql->bindParam(':c', $id);
            $sql->execute();
            if($sql->rowCount() <= 0) {

                echo "<p class=\"empty\"></p>";

            } else { while($item = $sql->fetch(PDO::FETCH_ASSOC)) { 
                $c = $pdo->query("SELECT * FROM widgets_home WHERE id = '{$item['widget']}' LIMIT 1")->fetch(PDO::FETCH_ASSOC);
                $street = '';
                switch($c['category']) {
                    case 1:
                        $street = 'stickers/'.$c['image'];
                        break;
                    case 2:
                        $street = 'backgrounds/'.$c['image'];
                        break;
                    case 3:
                        $street = 'notes/'.$c['image'];
                        break;
                    case 4:
                        $street = 'elements/'.$c['image'];
                }
?>
                <div class="item" onclick="Home.previewItem('<?= $street ?>')" style="background-image: url('widgets/<?= $street ?>')"></div>
<?php            
                }

            }

        } else if($ajax == 'changeItems') {

            $id = (int) $_POST['id'];
            $table = '';
            $click = '';
            $id === 1 ? $table = 'widgets_cat' : $table = 'colation_cat';

            $sql = $pdo->query("SELECT * FROM $table ORDER BY id ASC");
            while($row = $sql->fetch(PDO::FETCH_ASSOC)) {
                $id === 1 ? $click = 'Home.ajaxInventory('.$row['id'].')' : $click = 'Home.ajaxShop('.$row['id'].')';
                ?>
            <div onclick="<?= $click ?>;Home.setActive(this)" class="category ellipsis"><?= $row['name'] ?></div>
        <?php
        }
    } else if($ajax == 'ListShop') {

        $id = (int) $_POST['id'];

        $sql = $pdo->prepare("SELECT * FROM widgets_home WHERE colation = :c ORDER BY id ASC");
        $sql->bindParam(':c', $id);
        $sql->execute();
        if($sql->rowCount() <= 0) {

            echo "<p class=\"empty\"></p>";

        } else { while($item = $sql->fetch(PDO::FETCH_ASSOC)) { 
            $c = $pdo->query("SELECT * FROM widgets_cat WHERE id = '{$item['category']}' LIMIT 1")->fetch(PDO::FETCH_ASSOC); $c['name'] == 'Colantes' ? $c['name'] = 'stickers' : '';
            $id == 32 ? $street = 'widgets/backgrounds/' : $street = 'widgets/stickers/';
?>
            <div class="item ellipsis" onclick="Home.previewItem('<?= strtolower($c['name']).'/'.$item['image'] ?>', 2, <?= $item['price'] ?>, '<?= $item['name'] ?>')" style="background-image: url('<?= $street.$item['image'] ?>')"></div>
<?php            
            }

        }

    } else if($ajax == 'buyItem') {

        $name = $_POST['n'];
        $price = (int) $_POST['p'];
        $user = 'iNicollas';

        $widgets = $pdo->prepare("SELECT * FROM widgets_home WHERE name = :n");
        $widgets->bindParam(':n', $name);
        $widgets->execute();
        if($widgets->rowCount() <= 0) {
            $a['alert'] = "Oops! Esse item não existe"; } else {
                $widget = $widgets->fetch(PDO::FETCH_ASSOC);

        $sql = $pdo->prepare("INSERT INTO widgets_users (widget, collation, widget_cat, user) VALUES (:w, :c, :wc, :u)");
        $sql->bindParam(':w', $widget['id']);
        $sql->bindParam(':c', $widget['colation']);
        $sql->bindParam(':wc', $widget['category']);
        $sql->bindParam(':u', $user);
        $sql->execute();

        $a['alert'] = "Sucesso! O item está no seu inventário";

        }
        echo json_encode($a);
    } else if($ajax == 'saveItems') {

        $all = str_replace('undefined', '', $_POST['n']);
        $all = str_replace(' ', '', $all);
        $all = implode(',', $all); $all = explode(',', $all);
        $all = array_chunk($all, 4, false);
        echo json_encode($all);

    }
}