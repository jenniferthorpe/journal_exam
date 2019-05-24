<?php

return function ($app) {
    // Register auth middleware
    $auth = require __DIR__ . '/../middlewares/auth.php';

//New entry
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

}


?>