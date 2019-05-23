<?php

class Comment extends Mapper {


    public function createNewComment($title, $content, $entryID){
        $datetime = date_create()->format('Y-m-d G:i:s');
        $statement = $this->db->prepare("INSERT INTO entries(title, content, createdAt, userID) VALUES (:title, :content, :createdAt, :userID)");
        $statement->execute([
          ':title' => $title,
          ':content' => $content,
          ':createdAt' => $datetime,
          ':userID' => $userID
        ]);
      }


}