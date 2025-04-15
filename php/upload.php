<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['photo']) && isset($_POST['category'])) {
        $category = strtolower($_POST['category']);
        
        // Путь для сохранения на сервере
        $uploadDir = "../drawable/";
        $fileName = basename($_FILES["photo"]["name"]);
        $targetFilePath = $uploadDir . $fileName;

        // Путь для доступа из браузера
        $publicPath = "drawable/" . $fileName;

        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

        if (in_array($fileType, $allowedTypes)) {
            if (move_uploaded_file($_FILES["photo"]["tmp_name"], $targetFilePath)) {
                echo json_encode([
                    "success" => true,
                    "imageUrl" => $publicPath, // <-- браузерный путь
                    "category" => $category
                ]);
            } else {
                echo json_encode(["success" => false, "error" => "Move failed"]);
            }
        } else {
            echo json_encode(["success" => false, "error" => "Invalid file type"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Missing fields"]);
    }
}
?>
