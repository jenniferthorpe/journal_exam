<?php

class Entry extends Mapper {

  public function getAllEntries() {
    $statement = $this->db->prepare("SELECT * FROM entries");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  public function createNewEntry($title, $content, $userID){
    $datetime = date_create()->format('Y-m-d G:i:s');
    $statement = $this->db->prepare("INSERT INTO entries(title, content, createdAt, userID) VALUES (:title, :content, :createdAt, :userID)");
    $statement->execute([
      ':title' => $title,
      ':content' => $content,
      ':createdAt' => $datetime,
      ':userID' => $userID
    ]);
  }

  public function getXLatestEntries($num) {
    $orderby = 'ASC';
    $statement = $this->db->prepare("SELECT * FROM entries ORDER BY createdDate {$orderby} LIMIT :num");
    $statement->bindParam(':num', $num, PDO::PARAM_INT);
    $statement->execute();
  return $statement->fetchAll(PDO::FETCH_ASSOC);
  }


  public function deleteEntry($userID, $entryID){
    $statement = $this->db->prepare("DELETE FROM entries WHERE userID = :userID AND entryID = :entryID");
    $statement->execute([
      'userID' => $userID,
      'entryID'=> $entryID
    ]);
  }

  //Updatera inlägg - funktion

  public function updateEntry($title, $content, $entryID){

    $statement = $this->database->prepare("UPDATE  entries SET title = :title,  content = :content, entryID = :entryID WHERE entryID = :entryID");
    $statement->execute([
 
      ':title' => $title,
      ':content' => $content,
      ':entryID' => $entryID
    ]);
  }

}