<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';
  
  
  //Get user by id
  $app->get('/api/user/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $user = new User($this->db);
    
    return $response->withJson($user->getUserByID($userID));
  })->add($auth);

  
  //Get all users
  $app->get('/api/allusers', function ($request, $response) {
    $user = new User($this->db);
    
    return $response->withJson($user->getAllUsers());
    
  })->add($auth);
  
  
  // Register new user
  $app->post('/api/register', function ($request, $response) {
    $data = $request->getParsedBody();
    if (!empty($data['username']) && !empty($data['password'])) {
      $username = $data['username'];
      $password = $data['password'];
      $user = new User($this->db);
      return $response->withJson($user->createNewUser($username, $password));
    }
    else {
      return $response->withStatus(401);
    }
  });

   
};