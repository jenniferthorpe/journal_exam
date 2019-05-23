<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // //Change username
  // $app->put('/user/change', function($request, $response, $args){
  //   $data = $request->getParsedBody();
  //   if($data['username'] && $data['newUsername']) {
  //     $username = $data['username'];
  //     $newUsername = $data['newUsername'];
  //     $user = new User($this->db);
  //     return $response->withJson($user->changeUsername($username, $newUsername));
  //   }
  // })->add($auth);

  //Get user by username
  $app->get('/user/name/{username}', function ($request, $response, $args) {
    $userName = $args['username'];
    $user = new User($this->db);
    return $response->withJson($user->getUserByUsername($userName));
  })->add($auth);


  // Basic protected GET route 
  $app->get('/api/user/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $user = new User($this->db);

    return $response->withJson($user->getUserByID($userID));
  })->add($auth);

  // GET route for all users
  $app->get('/api/allusers', function ($request, $response) {
    $user = new User($this->db);

    return $response->withJson($user->getAllUsers());

  })->add($auth);

  // GET route for user without password
  $app->get('/api/usernopass/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $user = new User($this->db);

    return $response->withJson($user->getUserWithoutPass($userID));
  })->add($auth);

  // POST route for new user
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