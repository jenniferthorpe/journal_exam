<?php

class Comment extends Mapper {


  public function getOtherEntriesComments() {
    $statement = $this->db->prepare("SELECT * FROM comments");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

    public function createNewComment($entryID, $content){
        $datetime = date_create()->format('Y-m-d G:i:s');
        $statement = $this->db->prepare("INSERT INTO comments(entryID, content, createdBy, createdAt) VALUES (:entryID, :content, :createdBy, :createdAt)");
        $statement->execute([
          ':entryID' => $entryID,
          ':content' => $content,
          ':createdBy' => $_SESSION['userID'],
          ':createdAt' => $datetime
        ]);
      }
   
      public function deleteComment($commentID){
        $statement = $this->db->prepare("DELETE FROM comments WHERE commentID = :commentID");
        $statement->execute([
          ':commentID' => $commentID
        ]);
      }


}