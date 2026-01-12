<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost", "root", "", "fagyibolt");

$sql = "SELECT * FROM fagylaltok";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html>
<body>
<h1>Fagylaltok</h1>

<?php
while ($row = $result->fetch_assoc()) {
    echo "<p>".$row["nev"]."</p>";
}
?>

</body>
</html>


