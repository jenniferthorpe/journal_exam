<?php

return function ($app) {
    // Register auth middleware
    $auth = require __DIR__ . '/../middlewares/auth.php';

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
$app->delete('/api/comment/{commentID}', function ($request, $response, $args) {
    $data = $request->getParsedBody();
    // if($data['createdBy'] == $_SESSION['userID']) {
      $commentID = $args['commentID'];
      $comment = new Comment($this->db);
      return $response->withJson($comment->deleteComment($commentID));
    // }
    // else{
    //   return $response->withStatus(401);
    // }
})->add($auth);



}


?>