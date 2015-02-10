<?php

class Task extends Eloquent{

	protected $table = 'tasks';
	protected $fillable = array('title', 'completed');
	public $timestamps = false;
	
}