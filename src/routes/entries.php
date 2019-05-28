<?php
 

return function ($app) {
    // Register auth middleware
    $auth = require __DIR__ . '/../middlewares/auth.php';

    //Update entry
    $app->put('/api/entry/update', function ($req, $resp, $args){
      $data = $req->getParsedBody();
      $title = $data['title'];
      $content = $data['content'];
      $entryID = $data['entryID'];
      $entries = new Entry($this->db);
    
    return $resp->withJson($entries->updateEntry($title, $content, $entryID));
    })->add($auth);


    //Get X last entries
    $app->get('/api/entries/last/{num}', function($request, $response, $args){
      $num = (int)$args['num'];
      $entries = new Entry($this->db);
      return $response->withJson($entries->getXLatestEntries($num));
    });


    // Get all entries
    $app->get('/api/entries', function ($request, $response) { 
        $entry = new Entry($this->db);   
        return $response->withJson($entry->getAllEntries());
    })->add($auth);


      //Delete entry
    $app->DELETE('/api/delete/{entryid}', function ($request, $response, $args) {
      $entryID = $args['entryid'];
      $entry = new Entry($this->db);
      return $response->withJson($entry->deleteEntry($entryID));
    })->add($auth);


    //New entry
    $app->post('/api/entry/new', function ($request, $response, $args) {
      $data = $request->getParsedBody();
      if(!empty($data['title']) && !empty($data['content'])) {
        $title = $data['title'];
        $content = $data['content'];
        // $userID = $_SESSION['userID'];
        $entry = new Entry($this->db);
        return $response->withJson($entry->createNewEntry($title, $content));
      }
      else{
        return $response->withStatus(401);
      }
    });


      //Get last entries for specific userID
      $app->get('/api/entries/userid', function ($request, $response) { 
        $entry = new Entry($this->db);   
        return $response->withJson($entry->getUserEntries());
    })->add($auth);



    $app->get('/api/test4', function ($request, $response)
    {
       $statement = $this->db->prepare("SELECT `title`, `entryID` FROM `entries`");
       $res = $statement->execute();
       $rows = $statement->fetchAll();
       echo( '<div class="what">');
       foreach ($rows as $row) {
           echo("<br>");
           $path = "/api/test5/" . $row["entryID"];
           $url = '<a href="' . $path . '">' . $row["title"] . "</a>";
           echo $url;
           //echo("</li>");
       }
       echo("</div>");
    });


    $app->get('/api/test5/{id}', function ($request, $response, $args)
    {
       $statement = $this->db->prepare("SELECT * FROM `entries` where entryID = " . $args["id"]);
       $res = $statement->execute();
       $rows = $statement->fetchAll();
       $row = $rows[0];

       echo "<h1>" . $row["title"] . "</h1>";
       echo "<p>" . $row["content"] . "</p>";
    });
      


};

