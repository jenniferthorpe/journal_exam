<?php

class User extends Mapper {
  public function getUserByID($userID) {
    $statement = $this->db->prepare("SELECT * FROM users WHERE userID = :userID");
    $statement->execute([
      ':userID' => $userID
    ]);
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  public function getUserByUsername($userName) {
    $statement = $this->db->prepare("SELECT userID, username FROM users WHERE username = :userName");
    $statement->execute([
      ':userName' => $userName
    ]);
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  
  // public function changeUsername($username, $newUsername){
  //   $statement = $this->db->prepare("UPDATE users SET username = :newUsername WHERE username = :username");
  //   $statement->execute([
  //     ':username' => $username,
  //     ':newUsername' => $newUsername
  //     ]);
  //     return $statement->fetch(PDO::FETCH_ASSOC);
  // }
   
  
  public function getAllUsers(){
    $statement = $this->db->prepare("SELECT * FROM users");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getUserWithoutPass($userID){
    $statement = $this->db->prepare("SELECT `username` FROM users");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  public function createNewUser($username, $password){
    $statement = $this->db->prepare("INSERT INTO users(username, password)
    VALUES (:username, :password)");
    $statement->execute([
      ':username' => $username,
      ":password" => password_hash($_POST['password'], PASSWORD_BCRYPT)
    ]);
    
  }

  public function logIn($username, $password){
    $statement = $this->db->prepare("SELECT * FROM users WHERE username = :username");
      $statement ->execute([
        ":username" => $username,
      ]);
      return $statement->fetch(PDO::FETCH_ASSOC);
      
    
  }
}
