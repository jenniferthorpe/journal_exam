<?php

return function ($app) {
  // Add a basic template route
  $app->get('/', function ($request, $response, $args) {
    // Render index view
    return $this->renderer->render($response, 'index.phtml', [
      'title' => 'Journal'
    ]);
  });

  
  // LoggedIn route
  $app->get('/loggedin', function ($request, $response, $args) {
    // Render index view
    return $this->renderer->render($response, 'loggedin.phtml', [
      'title' => 'Välkommen!'
    ]);
  });
};
