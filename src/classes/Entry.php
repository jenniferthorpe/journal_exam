<?php

class Entry extends Mapper {

  public function getAllEntries() {
    $statement = $this->db->prepare("SELECT * FROM entries");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  
  public function createNewEntry($title, $content){
    $datetime = date_create()->format('Y-m-d G:i:s');
    $statement = $this->db->prepare("INSERT INTO entries(title, content, createdAt, userID) VALUES (:title, :content, :createdAt, :userID)");
    $statement->execute([
      ':title' => $title,
      ':content' => $content,
      ':createdAt' => $datetime,
      ':userID' => $_SESSION['userID']
      ]);
  }

  public function getXLatestEntries($num) {
    $orderby = 'DESC';
    $statement = $this->db->prepare("SELECT title, content FROM entries ORDER BY createdAt {$orderby} LIMIT :num");
    $statement->bindParam(':num', $num, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }


  public function deleteEntry($entryID){
    $statement = $this->db->prepare("DELETE FROM entries WHERE entryID = :entryID");
    $statement->execute([
      ':entryID' => $entryID
    ]);
    
  }

  public function updateEntry($title, $content, $entryID){
    $statement = $this->db->prepare("UPDATE entries SET title = :title, content = :content WHERE entryID = :entryID");
    $statement->execute([
      ':title' => $title,
      ':content' => $content,
      ':entryID' => $entryID
    ]);
  }

  public function getUserEntries() {
    $orderby = 'DESC';
    $statement = $this->db->prepare("SELECT * FROM entries WHERE userID = :userID ORDER BY createdAt {$orderby}");
    $statement->execute([
      ':userID' => $_SESSION['userID']
    ]);
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }


  public function getOtherEntries() {
    $statement = $this->db->prepare("SELECT * FROM entries WHERE NOT userID = :userID");
    $statement->execute([
      ":userID" => $_SESSION['userID']
    ]);
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }


}