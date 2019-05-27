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
    $app->get('/entries/last/{num}', function($request, $response, $args){
      $num = (int)$args['num'];
      $entries = new Entry($this->db);
      return $response->withJson($entries->getXLatestEntries($num));
    });


    // Get all entries
    $app->get('/entries', function ($request, $response) { 
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
    $app->post('/api/new/entry', function ($request, $response, $args) {
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


    //Get last entries for specific userID OBS!! Måste skrivas om så att userID istället är från SESSION
    $app->get('/api/entries/{userid}', function ($request, $response) { 
      $entry = new Entry($this->db);   
      return $response->withJson($entry->getUserEntries());
  })->add($auth);



      // Get other users entries
      $app->get('/api/entries/users/other', function ($request, $response) { 
        $entry = new Entry($this->db);   
        return $response->withJson($entry->getOtherEntries());
    })->add($auth);
      


};

