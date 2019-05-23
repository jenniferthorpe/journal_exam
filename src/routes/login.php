<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

   // Add a login route
   $app->post('/api/login', function ($request, $response) {
     $data = $request->getParsedBody();
     if (!empty($data['username']) && !empty($data['password'])) {
       $username = $data['username'];
       $password = $data['password'];
       $user = new User($this->db);

       return $response->withJson($user->logIn($username, $password));


       if(password_verify($password, $anv['password'])){
        session_start();
        $_SESSION['loggedIn'] = true;
        $_SESSION['userID'] = $user['userID'];
      }else{
        return $response->withStatus(401);
      }
    }
    else {
      return $response->withStatus(401);
    }
    });


      //  ($data['username']) && $data['password']) {
      //    $username = $data['username'];
      //    $password = password_hash($data['password'], PASSWORD_BCRYPT);
      //    $user = new User($this->db);
      //    return $response->withJson($user->logIn($username, $password));
      //   }
        
      //}
      //});

/*
  $app->post('/api/login', function ($request, $response) {
    $data = $request->getParsedBody();
    if ($data['username'] && $data['password']) {
      // In a real example, do database checks here
      $_SESSION['loggedIn'] = true;
      $_SESSION['username'] = $data['username'];

      return $response->withJson($data);
    } else {
      return $response->withStatus(401);
    }
  });
  */

  // Add a ping route
  $app->get('/api/ping', function ($request, $response, $args) {
    return $response->withJson(['loggedIn' => true]);
  })->add($auth);
};
