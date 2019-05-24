<?php

class Comment extends Mapper {


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


}