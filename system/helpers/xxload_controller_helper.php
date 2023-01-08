<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('load_controller'))
{
    function load_controller($controller, $method = 'index')
    {
        require_once($controller . '.php');
		//* FCPATH . APPPATH . 'controllers/' . */
        $controller = new $controller();

        return $controller->$method();
    }
}