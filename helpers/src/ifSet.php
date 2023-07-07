<?php
declare(strict_types=1);

function ifSet(mixed &$var, mixed $returned): mixed
{
   return isset($var) ? $returned : null;
}
