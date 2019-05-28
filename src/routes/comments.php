<?php

return function ($app) {
    // Register auth middleware
    $auth = require __DIR__ . '/../middlewares/auth.php';

    // Get other comments
    $app->get('/api/entries/users/other/comments', function ($request, $response) { 
        $entry = new Comment($this->db);   
        return $response->withJson($entry->getOtherEntriesComments());
    })->add($auth);



//New comment
$app->post('/api/comment/{entryID}', function ($request, $response, $args) {
    $data = $request->getParsedBody();
    if(!empty($data['newComment'])) {
        $entryID = $args['entryID'];
        $content = $data['newComment'];
        $comment = new Comment($this->db);
        return $response->withJson($comment->createNewComment($entryID, $content));
    }
    else{
      return $response->withStatus(401);
    }
})->add($auth);


//Delete comment
$app->DELETE('/api/comment/{commentID}/{userID}', function ($request, $response, $args) {
    
    
    // if($data['createdBy'] == $_SESSION['userID']) {
        $commentID = $args['commentID'];
        $userID = $args['userID'];
      $comment = new Comment($this->db);
      return $response->withJson($comment->deleteComment($commentID, $userID));
    // }
    // else{
    //   return $response->withStatus(401);
    // }
})->add($auth);



}


?>