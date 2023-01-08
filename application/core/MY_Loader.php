<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// written by AJ  sirderno@yahoo.com

class MY_Loader extends CI_Loader 
{
    protected $_my_controller_paths     = array();  

    protected $_my_controllers          = array();


    public function __construct()
    {
        parent::__construct();

        $this->_my_controller_paths = array(APPPATH);
    }

    public function controller($controller, $name = '', $db_conn = FALSE)
    {
        if (is_array($controller))
        {
            foreach ($controller as $babe)
            {
                $this->controller($babe);
            }
            return;
        }

        if ($controller == '')
        {
            return;
        }

        $path = '';

        // Is the controller in a sub-folder? If so, parse out the filename and path.
        if (($last_slash = strrpos($controller, '/')) !== FALSE)
        {
            // The path is in front of the last slash
            $path = substr($controller, 0, $last_slash + 1);

            // And the controller name behind it
            $controller = substr($controller, $last_slash + 1);
        }

        if ($name == '')
        {
            $name = $controller;
        }

        if (in_array($name, $this->_my_controllers, TRUE))
        {
            return;
        }

        $CI =& get_instance();
        if (isset($CI->$name))
        {
            show_error('The controller name you are loading is the name of a resource that is already being used: '.$name);
        }

        $controller = strtolower($controller);

        foreach ($this->_my_controller_paths as $mod_path)
        {
            if ( ! file_exists($mod_path.'controllers/'.$path.$controller.'.php'))
            {
                continue;
            }

            if ($db_conn !== FALSE AND ! class_exists('CI_DB'))
            {
                if ($db_conn === TRUE)
                {
                    $db_conn = '';
                }

                $CI->load->database($db_conn, FALSE, TRUE);
            }

            if ( ! class_exists('CI_Controller'))
            {
                load_class('Controller', 'core');
            }

            require_once($mod_path.'controllers/'.$path.$controller.'.php');

            $controller = ucfirst($controller);

            $CI->$name = new $controller();

            $this->_my_controllers[] = $name;
            return;
        }

        // couldn't find the controller
        show_error('Unable to locate the controller you have specified: '.$controller);
    }
	

	function ext_view($folder, $view, $vars = array(), $return = FALSE) {
		$this->_ci_view_paths = array_merge($this->_ci_view_paths, array(APPPATH . $folder . '/' => TRUE));

		if (method_exists($this, '_ci_object_to_array'))
		{
				return $this->_ci_load(array('_ci_view' => $view, '_ci_vars' => $this->_ci_object_to_array($vars), '_ci_return' => $return));
		} else {
				return $this->_ci_load(array('_ci_view' => $view, '_ci_vars' => $this->_ci_prepare_view_vars($vars), '_ci_return' => $return));
		}
	}

}