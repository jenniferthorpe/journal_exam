<?php
 

return function ($app) {
    // Register auth middleware
    $auth = require __DIR__ . '/../middlewares/auth.php';
  

    // Get all entries
    $app->get('/entries', function ($request, $response) { 
        $entry = new Entry($this->db);   
        return $response->withJson($entry->getAllEntries());
    })->add($auth);

      //Delete entry
    $app->DELETE('/api/delete/{userid}/{entryid}', function ($request, $response, $args) {
      $userID = $args['userid'];
      $entryID = $args['entryid'];
      $entry = new Entry($this->db);
      return $response->withJson($entry->deleteEntry($userID, $entryID));
    })->add($auth);

    //New entry
    $app->post('/api/new/entry', function ($request, $response, $args) {
      $data = $request->getParsedBody();
      if($data['title'] && $data['content'] && $data['userID']) {
        $title = $data['title'];
        $content = $data['content'];
        $userID = $data['userID'];
        $entry = new Entry($this->db);
        return $response->withJson($entry->createNewEntry($title, $content, $userID));
      }
    })->add($auth);

    //Get X last entries
    $app->get('/entries/last/{num}', function($req, $resp, $args){
        $num = $args['num'];
        $entries = new Entry($this->db);
        return $response->withJson($entries->getXLatestEntries($num));
    })->add($auth);

};