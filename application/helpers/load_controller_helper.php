<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('load_controller'))
{
    function load_controller($controller, $method = 'index')
    {
        //require_once(APPPATH . 'controllers/' . $controller . '.php');
        require_once('./' . $controller . '.php');

        $controller = new $controller();

        return $controller->$method();
    }
}