<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * CodeIgniter File Helpers
 *
 * @package		CodeIgniter
 * @subpackage	Helpers
 * @category	Helpers
 * @author		EllisLab Dev Team
 * @link		https://codeigniter.com/userguide3/helpers/file_helper.html
 */

// ------------------------------------------------------------------------

if ( ! function_exists('test_helper2'))
{
	/**
	 * Read File
	 *
	 * Opens the file specified in the path and returns it as a string.
	 *
	 * @todo	Remove in version 3.1+.
	 * @deprecated	3.0.0	It is now just an alias for PHP's native file_get_contents().
	 * @param	string	$file	Path to file
	 * @return	string	File contents
	 */
	function test_helper2($var='')
	{
		return "from udf-helper : ".$var;
	}
}

?>